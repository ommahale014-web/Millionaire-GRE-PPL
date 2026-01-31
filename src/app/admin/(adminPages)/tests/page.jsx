"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useTestsStore } from "@/store/useTestsStore";

export default function TestsPage() {
  const router = useRouter();
  const { tests, deleteTest } = useTestsStore();

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    deleteTest(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Tests</h1>
        <Button
          onClick={() => router.push("/admin/tests/create")}
          className="text-white bg-blue-600 text-md hover:bg-blue-700 flex items-center gap-2"
        >
          <span className="text-white text-xl font-bold">+</span> Create Test
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md border border-black rounded-lg ">
        <table className="w-full table-auto text-gray-900">
          <thead>
            <tr>
              <th className=" px-6 py-3 text-sm">Test Name</th>
              <th className=" px-6 py-3 text-sm">Status</th>
              <th className="text-right px-6 py-3 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.length > 0 ? (
              tests.map((test) => (
                <tr
                  key={test.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-center">{test.title}</td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        test.published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {test.published ? "Published" : "Unpublished"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2 justify-end">
                    <button
                      onClick={() => router.push(`/admin/tests/edit/${test.id}`)}
                      className="icon-btn text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="icon-btn text-red-600"
                      onClick={() => handleDelete(test.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No tests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
