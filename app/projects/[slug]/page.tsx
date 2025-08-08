import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import LivePreview from "@/components/LivePreview"; // <--- ADD THIS

// Dynamically import the client-only BackButton
const BackButton = dynamic(() => import("../[slug]/BackButton"), {
  ssr: false,
});

const API_URL =
  "https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts?slug=";

export async function generateStaticParams() {
  const res = await fetch(
    "https://olive-peafowl-546702.hostingersite.com/wp-json/wp/v2/posts"
  );
  const posts = await res.json();
  return posts.map((post: any) => ({ slug: post.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${API_URL}${params.slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  const project = data[0];
  if (!project) return notFound();

  const imageUrl = project.acf?.project_image?.url || "/default.jpg";
  const acf = project.acf;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16 flex flex-col items-center mt-[80px]">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold max-w-4xl text-left w-full bg-gradient-to-r from-[#DE2F04] to-white text-transparent bg-clip-text mb-[50px]">
        {project.title.rendered}
      </h1>

      {/* Project Image */}
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl mb-12">
        <img
          src={imageUrl}
          alt={project.title.rendered}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Project Content Sections */}
      <div className="w-full max-w-3xl space-y-12 text-lg sm:text-xl">
        {acf.introduction && (
          <Section title="Introduction" text={acf.introduction} />
        )}
        {acf.genesis_of_collaboration && (
          <Section
            title="Genesis Of Collaboration"
            text={acf.genesis_of_collaboration}
          />
        )}
        {acf.conceptualization && (
          <Section title="Conceptualization" text={acf.conceptualization} />
        )}
        {acf.design_symphony && (
          <Section title="Design Symphony" text={acf.design_symphony} />
        )}
        {acf.development_overture && (
          <Section
            title="Development Overture"
            text={acf.development_overture}
          />
        )}
        {acf.launch_and_beyond && (
          <Section title="Launch And Beyond" text={acf.launch_and_beyond} />
        )}
        {acf.conclusion && <Section title="Conclusion" text={acf.conclusion} />}
      </div>

      {/* Live Website Preview (only if project_url exists) */}
      {acf.project_url && (
        <div className="w-full max-w-5xl mx-auto my-16 rounded-2xl overflow-hidden ">
          <div className="text-2xl font-semibold mb-2 px-6 pt-6 text-[#DE2F04] text-center">
            Live Website Preview
          </div>
          <LivePreview url={acf.project_url} />
        </div>
      )}

      {/* Back Button */}
      <div className="mt-16 text-center">
        <BackButton />
      </div>
    </div>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-[#DE2F04]">{title}</h2>
      <p className="text-white text-lg leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}
