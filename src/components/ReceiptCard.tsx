import React from 'react';
import { format } from 'date-fns';
import { Receipt } from '../types/receipt';
import { Receipt as ReceiptIcon, Store, Calendar, DollarSign } from 'lucide-react';

interface Props {
  receipt: Receipt;
}

export function ReceiptCard({ receipt }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={receipt.imageUrl}
          alt={`Receipt from ${receipt.storeName}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Store className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-gray-800">{receipt.storeName}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(receipt.uploadDate), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-green-600">
            ${receipt.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}