'use client';
import { useState, useEffect } from 'react';
import ServiceCard from '@/components/ServiceCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ServiceStats {
  name: string;
  count: number;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/api/services?stats=true');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        } else {
          throw new Error(data.error || 'Failed to load services');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Services</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of professional services with transparent pricing
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.name}
              service={service}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      )}
    </div>
  );
}