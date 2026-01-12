// 'use client'
// import { WorkerType } from '@/types/workers'
// import Image from 'next/image'
// import { useState, useEffect } from 'react'

// export default function WorkersPage() {
//   const [workersData, setWorkersData] = useState<WorkerType[]>([])

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const response = await import('../../workers.json')
//         setWorkersData(response.default)
//       } catch (error) {
//         console.error('Failed to load workers:', error)
//       }
//     }
//     loadData()
//     loadData()
//   }, [])

//   return (
//     <main className='container mx-auto px-4 py-8 bg-[#000000]'>
//       <h1 className='text-3xl font-bold mb-8 text-center'>Our Workers</h1>

//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6'>
//         {workersData
//           .filter((worker) => worker.pricePerDay > 0)
//           .filter((worker) => worker.id !== null)
//           .sort((a, b) => a.name.localeCompare(b.name))
//           .map((worker: WorkerType) => (
//             <div
//               key={worker.id}
//               className='border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300'
//             >
//               <div className='w-full h-48 relative'>
//                 <Image
//                   src={worker.image}
//                   alt={worker.name}
//                   fill
//                   className='object-cover'
//                   priority={worker.id <= 10}
//                 />
//               </div>
//               <div className='p-4'>
//                 <h2 className='text-xl font-semibold'>{worker.name}</h2>
//                 <p className='text-gray-600'>{worker.service}</p>
//                 <p className='mt-2 font-medium'>
//                   ₹{Math.round(worker.pricePerDay * 1.18)} / day
//                 </p>
//               </div>
//             </div>
//           ))}
//       </div>
//     </main>
//   )
// }


import Link from 'next/link';
import { ChevronRightIcon, WrenchScrewdriverIcon, PaintBrushIcon, HomeModernIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const features = [
    {
      name: 'Skilled Professionals',
      description: 'Verified workers with proven expertise',
      icon: WrenchScrewdriverIcon,
    },
    {
      name: 'Transparent Pricing',
      description: 'Clear daily rates with no hidden costs',
      icon: PaintBrushIcon,
    },
    {
      name: 'Quick Hiring',
      description: 'Find and hire workers in minutes',
      icon: HomeModernIcon,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Find Skilled Workers
            <span className="block text-blue-200">For Every Task</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Connect with verified professionals for plumbing, electrical work, painting, and more. 
            Transparent pricing, quality guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/workers" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 inline-flex items-center justify-center"
            >
              Browse Workers
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              View Services
            </Link>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Solve Ease?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding reliable workers simple and stress-free
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.name}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Skilled Workers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Services</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Availability</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}