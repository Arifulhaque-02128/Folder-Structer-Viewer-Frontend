export interface Folder {
  _id: string;
  name: string;
  parentId: string | null;
  isRoot: boolean;
  children: Folder[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}