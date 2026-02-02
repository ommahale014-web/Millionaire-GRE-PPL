"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAllTestResults() {
    try {
        const supabase = await createSupabaseServerClient();

        // Fetch results and join with tests to get the title
        // test_results has a foreign key test_id -> tests.id
        const { data, error } = await supabase
            .from("test_results")
            .select(`
        *,
        tests (
          title
        )
      `)
            .order("created_at", { ascending: false });

        if (error) throw error;

        // Flatten/Format data if needed
        const formattedData = data.map(record => ({
            id: record.id,
            student_name: record.student_name,
            email: record.email,
            score: record.score,
            test_title: record.tests?.title || "Unknown Test",
            created_at: record.created_at
        }));

        return { success: true, data: formattedData };
    } catch (err) {
        console.error("getAllTestResults error:", err);
        return {
            success: false,
            error: err?.message || "Failed to fetch test results",
        };
    }
}
