'use client';
import { useState } from 'react';
import { Folder } from '@/types/folder';

interface FolderItemProps {
  folder: Folder;
  level: number;
  onAddFolder: (id: string, name: string) => void;
  onDeleteFolder: (id: string, name: string) => void;
}

export default function FolderItem({ folder, level, onAddFolder, onDeleteFolder }: FolderItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = folder.children && folder.children.length > 0;

  return (
    <div style={{ marginLeft: `${level * 24}px` }} className='cursor-pointer'>
      <div className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100 group">
        {/* Toggle Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-5 h-5 flex items-center justify-center text-gray-600"
        >
          {hasChildren ? (
            <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
          ) : (
            <span>📁</span>
          )}
        </button>

        {/* Folder Name */}
        <span className="flex-1 text-gray-800 font-medium">{folder.name}</span>

        {/* Action Buttons */}
        <div className="opacity-0 group-hover:opacity-100 flex gap-1">
          <button
            onClick={() => onAddFolder(folder._id, folder.name)}
            className="px-2 py-1 text-sm text-green-600 hover:bg-green-50 rounded cursor-pointer"
          >
            + New
          </button>
          {!folder.isRoot && (
            <button
              onClick={() => onDeleteFolder(folder._id, folder.name)}
              className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isOpen && (
        <div>
          {folder.children.map((child) => (
            <FolderItem
              key={child._id}
              folder={child}
              level={level + 1}
              onAddFolder={onAddFolder}
              onDeleteFolder={onDeleteFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}