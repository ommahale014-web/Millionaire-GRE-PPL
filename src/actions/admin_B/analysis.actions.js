"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * 1. Get List of Tests for Dropdown
 */
export async function getTestsList() {
    try {
        const supabase = await createSupabaseServerClient();

        // Just need ID and Title for the dropdown
        const { data, error } = await supabase
            .from("tests")
            .select("id, title")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return { success: true, data };
    } catch (err) {
        console.error("getTestsList error:", err);
        return { success: false, error: err?.message };
    }
}

/**
 * 2. Get Analytics for a Specific Test
 */
export async function getTestAnalytics(testId) {
    try {
        const supabase = await createSupabaseServerClient();

        // A. Fetched Max Possible Score by counting entries in test_questions
        const { count: maxScore, error: countError } = await supabase
            .from("test_questions")
            .select("*", { count: "exact", head: true })
            .eq("test_id", testId);

        if (countError) throw countError;

        // Default to at least score 1 to prevent empty array issues if test has 0 questions
        const safeMaxScore = maxScore || 1;

        // B. Fetch Results for this Test
        const { data: results, error: resError } = await supabase
            .from("test_results")
            .select("score, created_at")
            .eq("test_id", testId);

        if (resError) throw resError;

        // C. Calculate Stats
        // Create distribution array [countOf0, countOf1, ..., countOfMax]
        const scoreDistribution = new Array(safeMaxScore + 1).fill(0);
        let totalScore = 0;

        results.forEach((r) => {
            const s = r.score;
            // Safety check to keep within bounds
            if (typeof s === "number" && s >= 0) {
                if (s <= safeMaxScore) {
                    scoreDistribution[s]++;
                } else {
                    // Edge case: someone scored higher than current max? (e.g. question deleted)
                    // Just cap it at max
                    scoreDistribution[safeMaxScore]++;
                }
                totalScore += s;
            }
        });

        const totalAttempts = results.length;
        const averageScore = totalAttempts > 0 ? (totalScore / totalAttempts).toFixed(1) : 0;

        // Pass rate (Assuming 50% is pass)
        const passThreshold = Math.ceil(safeMaxScore / 2);
        const passedCount = results.filter(r => r.score >= passThreshold).length;
        const passRate = totalAttempts > 0 ? Math.round((passedCount / totalAttempts) * 100) : 0;

        return {
            success: true,
            data: {
                scoreDistribution, // array
                maxScore: safeMaxScore,
                totalAttempts,
                averageScore,
                passRate,
                passThreshold
            },
        };

    } catch (err) {
        console.error("getTestAnalytics error:", err);
        return {
            success: false,
            error: err?.message || "Failed to fetch analytics",
        };
    }
}
