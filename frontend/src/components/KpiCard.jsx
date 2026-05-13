import React from 'react';

// Make sure the word "default" is present here!
export default function KpiCard({ title, value, colorClass }) {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-md border-l-4 ${colorClass}`}>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-800 mt-2">
        {value}
      </p>
    </div>
  );
}