"use client";

import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { getTestsList, getTestAnalytics } from "@/actions/admin_B/analysis.actions";
import { BarChart3, TrendingUp, Users, Activity, CheckCircle2, AlertCircle, Crown } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TestAttemptsPage() {
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const chartRef = useRef(null);

  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");

  const [analytics, setAnalytics] = useState({
    scoreDistribution: [],
    maxScore: 20,
    totalAttempts: 0,
    averageScore: 0,
    passRate: 0,
    passThreshold: 0
  });

  // 1. Load list of tests on mount
  useEffect(() => {
    async function init() {
      const res = await getTestsList();
      if (res.success && res.data.length > 0) {
        setTests(res.data);
        // Automatically select the first test (most recent)
        setSelectedTestId(res.data[0].id);
      } else {
        setLoading(false); // No tests found
      }
    }
    init();
  }, []);

  // 2. Fetch analytics when selectedTestId changes
  useEffect(() => {
    if (!selectedTestId) return;

    async function fetchAnalysis() {
      setAnalyzing(true);
      const res = await getTestAnalytics(selectedTestId);
      if (res.success) {
        setAnalytics(res.data);
      }
      setAnalyzing(false);
      setLoading(false);
    }
    fetchAnalysis();
  }, [selectedTestId]);


  // Chart Data
  const chartLabels = Array.from({ length: analytics.maxScore + 1 }, (_, i) => i.toString());

  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.25)');
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0.0)');
    return gradient;
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Students",
        data: analytics.scoreDistribution,
        borderColor: "#4f46e5", // Indigo-600 (sharper blue)
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx);
        },
        pointBackgroundColor: "#fff",
        pointBorderColor: "#4f46e5",
        pointHoverBackgroundColor: "#4f46e5",
        pointHoverBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 10,
        titleFont: { size: 12, family: 'system-ui' },
        bodyFont: { size: 11, family: 'system-ui' },
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          title: (items) => `Score: ${items[0].label}/${analytics.maxScore}`,
          label: (item) => `${item.raw} Students`
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: { stepSize: 1, color: "#64748b", font: { size: 10 } },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 10 }, maxTicksLimit: 20 },
        border: { display: false }
      },
    },
  };

  return (
    <div className="h-[calc(100vh-64px)] pb-4 px-6 bg-slate-50/50 flex flex-col gap-4 overflow-y-auto custom-scrollbar">

      {/* Header & Controls */}
      <div className="pt-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Performance Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 ml-0.5">
            Visualizing student success metrics
          </p>
        </div>

        {/* Test Selector */}
        <div className="w-full md:w-64">
          <select
            value={selectedTestId}
            onChange={(e) => setSelectedTestId(e.target.value)}
            className="w-full text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 shadow-sm transition-all cursor-pointer hover:border-indigo-200"
            disabled={loading || tests.length === 0}
          >
            {tests.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
            {tests.length === 0 && !loading && <option>No tests available</option>}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400 min-h-[400px]">
          <div className="w-6 h-6 border-2 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-xs font-semibold tracking-wide">LOADING DATA</p>
        </div>
      ) : (
        <>
          {/* 3 Cards Row - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* 1. Attempts - Sharp Blue */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Attempts</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-auto">
                <span className="text-2xl font-bold text-slate-800">{analytics.totalAttempts}</span>
                <span className="text-[10px] text-slate-400 font-medium">total</span>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-50 rounded-tl-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
            </div>

            {/* 2. Avg Score - Sharp Emerald */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group hover:border-emerald-200 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Avg Score</span>
                <Crown className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-auto">
                <span className="text-2xl font-bold text-slate-800">{analytics.averageScore}</span>
                <span className="text-[10px] text-slate-400 font-medium">/ {analytics.maxScore}</span>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-emerald-50 rounded-tl-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
            </div>

            {/* 3. Pass Rate - Sharp Indigo */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group hover:border-indigo-200 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Pass Rate</span>
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex items-baseline gap-1 mt-auto">
                <span className="text-2xl font-bold text-slate-800">{analytics.passRate}%</span>
                <span className="text-[10px] text-slate-400 font-medium">{">"}50%</span>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-indigo-50 rounded-tl-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
            </div>

          </div>

          {/* Main Chart Card - Compact & Sharp */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex-1 min-h-[350px] flex flex-col relative">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Score Distribution</h2>
                <p className="text-[10px] font-medium text-slate-400">Frequency curve</p>
              </div>
              {analyzing && (
                <div className="text-[10px] font-bold text-indigo-600 animate-pulse">
                  Updating...
                </div>
              )}
            </div>

            <div className="flex-1 w-full relative">
              {analytics.totalAttempts > 0 ? (
                <Line ref={chartRef} data={chartData} options={chartOptions} />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50/30 rounded-lg border border-dashed border-slate-200">
                  <AlertCircle className="w-6 h-6 mb-2 opacity-50" />
                  <p className="text-xs font-medium">No data available</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}