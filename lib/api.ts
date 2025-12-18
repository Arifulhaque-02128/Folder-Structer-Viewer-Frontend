import { Folder, ApiResponse } from '@/types/folder';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const folderApi = {
  async getFolders(): Promise<Folder[]> {
    const response = await fetch(`${API_URL}/folders`);
    if (!response.ok) throw new Error('Failed to fetch folders');
    const data: ApiResponse<Folder[]> = await response.json();
    return data.data || [];
  },

  async createFolder(name: string, parentId: string | null): Promise<Folder> {
    const response = await fetch(`${API_URL}/folders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, parentId }),
    });
    if (!response.ok) throw new Error('Failed to create folder');
    const data: ApiResponse<Folder> = await response.json();
    return data.data!;
  },

  async deleteFolder(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/folders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete folder');
  },
};