'use client';
import { WorkerType } from '@/types/workers';
import Image from 'next/image';
import { useState } from 'react';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';

interface WorkerCardProps { 
  worker: WorkerType;
  animationDelay?: number;
}

export default function WorkerCard({ worker, animationDelay = 0 }: WorkerCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate random rating for demo purposes
  const rating = Math.random() * 0.8 + 4.2; // 4.2 - 5.0
  const reviewCount = Math.floor(Math.random() * 50) + 10;

  const finalPrice = Math.round(worker.pricePerDay * 1.18);

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
        )}
        <Image
          src={imageError ? '/api/placeholder/300/200' : worker.image}
          alt={worker.name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
          {worker.service}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{worker.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 text-sm mx-2">•</span>
          <span className="text-gray-500 text-sm">{reviewCount} reviews</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span>Delhi, India</span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{finalPrice}</span>
            <span className="text-gray-500 text-sm ml-1">/ day</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold">
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
}