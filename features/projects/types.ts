export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  year: number;
  imageCaption: string;
  liveUrl?: string;
  codeUrl?: string;
};
