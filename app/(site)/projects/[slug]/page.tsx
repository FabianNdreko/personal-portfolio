import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/features/projects/queries";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Projects
      </Link>
      <h1 className="mt-6 text-3xl font-medium tracking-tight">
        {project.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{project.year}</p>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        {project.description}
      </p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="border border-border px-2 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>
    </main>
  );
}
