'use client';

interface DeleteModalProps {
  isOpen: boolean;
  folderName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteFolderModal({ isOpen, folderName, onClose, onConfirm }: DeleteModalProps) {
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
        <h2 className="text-xl font-semibold mb-4">Delete <span className="text-red-600">{folderName}</span>?</h2>
        
        {/* <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>&quot;{folderName}&quot;</strong>? 
          This will also delete all subfolders inside it. This action cannot be undone.
        </p> */}
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}