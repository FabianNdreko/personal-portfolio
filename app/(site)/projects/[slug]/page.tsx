import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/shared";
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
    <main className="mx-auto w-full max-w-190 min-w-0 px-4 pt-8 pb-8 sm:px-5 md:px-10 md:pt-16">
      <Link
        href="/#projects"
        className="text-sm text-muted-foreground hover:text-accent"
      >
        ← Back to projects
      </Link>
      <h1 className="font-display mt-6 text-3xl font-bold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-2 text-sm text-accent">{project.year}</p>
      <p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </main>
  );
}
