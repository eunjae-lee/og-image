export type FileType = "png" | "jpeg";
export type Theme = string;

export interface ParsedRequest {
  fileType: FileType;
  text: string;
  theme: Theme;
  md: boolean;
  fontSize: string;
  images: string[];
  widths: string[];
  heights: string[];
  extra?: any;
}
