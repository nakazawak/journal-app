import Journal from "@/app/components/JournalEntry";

export default async function JournalPage({ params }: { params: Promise<{ date: string }> }) {
    const resolvedParams = await params;
    return (
        <div className="p-8">
            <Journal params={resolvedParams} />
        </div>
    );
}
