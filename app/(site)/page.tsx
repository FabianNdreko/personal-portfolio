import { AboutSection } from "@/features/about/components/about-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { ExperienceSection } from "@/features/experience/components/experience-section";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { getProjects } from "@/features/projects/queries";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto w-full max-w-190 min-w-0 px-4 pt-8 pb-8 sm:px-5 md:px-10 md:pt-16">
      <div className="flex flex-col gap-16 md:gap-20">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </div>
    </main>
  );
}
