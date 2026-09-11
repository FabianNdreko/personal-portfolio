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
  if (!project.cover) {
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

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden border border-border bg-elevated-2",
        rounded ? "rounded-xl" : "rounded-none border-0",
        className,
      )}
    >
      <Image
        src={project.cover}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 48rem, 100vw"
        className="object-cover"
      />
    </div>
  );
}
