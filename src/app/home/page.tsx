'use client'

import { useRouter } from 'next/navigation';
import Calendar from "@/app/components/Calendar";

export default function CalendarPage() {
    const router = useRouter();

    function handleDateSelect(date: Date | undefined){
        if (!date) return;

        const formattedDate = date.toLocaleDateString('en-CA');
        router.push(`/journal/${formattedDate}`);
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            {/*Pass our handler function to the calendar.
            The calendar will call this when a date is clicked.*/}
            <Calendar onDateSelect={handleDateSelect}/>
        </div>
    );
}
