"use client";

import { useEffect, useState } from "react";
import { getUniqueStudents } from "@/actions/admin_B/students.actions";
import { Users, Search, Mail, Calendar, UserCheck } from "lucide-react";

export default function StudentsInfoPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await getUniqueStudents();
        if (res.success) {
          setStudents(res.data);
        } else {
          console.error(res.error);
        }
      } catch (err) {
        console.error("Error fetching students", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] pb-3 px-6 bg-slate-50/50 flex flex-col gap-3">

      {/* 1. Header & Search */}
      <div className="flex items-center justify-between shrink-0 pt-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Students List
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold border border-indigo-200">
              {students.length} Total Students
            </span>
          </div>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 2. Students Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0 relative">
        <div className="overflow-y-auto flex-1 p-0 custom-scrollbar">
          <table className="w-full relative border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
              <tr className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3 bg-slate-50">Student Name</th>
                <th className="px-6 py-3 bg-slate-50">Email Address</th>
                <th className="px-6 py-3 bg-slate-50 text-right">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
                      <span className="text-xs">Loading students...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-indigo-50/50 transition-colors group"
                  >
                    <td className="px-6 py-2.5">
                      <div className="flex items-center gap-2 font-medium text-slate-800 text-xs">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                          {s.student_name.charAt(0).toUpperCase()}
                        </div>
                        {s.student_name}
                      </div>
                    </td>
                    <td className="px-6 py-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <Mail className="w-3.5 h-3.5 text-slate-300" />
                        {s.email}
                      </div>
                    </td>
                    <td className="px-6 py-2.5 text-right">
                      <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(s.last_active).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-100">
                      <UserCheck className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-xs font-medium">No students found</p>
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
