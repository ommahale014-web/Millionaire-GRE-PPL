"use client";

import { useEffect, useState } from "react";
import { getAllTestResults } from "@/actions/admin_B/results.actions";
import { Trophy, Search, User, Mail, FileText, Calendar } from "lucide-react";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await getAllTestResults();
        if (res.success) {
          setResults(res.data);
        } else {
          console.error(res.error);
        }
      } catch (err) {
        console.error("Error fetching results", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  const filteredResults = results.filter(
    (r) =>
      r.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.test_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] pb-3 px-6 bg-slate-50/50 flex flex-col gap-3">

      {/* 1. Header & Search */}
      <div className="flex items-center justify-between shrink-0 pt-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Trophy className="w-5 h-5 text-blue-600" />
            Test Results
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold border border-blue-200">
              {results.length} Submissions
            </span>
          </div>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search student, email or test..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 2. Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0 relative">
        <div className="overflow-y-auto flex-1 p-0 custom-scrollbar">
          <table className="w-full relative border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
              <tr className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3 bg-slate-50">Student</th>
                <th className="px-6 py-3 bg-slate-50">Test Name</th>
                <th className="px-6 py-3 bg-slate-50">Score</th>
                <th className="px-6 py-3 bg-slate-50 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
                      <span className="text-xs">Loading results...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredResults.length > 0 ? (
                filteredResults.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-blue-50/50 transition-colors group"
                  >
                    <td className="px-6 py-2.5">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 font-medium text-slate-800 text-xs">
                          <User className="w-3 h-3 text-slate-400" />
                          {r.student_name}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-300" />
                          {r.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <FileText className="w-3 h-3 text-blue-400" />
                        {r.test_title}
                      </div>
                    </td>
                    <td className="px-6 py-2.5">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-md border ${r.score >= 80
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : r.score >= 50
                              ? "bg-blue-50 text-blue-700 border-blue-100"
                              : "bg-red-50 text-red-700 border-red-100"
                          }`}
                      >
                        {r.score} Pts
                      </span>
                    </td>
                    <td className="px-6 py-2.5 text-right">
                      <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(r.created_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-100">
                      <Trophy className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-xs font-medium">No results found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
