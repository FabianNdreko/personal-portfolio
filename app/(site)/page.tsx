import { AboutSection } from "@/features/about/components/about-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { EducationSection } from "@/features/education/components/education-section";
import { ExperienceSection } from "@/features/experience/components/experience-section";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { getProjects } from "@/features/projects/queries";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto w-full max-w-5xl min-w-0 px-4 pt-4 pb-8 sm:px-6 md:px-8 md:pt-8 md:pb-12">
      <div className="flex flex-col gap-20 md:gap-28">
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </div>
    </main>
  );
}
