"use client";

import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";


export interface JournalProps {
    params: {
        date: string;
    };
}

export default function Journal({ params }: JournalProps) {
    const { date } = params;
    const [entry, setEntry] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    //load existing entry for current date
    useEffect(() => {
        async function fetchEntry() {
            const { data: { user } } = await supabase.auth.getUser();
            if(!user)
                return;

            //fetches journal entry and rating from filtered date in database
            const { data, error } = await supabase
                .from('entries')
                .select('journal_entry, rating')
                .eq('user_id', user.id)
                .eq('entry_date', date)
                .single();
            
            if (data) {
                setEntry(data.journal_entry);
                setRating(data.rating);
            }
            if (error && error.code !== 'PGRST116') {
                console.error(error);
            }
        }

        fetchEntry();
    }, [date]);

    async function handleSave() {
        setLoading(true);

        const { data: { user} } = await supabase.auth.getUser();
        if (!user) {
            alert('You must be logged in.');
            setLoading(false);
            return;
        }

        const { error } = await supabase
        .from('entries')
        .upsert(
            {
              user_id: user.id,
              entry_date: date,
              journal_entry: entry,
              rating,
            },
            {
              onConflict: 'user_id,entry_date',
            }
          );
    
        if (error) {
          console.error(error);
          alert('Error saving entry');
        } else {
          alert('Entry saved ✅');
        }
    
        setLoading(false);
        

    }



    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Journal Entry for {date}
            </h1>
            {/*Journal text*/}
            <textarea
                className="w-full border p-4 rounded-md"
                rows={10}
                placeholder="Write about your day..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            />
            {/*Mood rating*/}
            <div className="mt-4">
                <label className="block mb-2 font-medium">
                    Daily Rating (1-10)
                </label>

                <input
                    type = "number"
                    min={1}
                    max={10}
                    value={rating ?? ""}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border p-2 rounded-md w-24"
                />
                </div>
            <button 
                onClick={handleSave}
                disabled={loading}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                {loading ? 'Saving...' : 'Save Entry'}
            </button>
        </div>
    )
}