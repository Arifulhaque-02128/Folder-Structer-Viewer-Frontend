'use client';
import { useState, useEffect, FormEvent } from 'react';

interface AddFolderModalProps {
  isOpen: boolean;
  parentFolderName: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

export default function AddFolderModal({ isOpen, onClose, onSubmit, parentFolderName, isLoading }: AddFolderModalProps) {
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFolderName('');
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onSubmit(folderName.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Folder in <span className='text-green-600'>{parentFolderName}</span></h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            autoFocus
          />
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
                type="submit"
                disabled={!folderName.trim() || isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}