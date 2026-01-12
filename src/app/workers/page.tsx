'use client';
import { useState, useEffect } from 'react';
import WorkersList from '@/components/WorkersList';
import SearchFilter from '@/components/SearchFilter';
import { WorkerType } from '@/types/workers';
import { useWorkers } from '@/hooks/useWorkers';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function WorkersPage() {
  const { workers, loading, error } = useWorkers();
  const [filteredWorkers, setFilteredWorkers] = useState<WorkerType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  useEffect(() => {
    if (workers.length > 0) {
      let filtered = workers.filter(worker => 
        worker.pricePerDay > 0 && worker.id !== null
      );

      if (searchTerm) {
        filtered = filtered.filter(worker =>
          worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.service.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (serviceFilter) {
        filtered = filtered.filter(worker =>
          worker.service === serviceFilter
        );
      }

      setFilteredWorkers(filtered);
    }
  }, [workers, searchTerm, serviceFilter]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Workers</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Skilled Workers
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our verified professionals and find the perfect match for your project
        </p>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        workers={workers}
      />

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <WorkersList workers={filteredWorkers} />
      )}

      {!loading && filteredWorkers.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No workers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
}