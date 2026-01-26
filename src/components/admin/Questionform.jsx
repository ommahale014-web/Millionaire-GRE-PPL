"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";

const EMPTY_FORM = {
  question_text: "",
  section_type: "MCQ",
  options: ["", "", "", ""],
  correct_option: "",
  points: 1, // ✅ default marks
};

export default function Questionform({ initialData, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  /* ---------- Load edit data ---------- */
  useEffect(() => {
    if (!initialData) return;

    setForm({
      question_text: initialData.question_text ?? "",
      section_type: initialData.section_type ?? "MCQ",
      options: [
        initialData.option_a ?? "",
        initialData.option_b ?? "",
        initialData.option_c ?? "",
        initialData.option_d ?? "",
      ],
      correct_option: initialData.correct_option ?? "",
      points: initialData.points ?? 1, // ✅ load marks
    });
  }, [initialData]);

  /* ---------- Handle type change ---------- */
  useEffect(() => {
    if (form.section_type === "True/False") {
      setForm((p) => ({
        ...p,
        options: ["True", "False", "", ""],
        correct_option: "",
      }));
    }
  }, [form.section_type]);

  const updateOption = (i, value) => {
    const updated = [...form.options];
    updated[i] = value;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.question_text.trim()) {
      alert("Question is required");
      return;
    }

    if (!form.correct_option) {
      alert("Select correct answer");
      return;
    }

    const payload = {
      question_text: form.question_text.trim(),
      section_type: form.section_type,
      option_a: form.options[0] || null,
      option_b: form.options[1] || null,
      option_c: form.options[2] || null,
      option_d: form.options[3] || null,
      correct_option: form.correct_option,
      points: Number(form.points), // ✅ save marks
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Question Type */}
      <select
        className="input"
        value={form.section_type}
        onChange={(e) =>
          setForm({ ...form, section_type: e.target.value })
        }
      >
        <option value="MCQ">MCQ</option>
        <option value="True/False">True / False</option>
      </select>

      {/* Question */}
      <Textarea
        placeholder="Enter question"
        value={form.question_text}
        onChange={(e) =>
          setForm({ ...form, question_text: e.target.value })
        }
        required
      />

      {/* Options */}
      {form.options.map((opt, i) =>
        form.section_type === "MCQ" || i < 2 ? (
          <Input
            key={i}
            placeholder={`Option ${String.fromCharCode(65 + i)}`}
            value={opt}
            onChange={(e) => updateOption(i, e.target.value)}
          />
        ) : null
      )}

      {/* Correct Answer */}
      <select
        className="input"
        value={form.correct_option}
        onChange={(e) =>
          setForm({ ...form, correct_option: e.target.value })
        }
      >
        <option value="">Select correct answer</option>
        {form.options.map(
          (opt, i) =>
            opt && (
              <option key={i} value={opt}>
                {opt}
              </option>
            )
        )}
      </select>

      {/* ✅ MARKS INPUT */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Marks
        </label>
        <Input
          type="number"
          min={1}
          className="w-32"
          value={form.points}
          onChange={(e) =>
            setForm({ ...form, points: e.target.value })
          }
        />
      </div>

      <Button type="submit">Save Question</Button>
    </form>
  );
}
