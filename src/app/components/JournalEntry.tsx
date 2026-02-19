"use client";

interface JournalPageProps {
    params: {
        date: string;
    };
}

export default function JournalPage({ params }: JournalPageProps) {
    const { date } = params;

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">
                Journal Entry for {date}
            </h1>
            <textarea
                className="w-full border p-4 rounded-md"
                rows={10}
                placeholder="Write about your day..."
            />


            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                Save Entry
            </button>
        </div>
    )
}