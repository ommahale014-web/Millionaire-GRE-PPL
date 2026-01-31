"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * TABLES USED:
 * tests (test_id, test_name, is_published, created_at)
 * test_questions (test_question_id, test_id, question_id)
 * questions (question_id, question_text, option_a, option_b, option_c, option_d, correct_option, section_type, created_at)
 */

/**
 * Create test → createTest(testData)
 *
 * Expected testData:
 * {
 *   test_name: "Mock Test 1",
 *   is_published: false, // optional
 *   question_ids: ["uuid1", "uuid2"] // optional (existing questions)
 * }
 */
export async function createTest(testData) {
  try {
    const supabase = await createClient();

    const { question_ids = [], ...testInfo } = testData;

    // 1) Create test
    const { data: test, error: testError } = await supabase
      .from("tests")
      .insert([
        {
          test_name: testInfo.test_name,
          is_published: testInfo.is_published ?? false,
        },
      ])
      .select("*")
      .single();

    if (testError) throw testError;

    // 2) Link questions using test_questions table
    if (question_ids.length > 0) {
      const links = question_ids.map((qid) => ({
        test_id: test.test_id,
        question_id: qid,
      }));

      const { error: linkError } = await supabase
        .from("test_questions")
        .insert(links);

      if (linkError) throw linkError;
    }

    revalidatePath("/admin/tests");
    return { success: true, data: test };
  } catch (err) {
    console.error("createTest error:", err);
    return {
      success: false,
      error: err?.message || "Failed to create test",
    };
  }
}

/**
 * Get all tests → getAllTests()
 */
export async function getAllTests() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("getAllTests error:", err);
    return {
      success: false,
      error: err?.message || "Failed to fetch tests",
    };
  }
}

/**
 * Get test by ID → getTestById(testId)
 * Returns test + linked questions
 */
export async function getTestById(testId) {
  try {
    const supabase = await createClient();

    // 1) Get test
    const { data: test, error: testError } = await supabase
      .from("tests")
      .select("*")
      .eq("test_id", testId)
      .single();

    if (testError) throw testError;

    // 2) Get linked questions (via mapping table)
    const { data: linkedQuestions, error: qError } = await supabase
      .from("test_questions")
      .select(
        `
        test_question_id,
        question_id,
        questions (
          question_id,
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_option,
          section_type,
          created_at
        )
      `
      )
      .eq("test_id", testId);

    if (qError) throw qError;

    // Extract questions properly
    const questions = (linkedQuestions || [])
      .map((row) => row.questions)
      .filter(Boolean);

    return {
      success: true,
      data: {
        ...test,
        questions,
      },
    };
  } catch (err) {
    console.error("getTestById error:", err);
    return {
      success: false,
      error: err?.message || "Failed to fetch test by id",
    };
  }
}

/**
 * Update test → updateTest(testId, testData)
 *
 * Allowed updates:
 * - test_name
 * - is_published (optional)
 *
 * If you also want to update linked questions, pass:
 * question_ids: ["uuid1","uuid2"]
 */
export async function updateTest(testId, testData) {
  try {
    const supabase = await createClient();

    const { question_ids, ...testInfo } = testData;

    // 1) Update tests table
    const { data: updatedTest, error: updateError } = await supabase
      .from("tests")
      .update({
        ...(testInfo.test_name !== undefined && { test_name: testInfo.test_name }),
        ...(testInfo.is_published !== undefined && {
          is_published: testInfo.is_published,
        }),
      })
      .eq("test_id", testId)
      .select("*")
      .single();

    if (updateError) throw updateError;

    // 2) If question_ids provided, update mapping table
    if (Array.isArray(question_ids)) {
      // delete old links
      const { error: deleteError } = await supabase
        .from("test_questions")
        .delete()
        .eq("test_id", testId);

      if (deleteError) throw deleteError;

      // insert new links (if any)
      if (question_ids.length > 0) {
        const links = question_ids.map((qid) => ({
          test_id: testId,
          question_id: qid,
        }));

        const { error: insertError } = await supabase
          .from("test_questions")
          .insert(links);

        if (insertError) throw insertError;
      }
    }

    revalidatePath("/admin/tests");
    revalidatePath(`/admin/tests/${testId}`);

    return { success: true, data: updatedTest };
  } catch (err) {
    console.error("updateTest error:", err);
    return {
      success: false,
      error: err?.message || "Failed to update test",
    };
  }
}

/**
 * Publish test → publishTest(testId)
 */
export async function publishTest(testId) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tests")
      .update({ is_published: true })
      .eq("test_id", testId)
      .select("*")
      .single();

    if (error) throw error;

    revalidatePath("/admin/tests");
    revalidatePath(`/admin/tests/${testId}`);

    return { success: true, data };
  } catch (err) {
    console.error("publishTest error:", err);
    return {
      success: false,
      error: err?.message || "Failed to publish test",
    };
  }
}

/**
 * Unpublish test → unpublishTest(testId)
 */
export async function unpublishTest(testId) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tests")
      .update({ is_published: false })
      .eq("test_id", testId)
      .select("*")
      .single();

    if (error) throw error;

    revalidatePath("/admin/tests");
    revalidatePath(`/admin/tests/${testId}`);

    return { success: true, data };
  } catch (err) {
    console.error("unpublishTest error:", err);
    return {
      success: false,
      error: err?.message || "Failed to unpublish test",
    };
  }
}
