export interface Blog {
  id: string;
  title: string;
  context: string;
}

export interface BlogTreeNode {
  path: string;
  title: string;
  children?: BlogTreeNode[];
}

export type BlogTreeData = BlogTreeNode[];
