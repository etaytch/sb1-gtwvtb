import React, { useState } from 'react';
import { ReceiptCard } from '../components/ReceiptCard';
import { UploadZone } from '../components/UploadZone';
import { Plus, Receipt as ReceiptIcon } from 'lucide-react';
import type { Receipt } from '../types/receipt';

export function MyReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    try {
      // Implementation for upload will go here
      debugger;
      console.log('Uploading files:', files);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Receipts</h1>
          <button
            onClick={() => document.getElementById('uploadZone')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Receipt
          </button>
        </div>

        {receipts.length === 0 ? (
          <div className="text-center py-12">
            <ReceiptIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No receipts</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new receipt.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {receipts.map((receipt) => (
              <ReceiptCard key={receipt.id} receipt={receipt} />
            ))}
          </div>
        )}

        <div id="uploadZone" className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Upload New Receipts</h2>
          <UploadZone onUpload={handleUpload} />
        </div>
      </div>
    </div>
  );
}