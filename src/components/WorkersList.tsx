import { WorkerType } from '@/types/workers';
import WorkerCard from './WorkerCard';

interface WorkersListProps {
  workers: WorkerType[];
}

export default function WorkersList({ workers }: WorkersListProps) {
  if (workers.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {workers
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((worker, index) => (
          <WorkerCard
            key={worker.id}
            worker={worker}
            animationDelay={index * 0.1}
          />
        ))}
    </div>
  );
}