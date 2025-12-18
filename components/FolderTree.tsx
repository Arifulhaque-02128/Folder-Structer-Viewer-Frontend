'use client';

import { Folder } from '@/types/folder';
import FolderItem from './FolderItem';

interface FolderTreeProps {
  folders: Folder[];
  loading: boolean;
  onAddFolder: (id: string, name: string) => void;
  onDeleteFolder: (id: string, name: string) => void;
}

export default function FolderTree({
  folders,
  loading,
  onAddFolder,
  onDeleteFolder,
}: FolderTreeProps) {


  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        Loading folders...
      </div>
    );
  }

  if (!loading && folders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
        <p className="text-lg font-medium">No folders yet</p>
        <p className="text-sm mt-2">
          Create your first folder to get started 📁
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {folders.map((folder) => (
        <FolderItem
          key={folder._id}
          folder={folder}
          level={0}
          onAddFolder={onAddFolder}
          onDeleteFolder={onDeleteFolder}
        />
      ))}
    </div>
  );
}
