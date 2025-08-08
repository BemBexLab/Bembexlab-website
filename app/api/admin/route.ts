// app/api/admin/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

/** GET /api/admin — list all contacts */
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { submitted_at: "desc" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        service: true,
        subject: true,
        message: true,
        submitted_at: true,
      },
    });
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (err) {
    console.error("Admin contacts fetch error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin?id=123
 * DELETE /api/admin          (body: { id: 123 })
 * DELETE /api/admin?all=true (deletes ALL)
 * DELETE /api/admin          (body: { all: true })
 */
export async function DELETE(req: NextRequest) {
  try {
    // Bulk delete?
    const allQuery = req.nextUrl.searchParams.get("all");
    if (allQuery === "true") {
      const result = await prisma.contact.deleteMany({});
      return NextResponse.json(
        { success: true, deleted: result.count },
        { status: 200 }
      );
    }

    // Single delete by id (query or body)
    let idParam = req.nextUrl.searchParams.get("id");

    if (!idParam) {
      const ct = req.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const body = await req.json().catch(() => null);
        if (body?.all === true) {
          const result = await prisma.contact.deleteMany({});
          return NextResponse.json(
            { success: true, deleted: result.count },
            { status: 200 }
          );
        }
        if (body?.id != null) idParam = String(body.id);
      }
    }

    const idNum = Number(idParam);
    if (!idParam || Number.isNaN(idNum) || idNum <= 0) {
      return NextResponse.json(
        {
          error:
            "Missing or invalid 'id' (number required), or pass ?all=true.",
        },
        { status: 400 }
      );
    }

    await prisma.contact.delete({ where: { id: idNum } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    if (err?.code === "P2025") {
      return NextResponse.json(
        { error: "Contact not found." },
        { status: 404 }
      );
    }
    console.error("Admin delete error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
