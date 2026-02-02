"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
    try {
        const supabase = await createSupabaseServerClient();

        // 1. Total Tests
        const { count: totalTests } = await supabase
            .from("tests")
            .select("*", { count: "exact", head: true });

        // 2. Total Questions
        const { count: totalQuestions } = await supabase
            .from("questions")
            .select("*", { count: "exact", head: true });

        // 3. Total Attempts & Unique Students
        const { data: attempts, error: attemptsError } = await supabase
            .from("test_results")
            .select("email, created_at");

        if (attemptsError) throw attemptsError;

        const totalAttempts = attempts.length;
        const uniqueStudents = new Set(attempts.map(a => a.email)).size;

        // 4. Recent Activity (Last 5 attempts)
        const { data: recentActivity, error: activityError } = await supabase
            .from("test_results")
            .select(`
        id,
        student_name,
        created_at,
        score,
        tests (title)
      `)
            .order("created_at", { ascending: false })
            .limit(5);

        if (activityError) throw activityError;

        const formattedActivity = recentActivity.map(item => ({
            id: item.id,
            description: `${item.student_name} completed ${item.tests?.title || 'a test'}`,
            time: item.created_at,
            score: item.score
        }));

        return {
            success: true,
            data: {
                totalStudents: uniqueStudents,
                totalTests: totalTests || 0,
                totalQuestions: totalQuestions || 0,
                totalAttempts,
                recentActivity: formattedActivity
            }
        };
    } catch (err) {
        console.error("getDashboardStats error:", err);
        return {
            success: false,
            error: err?.message || "Failed to fetch dashboard stats",
        };
    }
}
