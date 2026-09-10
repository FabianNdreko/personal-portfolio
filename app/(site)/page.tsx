import { AboutSection } from "@/features/about/components/about-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { EducationSection } from "@/features/education/components/education-section";
import { ExperienceSection } from "@/features/experience/components/experience-section";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { StackSection } from "@/features/stack/components/stack-section";
import { getProjects } from "@/features/projects/queries";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-190 px-5 pt-10 pb-8 md:px-10 md:pt-16">
      <div className="flex flex-col gap-14">
        <AboutSection />
        <ProjectsSection projects={projects} />
        <ExperienceSection />
        <StackSection />
        <EducationSection />
        <ContactSection />
      </div>
    </main>
  );
}
