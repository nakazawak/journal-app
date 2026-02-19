import Journal, { JournalProps } from "@/app/components/JournalEntry";
export default function JournalPage({ params }: { params: { date: string } }) {
    return (
        <div>
            <Journal params={params} />
        </div>
    );
}
