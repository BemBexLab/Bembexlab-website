// app/api/posts/route.ts (or wherever this file is)
export const dynamic = "force-dynamic"; // ensure it's never statically cached
export const revalidate = 0; // disable ISR for this route

export async function GET() {
  try {
    const allPosts: any[] = [];
    let page = 1;

    while (true) {
      const res = await fetch(
        `https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts?per_page=100&page=${page}`,
        { cache: "no-store" } // bypass Next fetch cache to WP
      );

      if (!res.ok) break;
      const posts = await res.json();
      allPosts.push(...posts);
      if (posts.length < 100) break;
      page++;
    }

    return new Response(JSON.stringify(allPosts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // prevent browser/CDN caching of THIS response
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
