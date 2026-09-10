import type { Metadata } from "next";
import { ProjectGrid } from "@/features/projects/components/project-grid";
import { getProjects } from "@/features/projects/queries";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <h1 className="text-3xl font-medium tracking-tight">Projects</h1>
      <p className="mt-2 text-muted-foreground">Selected work.</p>
      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
}
