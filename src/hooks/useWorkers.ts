import { useState, useEffect } from 'react';
import { WorkerType } from '@/types/workers';

export function useWorkers() {
  const [workers, setWorkers] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await fetch('/api/workers');
        if (!response.ok) {
          throw new Error('Failed to fetch workers');
        }
        
        const data = await response.json();
        if (data.success) {
          setWorkers(data.data);
        } else {
          throw new Error(data.error || 'Failed to load workers');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error loading workers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkers();
  }, []);

  return { workers, loading, error };
}