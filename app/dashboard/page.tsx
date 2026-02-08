"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Chart from "chart.js/auto"
import axios from "axios"

type ForecastData = {
  labels: string[]
  actual: number[]
  predicted: number[]
  upperBound?: number[]
  lowerBound?: number[]
} | null

type MetricsData = {
  lstmMae: number | null
  lstmRmse: number | null
  anomaliesCount: number | null
  residualMean: number | null
  mae: number | null
  rmse: number | null
  anomalyThreshold: number | null
  totalSamples: number | null
  anomalyRatePct: number | null
  residualMin: number | null
  residualMax: number | null
  residualMedian: number | null
  residualStd: number | null
} | null

type ChartsData = {
  hourly: { labels: string[]; data: number[] } | null
  prophetForecast: { labels: string[]; actual: (number | null)[]; predicted: (number | null)[]; lowerBound?: (number | null)[]; upperBound?: (number | null)[] } | null
  prophetComponents: { labels: string[]; trend: (number | null)[]; weekly?: (number | null)[]; yearly?: (number | null)[] } | null
  anomaly: { labels: string[]; actual: (number | null)[]; anomalyPoints: (number | null)[] } | null
  lstm: ForecastData | null
  residualDistribution: { labels: string[]; frequency: number[] } | null
  powerVsTemp: { temperature: number[]; power: number[] } | null
  rolling24h: { labels: string[]; actual: (number | null)[]; rollingMean: (number | null)[] | null; rollingStd: (number | null)[] | null } | null
  metrics: MetricsData | null
  anomalyList: { timestamp: string; residual: number; actual: number | null; pred: number | null }[] | null
  hourlyLoadProfile: number[] | null
  weekdayWeekend: { labels: string[]; power: number[] } | null
  forecastTable: Record<string, string>[] | null
  correlationMatrix: { labels: string[]; matrix: number[][] } | null
} | null

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: "bottom" as const, labels: { color: "#a0a0a0", padding: 15, usePointStyle: true } },
    tooltip: { backgroundColor: "#1a1a1f", titleColor: "#e8e8ec", bodyColor: "#a0a0a0", borderColor: "#2a2a35", borderWidth: 1 },
  },
  scales: {
    x: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6a6a70" } },
    y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6a6a70" } },
  },
}

