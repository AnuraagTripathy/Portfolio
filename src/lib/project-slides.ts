import type { CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { projects } from "@/content/projects";

export const projectSlides: CoverflowSlide[] = projects.map((project) => ({
  src: project.image,
  alt: project.name,
  title: project.name,
  subtitle: project.subtitle ?? project.period,
  meta: [{ label: "When", value: project.period }],
}));
