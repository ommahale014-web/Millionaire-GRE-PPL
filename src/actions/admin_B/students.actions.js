"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getUniqueStudents() {
    try {
        const supabase = await createSupabaseServerClient();

        // Fetch all results to extract unique students
        // Since we don't have a dedicated 'users' table in the schema provided,
        // we derive students from test_results.
        const { data, error } = await supabase
            .from("test_results")
            .select("student_name, email, created_at")
            .order("created_at", { ascending: false });

        if (error) throw error;

        // Filter for unique emails
        const uniqueMap = new Map();

        data.forEach(item => {
            if (!uniqueMap.has(item.email)) {
                uniqueMap.set(item.email, {
                    id: item.email, // using email as ID since we lack user UUIDs in this view
                    student_name: item.student_name,
                    email: item.email,
                    last_active: item.created_at
                });
            }
        });

        const uniqueStudents = Array.from(uniqueMap.values());

        return { success: true, data: uniqueStudents };
    } catch (err) {
        console.error("getUniqueStudents error:", err);
        return {
            success: false,
            error: err?.message || "Failed to fetch students",
        };
    }
}
