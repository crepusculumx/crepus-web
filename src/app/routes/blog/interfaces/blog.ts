export interface BlogTreeNode {
  path: string;
  title: string;
  children?: BlogTreeData;
}

export type BlogTreeData = BlogTreeNode[];

export type ThemeType = string;
export type FileType = string;

export type ThemeTypes = ThemeType[];
export type FileTypes = FileType[];
export interface BlogFileInfo {
  urlPath: string;
  themeType: ThemeType;
  fileType: FileType;
}

export interface BlogInfo {
  path: string;
  title: string;
  blogFileInfos: BlogFileInfo[];
}
