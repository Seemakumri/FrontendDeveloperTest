'use client';
import { WorkerType } from '@/types/workers';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  serviceFilter: string;
  setServiceFilter: (service: string) => void;
  workers: WorkerType[];
}

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  serviceFilter,
  setServiceFilter,
  workers
}: SearchFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique services from workers
  const services = Array.from(new Set(workers.map(worker => worker.service))).sort();

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm border p-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search workers or services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Service Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1 md:w-48">
            <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Services</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || serviceFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setServiceFilter('');
              }}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || serviceFilter) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          )}
          {serviceFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Service: {serviceFilter}
              <button
                onClick={() => setServiceFilter('')}
                className="ml-2 hover:text-green-600"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}