'use client';
import { useState, useEffect } from 'react';
import FolderTree from '@/components/FolderTree';
import AddFolderModal from '@/components/AddFolderModal';
import DeleteModal from '@/components/DeleteFolderModal';
import { folderApi } from '@/lib/api';
import { Folder } from '@/types/folder';

export default function Home() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [selectedParentName, setSelectedParentName] = useState<string | null>(null)
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<{ id: string; name: string } | null>(null);

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await folderApi.getFolders();
      setFolders(data);
    } catch (err) {
      setError('Failed to load folders. Please check if the backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFolder = (parentId: string, parentName : string) => {
    setSelectedParentId(parentId);
    setSelectedParentName(parentName)
    setIsAddModalOpen(true);
  };

  const handleAddFolderSubmit = async (name: string) => {
    try {
      setIsCreating(true);
      await folderApi.createFolder(name, selectedParentId);
      setIsAddModalOpen(false);
      await loadFolders();
    } catch (err) {
      setError('Failed to create folder');
      console.error('Error:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteFolder = (id: string, name: string) => {
    setFolderToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!folderToDelete) return;

    try {
      await folderApi.deleteFolder(folderToDelete.id);
      setIsDeleteModalOpen(false);
      setFolderToDelete(null);
      await loadFolders();
    } catch (err) {
      setError('Failed to delete folder');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Folder Tree</h1>
          <p className="text-gray-600">Manage your folders</p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Loading Message */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
            Loading folders...
          </div>
        )}

        {/* Folder Tree */}
        {!error && (
          <FolderTree
            folders={folders}
            loading={loading}
            onAddFolder={handleAddFolder}
            onDeleteFolder={handleDeleteFolder}
          />
        )}

        {/* Add Modals */}
        <AddFolderModal
          isOpen={isAddModalOpen}
          parentFolderName={selectedParentName || ''}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddFolderSubmit}
          isLoading={isCreating}
        />



        {/* Delete Modals */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          folderName={folderToDelete?.name || ''}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setFolderToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
}