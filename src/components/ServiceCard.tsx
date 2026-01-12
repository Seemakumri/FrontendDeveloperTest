'use client';
import Link from 'next/link';
import { WrenchScrewdriverIcon, UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

interface ServiceCardProps {
  service: {
    name: string;
    count: number;
    averagePrice: number;
    priceRange: {
      min: number;
      max: number;
    };
  };
  animationDelay?: number;
}

export default function ServiceCard({ service, animationDelay = 0 }: ServiceCardProps) {
  const finalAvgPrice = Math.round(service.averagePrice * 1.18);
  const finalMinPrice = Math.round(service.priceRange.min * 1.18);
  const finalMaxPrice = Math.round(service.priceRange.max * 1.18);

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group animate-fade-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
          <WrenchScrewdriverIcon className="w-6 h-6 text-blue-600" />
        </div>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
          {service.count} workers
        </span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-gray-600">
          <UserGroupIcon className="w-4 h-4 mr-2" />
          <span className="text-sm">{service.count} available professionals</span>
        </div>
        <div className="flex items-center text-gray-600">
          <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
          <span className="text-sm">₹{finalMinPrice} - ₹{finalMaxPrice} / day</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-gray-900">₹{finalAvgPrice}</span>
          <span className="text-gray-500 text-sm ml-1">avg / day</span>
        </div>
        <Link 
          href={`/workers?service=${encodeURIComponent(service.name)}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold"
        >
          View Workers
        </Link>
      </div>
    </div>
  );
}