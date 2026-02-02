'use client'

import { useState } from 'react'
import { Sparkles, Wand2 } from 'lucide-react'
import { sendMessage } from '@/actions/ai/generateQuestions.actions'

export default function AIGeneratePage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleGenerate = async () => {
    if (!query.trim()) return

    try {
      setLoading(true)
      setResponse(null)
      const aiResponse = await sendMessage(query.trim())
      setResponse(aiResponse)
    } catch (err) {
      console.error(err)
      alert('Failed to generate questions')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
            <Wand2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              AI Question Generator
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Generate precise GRE / PPL exam questions by topic using AI
            </p>
          </div>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 overflow-hidden relative">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
            Target Topic
          </label>

          <div className="relative z-10">
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. Provide 5 difficult Quantitative Comparison questions regarding Geometry and Circles..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-none shadow-inner"
            />
          </div>

          <div className="flex justify-end mt-4 relative z-10">
            <button
              onClick={handleGenerate}
              disabled={loading || !query.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Sparkles size={16} className="animate-pulse" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Questions
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output */}
        {response && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-8 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 rounded-t-lg"></div>

            <h2 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Generated Results
            </h2>

            {/* 🔤 Enhanced Typography */}
            <div className="prose prose-sm prose-slate max-w-none font-medium text-slate-700 leading-relaxed whitespace-pre-wrap p-4 bg-slate-50/50 rounded-lg border border-slate-100">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
