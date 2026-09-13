import Image from "next/image";
import { MediaPlaceholder } from "@/components/shared";
import { cn } from "@/lib/utils";
import type { Project } from "../types";

type ProjectCoverProps = {
  project: Project;
  className?: string;
  rounded?: boolean;
};

export function ProjectCover({
  project,
  className,
  rounded = true,
}: ProjectCoverProps) {
  const shots =
    project.previews?.length ?
      project.previews
    : project.cover ?
      [project.cover]
    : [];

  if (shots.length > 0) {
    const multi = shots.length > 1;

    return (
      <div
        className={cn(
          multi
            ? "grid gap-3 sm:grid-cols-2 sm:gap-4"
            : "mx-auto max-w-xl",
          className,
        )}
      >
        {shots.map((shot, index) => (
          <div
            key={shot}
            className={cn(
              "group relative overflow-hidden border border-border bg-elevated-2",
              rounded ? "rounded-xl" : "rounded-none border-0",
              multi ? "aspect-16/10" : "aspect-video",
            )}
          >
            <Image
              src={shot}
              alt={`${project.title} preview ${index + 1}`}
              fill
              sizes={
                multi
                  ? "(min-width: 640px) 22rem, 100vw"
                  : "(min-width: 768px) 36rem, 100vw"
              }
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    );
  }

  if (project.logo) {
    return (
      <div
        className={cn(
          "relative overflow-hidden border border-border bg-elevated/80 px-6 py-10",
          rounded ? "rounded-2xl" : "rounded-none border-0",
          className,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(232,184,74,0.08),transparent_50%)]"
        />
        <div className="relative flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-strong bg-[#f4f1ea]">
            <Image
              src={project.logo}
              alt=""
              width={56}
              height={56}
              className="size-full object-cover"
            />
          </div>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              {project.title}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MediaPlaceholder
      className={cn(
        "aspect-video",
        !rounded && "rounded-none border-0",
        className,
      )}
    />
  );
}
