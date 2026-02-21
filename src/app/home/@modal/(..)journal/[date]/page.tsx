'use client'

import { use } from 'react';
import { useRouter } from 'next/navigation';
import JournalEntry from '@/app/components/JournalEntry';

interface Props {
    params: Promise<{ date: string }>;
}

export default function JournalEntryModal({ params }: Props) {
    const router = useRouter();
    const resolvedParams = use(params);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"> {/*Fullscreen overlay*/}
        <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-xl relative">{/*Modal card*/}
          {/*Close button*/}
          <button
            onClick={() => router.back()}
            className="absolute top-4 right-4 text-gray-500"
          >
            ✕
          </button>
  
          <JournalEntry params={resolvedParams} />
        </div>
      </div>
    );
}