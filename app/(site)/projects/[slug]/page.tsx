import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/features/projects/components/project-detail";
import { getProjectBySlug, getProjectPage, getProjects } from "@/features/projects/queries";

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
  const page = await getProjectPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-190 min-w-0 px-4 pt-8 pb-8 sm:px-5 md:px-10 md:pt-16">
      <ProjectDetail
        project={page.project}
        previous={page.previous}
        next={page.next}
      />
    </main>
  );
}