export default function DashboardPage() {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [chartsData, setChartsData] = useState<ChartsData | null>(null)
  const [chartsLoading, setChartsLoading] = useState(true)
  const [chartsError, setChartsError] = useState<string | null>(null)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const chart2Ref = useRef<HTMLCanvasElement>(null)
  const chart2InstanceRef = useRef<Chart | null>(null)
  const chart3Ref = useRef<HTMLCanvasElement>(null)
  const chart3InstanceRef = useRef<Chart | null>(null)
  const chart4Ref = useRef<HTMLCanvasElement>(null)
  const chart4InstanceRef = useRef<Chart | null>(null)
  const chart5Ref = useRef<HTMLCanvasElement>(null)
  const chart5InstanceRef = useRef<Chart | null>(null)
  const chart6Ref = useRef<HTMLCanvasElement>(null)
  const chart6InstanceRef = useRef<Chart | null>(null)
  const chart7Ref = useRef<HTMLCanvasElement>(null)
  const chart7InstanceRef = useRef<Chart | null>(null)
  const chart8Ref = useRef<HTMLCanvasElement>(null)
  const chart8InstanceRef = useRef<Chart | null>(null)
  const chart9Ref = useRef<HTMLCanvasElement>(null)
  const chart9InstanceRef = useRef<Chart | null>(null)
  const chart10Ref = useRef<HTMLCanvasElement>(null)
  const chart10InstanceRef = useRef<Chart | null>(null)

  const fetchCharts = () => {
    setChartsLoading(true)
    setChartsError(null)
    axios
      .get("http://localhost:5000/routes/ml/charts")
      .then((res) => setChartsData(res.data))
      .catch((err) => {
        console.error("Charts fetch error:", err)
        setChartsError(err.response?.data?.msg || err.message || "Failed to load chart data")
      })
      .finally(() => setChartsLoading(false))
  }

  useEffect(() => {
    fetchCharts()
  }, [])

  // 1. Hourly Power Consumption (Zone 1)
  useEffect(() => {
    if (!chartRef.current || chartsLoading) return
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return
    const h = chartsData?.hourly
    const labels = h?.labels ?? Array.from({ length: 50 }, (_, i) => `Hour ${i + 1}`)
    const data = h?.data ?? Array.from({ length: labels.length }, () => 30 + Math.random() * 20)
    if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null }
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Power Consumption",
          data,
          borderColor: "#5dadec",
          backgroundColor: "rgba(93, 173, 236, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        }],
      },
      options: CHART_OPTIONS,
    })
    return () => { if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null } }
  }, [chartsLoading, chartsData?.hourly])

  // 2. Prophet Forecast: Actual vs Predicted
  useEffect(() => {
    if (!chart2Ref.current || chartsLoading) return
    const ctx = chart2Ref.current.getContext("2d")
    if (!ctx) return
    const pf = chartsData?.prophetForecast
    const labels = pf?.labels ?? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
    const actual = pf?.actual ?? Array.from({ length: labels.length }, (_, i) => 35 + Math.sin(i * 0.2) * 10)
    const predicted = pf?.predicted ?? actual.map((v) => (typeof v === "number" ? v : 0) + (Math.random() * 6 - 3))
    const upperBound = pf?.upperBound ?? predicted.map((p) => (typeof p === "number" ? p : 0) * 1.1)
    const lowerBound = pf?.lowerBound ?? predicted.map((p) => (typeof p === "number" ? p : 0) * 0.9)
    if (chart2InstanceRef.current) { chart2InstanceRef.current.destroy(); chart2InstanceRef.current = null }
    chart2InstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          { label: "Actual", data: actual, borderColor: "#5dadec", backgroundColor: "rgba(93, 173, 236, 0.1)", borderWidth: 2, fill: false, tension: 0.4 },
          { label: "Predicted", data: predicted, borderColor: "#22c55e", borderWidth: 2, borderDash: [5, 5], fill: false, tension: 0.4 },
          { label: "Upper Bound", data: upperBound, borderColor: "#22c55e", borderWidth: 1, borderDash: [3, 3], fill: "+1", tension: 0.4 },
          { label: "Lower Bound", data: lowerBound, borderColor: "#16a34a", borderWidth: 1, borderDash: [3, 3], fill: "-1", tension: 0.4 },
        ],
      },
      options: CHART_OPTIONS,
    })
    return () => { if (chart2InstanceRef.current) { chart2InstanceRef.current.destroy(); chart2InstanceRef.current = null } }
  }, [chartsLoading, chartsData?.prophetForecast])

  // 3. Prophet Components (trend, weekly, yearly)
  useEffect(() => {
    if (!chart3Ref.current || chartsLoading) return
    const ctx = chart3Ref.current.getContext("2d")
    if (!ctx) return
    const pc = chartsData?.prophetComponents
    const labels = pc?.labels ?? Array.from({ length: 50 }, (_, i) => `Day ${i + 1}`)
    const trend = pc?.trend ?? Array.from({ length: labels.length }, (_, i) => 30 + i * 0.1)
    const weekly = pc?.weekly ?? Array.from({ length: labels.length }, (_, i) => Math.sin((i / 7) * Math.PI * 2) * 5)
    const yearly = pc?.yearly ?? Array.from({ length: labels.length }, () => 0)
    if (chart3InstanceRef.current) { chart3InstanceRef.current.destroy(); chart3InstanceRef.current = null }
    chart3InstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          { label: "Trend", data: trend, borderColor: "#5dadec", borderWidth: 2, fill: false, tension: 0.4 },
          { label: "Weekly", data: weekly, borderColor: "#22c55e", borderWidth: 2, fill: false, tension: 0.4 },
          { label: "Yearly", data: yearly, borderColor: "#f59e0b", borderWidth: 2, fill: false, tension: 0.4 },
        ],
      },
      options: CHART_OPTIONS,
    })
    return () => { if (chart3InstanceRef.current) { chart3InstanceRef.current.destroy(); chart3InstanceRef.current = null } }
  }, [chartsLoading, chartsData?.prophetComponents])

  // Chart 4: Device Consumption Breakdown
  useEffect(() => {
    if (chart4Ref.current && !chart4InstanceRef.current) {
      const ctx = chart4Ref.current.getContext("2d")
      if (!ctx) return

      chart4InstanceRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["HVAC", "Lighting", "Appliances", "Electronics", "Other"],
          datasets: [
            {
              data: [35, 20, 25, 12, 8],
              backgroundColor: [
                "rgba(93, 173, 236, 1)",
                "rgba(34, 197, 94, 1)",
                "rgba(251, 191, 36, 1)",
                "rgba(239, 68, 68, 1)",
                "rgba(168, 85, 247, 1)",
              ],
              borderColor: "#1a1a1f",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: { color: "#a0a0a0", padding: 15 },
            },
            tooltip: {
              backgroundColor: "#1a1a1f",
              titleColor: "#e8e8ec",
              bodyColor: "#a0a0a0",
              borderColor: "#2a2a35",
              borderWidth: 1,
            },
          },
        },
      })
    }
    return () => {
      if (chart4InstanceRef.current) {
        chart4InstanceRef.current.destroy()
        chart4InstanceRef.current = null
      }
    }
  }, [])

  // 5. LSTM: Actual vs Predicted
  useEffect(() => {
    if (!chart5Ref.current || chartsLoading) return
    const ctx = chart5Ref.current.getContext("2d")
    if (!ctx) return
    const lstm = chartsData?.lstm
    const labels = lstm?.labels ?? Array.from({ length: 50 }, (_, i) => String(i + 1))
    const actual = lstm?.actual ?? Array.from({ length: labels.length }, (_, i) => 40 + Math.sin(i * 0.15) * 15)
    const predicted = lstm?.predicted ?? actual.map((v) => v + (Math.random() * 6 - 3))
    if (chart5InstanceRef.current) { chart5InstanceRef.current.destroy(); chart5InstanceRef.current = null }
    chart5InstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          { label: "Actual", data: actual, borderColor: "#5dadec", backgroundColor: "rgba(93, 173, 236, 0.1)", borderWidth: 2, fill: false, tension: 0.4 },
          { label: "LSTM Predicted", data: predicted, borderColor: "#22c55e", borderWidth: 2, borderDash: [5, 5], fill: false, tension: 0.4 },
        ],
      },
      options: CHART_OPTIONS,
    })
    return () => { if (chart5InstanceRef.current) { chart5InstanceRef.current.destroy(); chart5InstanceRef.current = null } }
  }, [chartsLoading, chartsData?.lstm])

  // 6. Residual Error Distribution (histogram)
  useEffect(() => {
    if (!chart6Ref.current || chartsLoading) return
    const ctx = chart6Ref.current.getContext("2d")
    if (!ctx) return
    const rd = chartsData?.residualDistribution
    const labels = rd?.labels ?? Array.from({ length: 15 }, (_, i) => String(i * 500))
    const frequency = rd?.frequency ?? Array.from({ length: labels.length }, () => Math.floor(Math.random() * 5000))
    if (chart6InstanceRef.current) { chart6InstanceRef.current.destroy(); chart6InstanceRef.current = null }
    chart6InstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{ label: "Frequency", data: frequency, backgroundColor: "rgba(168, 85, 247, 0.7)", borderColor: "#a855f7", borderWidth: 1 }],
      },
      options: CHART_OPTIONS,
    })
    return () => { if (chart6InstanceRef.current) { chart6InstanceRef.current.destroy(); chart6InstanceRef.current = null } }
  }, [chartsLoading, chartsData?.residualDistribution])

  // 7. Power vs Temperature (scatter)
  useEffect(() => {
    if (!chart7Ref.current || chartsLoading) return
    const ctx = chart7Ref.current.getContext("2d")
    if (!ctx) return
    const pvt = chartsData?.powerVsTemp
    const temp = pvt?.temperature ?? Array.from({ length: 80 }, (_, i) => 5 + (i / 10) + Math.random() * 2)
    const power = pvt?.power ?? temp.map((t) => 30000 + t * 2000 + (Math.random() * 10000 - 2000))
    if (chart7InstanceRef.current) { chart7InstanceRef.current.destroy(); chart7InstanceRef.current = null }
    chart7InstanceRef.current = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [{
          label: "Power vs Temperature",
          data: temp.map((t, i) => ({ x: t, y: power[i] })),
          backgroundColor: "rgba(93, 173, 236, 0.6)",
          borderColor: "#5dadec",
          pointRadius: 4,
        }],
      },
      options: {
        ...CHART_OPTIONS,
        scales: {
          x: { ...CHART_OPTIONS.scales.x, title: { display: true, text: "Temperature (°C)", color: "#a0a0a0" } },
          y: { ...CHART_OPTIONS.scales.y, title: { display: true, text: "Power (W)", color: "#a0a0a0" } },
        },
      },
    })
    return () => { if (chart7InstanceRef.current) { chart7InstanceRef.current.destroy(); chart7InstanceRef.current = null } }
  }, [chartsLoading, chartsData?.powerVsTemp])

  // 8. 24-Hour Rolling Statistics
  useEffect(() => {
    if (!chart8Ref.current || chartsLoading) return
    const ctx = chart8Ref.current.getContext("2d")
    if (!ctx) return
    const r24 = chartsData?.rolling24h
    const labels = r24?.labels ?? Array.from({ length: 100 }, (_, i) => `Day ${i + 1}`)
    const actual = r24?.actual ?? Array.from({ length: labels.length }, (_, i) => 70000 + Math.sin(i * 0.1) * 15000)
    const rollingMean = r24?.rollingMean ?? actual.map((v, i) => (actual[i - 1] != null ? (v + (actual[i - 1] ?? 0)) / 2 : v))
    const rollingStd = r24?.rollingStd ?? actual.map(() => 5000)
    if (chart8InstanceRef.current) { chart8InstanceRef.current.destroy(); chart8InstanceRef.current = null }
    chart8InstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          { label: "Actual", data: actual, borderColor: "#5dadec", backgroundColor: "rgba(93, 173, 236, 0.1)", borderWidth: 2, fill: false, tension: 0.4 },
          { label: "Rolling Mean (24h)", data: rollingMean, borderColor: "#22c55e", borderWidth: 2, borderDash: [5, 5], fill: false, tension: 0.4 },
          { label: "Rolling Std (24h)", data: rollingStd, borderColor: "#f59e0b", borderWidth: 1, borderDash: [2, 2], fill: false, tension: 0.4 },
        ],
      },
      options: CHART_OPTIONS,
    })
    return () => { if (chart8InstanceRef.current) { chart8InstanceRef.current.destroy(); chart8InstanceRef.current = null } }
  }, [chartsLoading, chartsData?.rolling24h])

  // 9. Hourly Load Profile (bar 0-23)
  useEffect(() => {
    if (!chart9Ref.current || chartsLoading) return
    const ctx = chart9Ref.current.getContext("2d")
    if (!ctx) return
    const profile = chartsData?.hourlyLoadProfile
    const data = profile ?? Array.from({ length: 24 }, (_, i) => 40000 + Math.sin((i - 6) * 0.3) * 15000)
    if (chart9InstanceRef.current) { chart9InstanceRef.current.destroy(); chart9InstanceRef.current = null }
    chart9InstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Array.from({ length: 24 }, (_, i) => String(i)),
        datasets: [{ label: "Power", data, backgroundColor: "rgba(93, 173, 236, 0.7)", borderColor: "#5dadec", borderWidth: 1 }],
      },
      options: CHART_OPTIONS,
    })
    return () => { if (chart9InstanceRef.current) { chart9InstanceRef.current.destroy(); chart9InstanceRef.current = null } }
  }, [chartsLoading, chartsData?.hourlyLoadProfile])

  // 10. Weekday vs Weekend (grouped bars: Weekday blue, Weekend purple)
  useEffect(() => {
    if (!chart10Ref.current || chartsLoading) return
    const ctx = chart10Ref.current.getContext("2d")
    if (!ctx) return
    const ww = chartsData?.weekdayWeekend
    const labels = ww?.labels ?? ["Weekday", "Weekend"]
    const power = ww?.power ?? [85000, 72000]
    if (chart10InstanceRef.current) { chart10InstanceRef.current.destroy(); chart10InstanceRef.current = null }
    chart10InstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Weekday", data: [power[0] ?? 0, 0], backgroundColor: "rgba(93, 173, 236, 0.7)", borderColor: "#5dadec", borderWidth: 1 },
          { label: "Weekend", data: [0, power[1] ?? 0], backgroundColor: "rgba(168, 85, 247, 0.7)", borderColor: "#a855f7", borderWidth: 1 },
        ],
      },
      options: CHART_OPTIONS,
    })
    return () => { if (chart10InstanceRef.current) { chart10InstanceRef.current.destroy(); chart10InstanceRef.current = null } }
  }, [chartsLoading, chartsData?.weekdayWeekend])

  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] text-[#e8e8ec]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5dadec]/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(93,173,236,0.03),transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-[#0d0d12]/80 backdrop-blur-md border-b border-[#2a2a35]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-[#5dadec]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-xl font-bold">PowerSense</span>
          </Link>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full bg-[#5dadec] flex items-center justify-center text-[#0d0d12] font-semibold hover:bg-[#4a9bd9] transition-colors"
            >
              JD
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#1a1a1f] border border-[#2a2a35] rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-6">
                  {/* Profile Photo */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-[#5dadec] flex items-center justify-center text-[#0d0d12] font-semibold text-2xl">
                      JD
                    </div>
                  </div>
                  
                  {/* User Name */}
                  <div className="text-center mb-1">
                    <div className="font-semibold text-[#e8e8ec] text-lg">John Doe</div>
                  </div>
                  
                  {/* Email */}
                  <div className="text-center mb-6">
                    <div className="text-sm text-[#a0a0a0] flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      john@example.com
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="mb-3 pb-3 border-b border-[#2a2a35]">
                    <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                      <svg className="w-5 h-5 text-[#5dadec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Location: <span className="text-[#e8e8ec]">India</span></span>
                    </div>
                  </div>
                  
                  {/* Time Zone */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                      <svg className="w-5 h-5 text-[#5dadec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Time zone: <span className="text-[#e8e8ec]">GMT +5:30</span></span>
                    </div>
                  </div>
                  
                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - same structure as reference dashboard */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">ML Analytics Dashboard</h1>
          <p className="text-[#a0a0a0] text-lg">
            Real-time insights and predictions for your energy consumption
          </p>
        </div>

        {chartsError && !chartsLoading && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm">
            {chartsError} Run Modelin/new.py and restart backend for live data.
          </div>
        )}

        {/* KPI row: 4 cards + Refresh */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-4">
            <p className="text-[#a0a0a0] text-sm mb-1">LSTM MAE</p>
            <p className="text-2xl font-bold text-[#e8e8ec]">{chartsData?.metrics?.lstmMae?.toFixed(2) ?? "—"}</p>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-4">
            <p className="text-[#a0a0a0] text-sm mb-1">LSTM RMSE</p>
            <p className="text-2xl font-bold text-[#e8e8ec]">{chartsData?.metrics?.lstmRmse?.toFixed(2) ?? "—"}</p>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-4">
            <p className="text-[#a0a0a0] text-sm mb-1">Anomalies</p>
            <p className="text-2xl font-bold text-[#e8e8ec]">{chartsData?.metrics?.anomaliesCount ?? "—"}</p>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[#a0a0a0] text-sm mb-1">Residual Mean</p>
              <p className="text-2xl font-bold text-[#e8e8ec]">{chartsData?.metrics?.residualMean?.toFixed(2) ?? "—"}</p>
            </div>
            <button onClick={fetchCharts} disabled={chartsLoading} className="px-4 py-2 bg-[#2a2a35] hover:bg-[#3a3a45] rounded-lg text-sm font-medium text-[#e8e8ec] disabled:opacity-50 transition-colors">
              Refresh
            </button>
          </div>
        </div>

        {/* Consumption Forecast (LSTM) - main chart */}
        <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Consumption Forecast</h2>
              <p className="text-[#a0a0a0]">LSTM neural network prediction</p>
            </div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30">
              ML Model
            </span>
          </div>
          <div className="h-96 relative">
            {chartsLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1f]/80 rounded-lg z-10">
                <svg className="w-10 h-10 animate-spin text-[#5dadec]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            )}
            <canvas ref={chart5Ref} />
          </div>
        </div>

        {/* 2x2: Model Performance Metrics, Residual Distribution (text), Hourly Load Profile, Weekday vs Weekend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Model Performance Metrics</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-[#a0a0a0]"><span>Mean Absolute Error</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.mae?.toFixed(4) ?? "—"}</span></li>
              <li className="flex justify-between text-[#a0a0a0]"><span>Root Mean Squared Error</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.rmse?.toFixed(4) ?? "—"}</span></li>
              <li className="flex justify-between text-[#a0a0a0]"><span>Anomaly Threshold</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.anomalyThreshold?.toFixed(2) ?? "—"}</span></li>
              <li className="flex justify-between text-[#a0a0a0]"><span>Total Samples Analyzed</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.totalSamples ?? "—"}</span></li>
              <li className="flex justify-between text-[#a0a0a0]"><span>Anomaly Detection Rate</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.anomalyRatePct != null ? `${chartsData.metrics.anomalyRatePct.toFixed(2)}%` : "—"}</span></li>
            </ul>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Residual Distribution</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-[#a0a0a0]"><span>Minimum Residual</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.residualMin?.toFixed(4) ?? "—"}</span></li>
              <li className="flex justify-between text-[#a0a0a0]"><span>Maximum Residual</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.residualMax?.toFixed(4) ?? "—"}</span></li>
              <li className="flex justify-between text-[#a0a0a0]"><span>Mean Residual</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.residualMean?.toFixed(4) ?? "—"}</span></li>
              <li className="flex justify-between text-[#a0a0a0]"><span>Median Residual</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.residualMedian?.toFixed(4) ?? "—"}</span></li>
              <li className="flex justify-between text-[#a0a0a0]"><span>Standard Deviation</span><span className="text-[#e8e8ec]">{chartsData?.metrics?.residualStd?.toFixed(4) ?? "—"}</span></li>
            </ul>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Hourly Load Profile</h2>
            <div className="h-64"><canvas ref={chart9Ref} /></div>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Weekday vs Weekend</h2>
            <div className="h-64"><canvas ref={chart10Ref} /></div>
          </div>
        </div>

        {/* Anomaly Detection: list + chart */}
        <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Anomaly Detection</h2>
              <p className="text-[#a0a0a0]">24-hour anomaly timeline</p>
            </div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/30">Anomaly ML</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 overflow-y-auto max-h-80 border border-[#2a2a35] rounded-lg p-3">
              {(chartsData?.anomalyList?.length ? chartsData.anomalyList : []).map((row, i) => (
                <div key={i} className="py-2 border-b border-[#2a2a35]/50 text-sm">
                  <p className="text-[#e8e8ec] font-medium">{row.timestamp}</p>
                  <p className="text-[#a0a0a0]">Residual: {row.residual?.toFixed(2) ?? "—"} · Actual: {row.actual?.toFixed(2) ?? "—"} · Pred: {row.pred?.toFixed(2) ?? "—"}</p>
                </div>
              ))}
              {(!chartsData?.anomalyList?.length && !chartsLoading) && <p className="text-[#6a6a70]">No anomaly list data. Run Modelin/new.py.</p>}
            </div>
            <div className="h-80"><canvas ref={chart4Ref} /></div>
          </div>
        </div>

        {/* Residual Error Distribution + Power vs Temperature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-1">Residual Error Distribution</h2>
            <p className="text-[#a0a0a0] text-sm mb-4">Frequency by residual bin</p>
            <div className="h-80"><canvas ref={chart6Ref} /></div>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-1">Power vs Temperature</h2>
            <p className="text-[#a0a0a0] text-sm mb-4">Scatter</p>
            <div className="h-80"><canvas ref={chart7Ref} /></div>
          </div>
        </div>

        {/* 24-Hour Rolling Statistics */}
        <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-1">24-Hour Rolling Statistics</h2>
          <p className="text-[#a0a0a0] text-sm mb-4">Actual, Rolling Mean (24h), Rolling Std (24h)</p>
          <div className="h-96"><canvas ref={chart8Ref} /></div>
        </div>

        {/* Feature Correlations heatmap */}
        <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Feature Correlations</h2>
          {chartsData?.correlationMatrix ? (
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="flex gap-px mb-1">
                  <div className="w-24 flex-shrink-0" />
                  {chartsData.correlationMatrix.labels.map((l) => (
                    <div key={l} className="w-16 text-[10px] text-[#a0a0a0] truncate text-center" title={l}>{l.slice(0, 8)}</div>
                  ))}
                </div>
                {chartsData.correlationMatrix.matrix.map((row, i) => (
                  <div key={i} className="flex gap-px mb-px">
                    <div className="w-24 flex-shrink-0 text-[10px] text-[#a0a0a0] truncate">{chartsData.correlationMatrix.labels[i]?.slice(0, 10)}</div>
                    {row.map((v, j) => {
                      const n = Number.isNaN(v) ? 0 : v
                      const green = n >= 0 ? Math.round(255 * n) : 0
                      const blue = n < 0 ? Math.round(255 * -n) : 0
                      return (
                        <div key={j} className="w-16 h-6 flex items-center justify-center text-[10px] rounded" style={{ backgroundColor: `rgb(${255 - green - blue}, ${green}, ${blue})`, color: Math.abs(n) > 0.5 ? "#fff" : "#333" }}>
                          {typeof v === "number" && !Number.isNaN(v) ? v.toFixed(2) : "—"}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-[#6a6a70]">Run Modelin/new.py to generate correlation matrix.</p>
          )}
        </div>

        {/* Detailed Forecast Data table */}
        <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Detailed Forecast Data</h2>
            <span className="text-sm text-[#a0a0a0]">{chartsData?.forecastTable?.length ?? 0} records</span>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-lg border border-[#2a2a35]">
            <table className="w-full text-sm">
              <thead className="bg-[#2a2a35] sticky top-0">
                <tr>
                  <th className="text-left p-3 text-[#a0a0a0] font-medium">Date & Time</th>
                  <th className="text-right p-3 text-[#a0a0a0] font-medium">Actual</th>
                  <th className="text-right p-3 text-[#a0a0a0] font-medium">Predicted</th>
                  <th className="text-right p-3 text-[#a0a0a0] font-medium">Upper Bound</th>
                  <th className="text-right p-3 text-[#a0a0a0] font-medium">Lower Bound</th>
                </tr>
              </thead>
              <tbody>
                {(chartsData?.forecastTable ?? []).map((row, i) => (
                  <tr key={i} className="border-t border-[#2a2a35]">
                    <td className="p-3 text-[#e8e8ec]">{row.dateTime ?? row.ds ?? "—"}</td>
                    <td className="p-3 text-right text-[#e8e8ec]">{row.actual != null ? Number(row.actual).toFixed(2) : "—"}</td>
                    <td className="p-3 text-right text-green-400">{row.predicted != null ? Number(row.predicted).toFixed(2) : "—"}</td>
                    <td className="p-3 text-right text-[#e8e8ec]">{row.upperBound != null ? Number(row.upperBound).toFixed(2) : "—"}</td>
                    <td className="p-3 text-right text-[#e8e8ec]">{row.lowerBound != null ? Number(row.lowerBound).toFixed(2) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(!chartsData?.forecastTable?.length && !chartsLoading) && <p className="text-[#6a6a70] py-4 text-center">No forecast table data.</p>}
        </div>

        {/* Extra charts: Hourly Consumption, Prophet Forecast, Prophet Components (same page, different sections) */}
        <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-1">Hourly Power Consumption (Zone 1)</h2>
          <p className="text-[#a0a0a0] text-sm mb-4">Time series</p>
          <div className="h-96"><canvas ref={chartRef} /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-1">Prophet Forecast: Actual vs Predicted</h2>
            <div className="h-80"><canvas ref={chart2Ref} /></div>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-1">Prophet Components</h2>
            <div className="h-80"><canvas ref={chart3Ref} /></div>
          </div>
        </div>
      </main>

      {/* Click outside to close dropdown */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  )
}
