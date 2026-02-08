"use client"

import Image from "next/image"


import { useEffect, useRef } from "react"
import Link from "next/link"
import * as THREE from "three"
import Chart from "chart.js/auto"

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const consumptionChartRef = useRef<HTMLCanvasElement>(null)
  const peakChartRef = useRef<HTMLCanvasElement>(null)
  const deviceChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Three.js 3D Scene
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Energy Orb
    const orbGeometry = new THREE.IcosahedronGeometry(2, 2)
    const orbMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x5dadec,
      emissive: 0x2a4a6a,
      emissiveIntensity: 0.3,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.6,
      thickness: 1.5,
      wireframe: false,
    })
    const orb = new THREE.Mesh(orbGeometry, orbMaterial)
    scene.add(orb)

    // Wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x5dadec,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const wireframeOrb = new THREE.Mesh(orbGeometry, wireframeMaterial)
    wireframeOrb.scale.setScalar(1.02)
    scene.add(wireframeOrb)

    // Particles
    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x5dadec,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Grid
    const gridHelper = new THREE.GridHelper(40, 40, 0x5dadec, 0x333333)
    gridHelper.position.y = -5
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.2
    scene.add(gridHelper)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0x5dadec, 2, 50)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 8

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      orb.rotation.x += 0.003
      orb.rotation.y += 0.005
      wireframeOrb.rotation.x += 0.003
      wireframeOrb.rotation.y += 0.005
      particles.rotation.y += 0.0005
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    // Chart.js Charts
    const chartColor = "#5dadec"
    const chartColorLight = "rgba(93, 173, 236, 0.2)"
    const gridColor = "rgba(255, 255, 255, 0.1)"
    const textColor = "#a0a0a0"

    let consumptionChart: Chart | null = null
    let peakChart: Chart | null = null
    let deviceChart: Chart | null = null

    // Consumption Chart
    if (consumptionChartRef.current) {
      consumptionChart = new Chart(consumptionChartRef.current, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Consumption (kWh)",
              data: [420, 380, 350, 320, 290, 340, 380, 360, 310, 280, 260, 245],
              borderColor: chartColor,
              backgroundColor: chartColorLight,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: chartColor,
              pointBorderColor: "#1a1a1f",
              pointBorderWidth: 2,
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor },
            },
          },
        },
      })
    }

    // Peak Hours Chart
    if (peakChartRef.current) {
      peakChart = new Chart(peakChartRef.current, {
        type: "bar",
        data: {
          labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],
          datasets: [
            {
              label: "Usage (kWh)",
              data: [2.1, 3.8, 4.2, 3.5, 5.8, 4.1, 1.8],
              backgroundColor: [
                "rgba(93, 173, 236, 0.5)",
                "rgba(93, 173, 236, 0.6)",
                "rgba(93, 173, 236, 0.7)",
                "rgba(93, 173, 236, 0.6)",
                "rgba(93, 173, 236, 1)",
                "rgba(93, 173, 236, 0.7)",
                "rgba(93, 173, 236, 0.4)",
              ],
              borderColor: chartColor,
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor },
            },
          },
        },
      })
    }

    // Device Breakdown Chart
    if (deviceChartRef.current) {
      deviceChart = new Chart(deviceChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["HVAC", "Lighting", "Appliances", "Electronics", "Other"],
          datasets: [
            {
              data: [35, 20, 25, 12, 8],
              backgroundColor: [
                "rgba(93, 173, 236, 1)",
                "rgba(93, 173, 236, 0.8)",
                "rgba(93, 173, 236, 0.6)",
                "rgba(93, 173, 236, 0.4)",
                "rgba(93, 173, 236, 0.2)",
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
              position: "right",
              labels: { color: textColor, padding: 15 },
            },
          },
        },
      })
    }

    return () => {
      consumptionChart?.destroy()
      peakChart?.destroy()
      deviceChart?.destroy()
    }
  }, [])

  const features = [
    { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Real-Time Monitoring", desc: "Track your energy usage as it happens with live data streams" },
    { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "AI Predictions", desc: "Machine learning algorithms forecast your future consumption" },
    { icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", title: "Smart Alerts", desc: "Get notified about unusual patterns or excessive usage" },
    { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Detailed Reports", desc: "Generate comprehensive reports for any time period" },
    { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Cost Optimization", desc: "AI-powered recommendations to reduce your bills" },
    { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Secure Data", desc: "Enterprise-grade encryption for all your data" },
    { icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", title: "Mobile Access", desc: "Monitor your usage anywhere with our mobile app" },
    { icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z", title: "Usage Patterns", desc: "Identify trends and patterns in your consumption" },
  ]

  const steps = [
    { num: "01", title: "Connect Your Meter", desc: "Link your smart meter or upload utility data" },
    { num: "02", title: "Analyze Patterns", desc: "Our AI processes your data to identify trends" },
    { num: "03", title: "Get Recommendations", desc: "Receive personalized tips to reduce consumption" },
    { num: "04", title: "Save Money", desc: "Implement changes and watch your bills decrease" },
  ]

  const recommendations = [
    { title: "Shift HVAC usage", desc: "Move heating/cooling to off-peak hours", save: "$45/mo" },
    { title: "Upgrade lighting", desc: "Switch remaining bulbs to LED", save: "$28/mo" },
    { title: "Phantom load", desc: "Unplug devices when not in use", save: "$15/mo" },
    { title: "Smart thermostat", desc: "Install programmable temperature control", save: "$35/mo" },
  ]

  const testimonials = [
    { name: "Sarah Chen", role: "Homeowner", quote: "Reduced my electricity bill by 40% in just 3 months. The AI recommendations were spot on!" },
    { name: "Marcus Johnson", role: "Property Manager", quote: "Managing 50+ units is now effortless. The real-time monitoring saves us hours every week." },
    { name: "Elena Rodriguez", role: "Small Business Owner", quote: "Finally understand where my energy costs come from. Game changer for my restaurant." },
    { name: "David Park", role: "Tech Lead", quote: "The API integration was seamless. Now our smart home system optimizes automatically." },
    { name: "Lisa Thompson", role: "Sustainability Officer", quote: "Essential tool for tracking our corporate carbon footprint and energy goals." },
    { name: "James Wilson", role: "Facility Manager", quote: "The predictive alerts helped us prevent a major HVAC failure. Worth every penny." },
  ]

  return (
    <div className="min-h-screen bg-[#0d0d12] text-[#e8e8ec] font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d12]/80 backdrop-blur-md border-b border-[#2a2a35]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
  src="/logo.png"
  alt="Logo"
  width={48}
  height={48}
/>

            <span className="text-xl font-bold">PowerSense</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#a0a0a0] hover:text-[#5dadec] transition-colors">Features</a>
            <a href="#how-it-works" className="text-[#a0a0a0] hover:text-[#5dadec] transition-colors">How It Works</a>
            <a href="#analytics" className="text-[#a0a0a0] hover:text-[#5dadec] transition-colors">Analytics</a>
            <a href="#testimonials" className="text-[#a0a0a0] hover:text-[#5dadec] transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-[#a0a0a0] hover:text-[#e8e8ec] transition-colors">Sign In</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
            Smart Energy
            <br />
            <span className="text-[#5dadec]">Consumption Analysis</span>
          </h1>
          <p className="text-xl text-[#a0a0a0] mb-8 max-w-2xl mx-auto text-pretty">
            Harness the power of AI to analyze your electricity usage, reduce costs, and minimize your environmental footprint with actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/register" className="bg-[#5dadec] text-[#0d0d12] px-8 py-3 rounded-lg font-medium hover:bg-[#4a9bd9] transition-colors text-lg">
              Start Analyzing
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#5dadec]">50K+</div>
              <div className="text-sm text-[#a0a0a0]">Active Users</div>
            </div>
            <div className="w-px h-12 bg-[#2a2a35]" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#5dadec]">32%</div>
              <div className="text-sm text-[#a0a0a0]">Avg. Energy Saved</div>
            </div>
            <div className="w-px h-12 bg-[#2a2a35]" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#5dadec]">$2.4M</div>
              <div className="text-sm text-[#a0a0a0]">User Savings</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#5dadec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-[#0d0d12]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-[#a0a0a0] max-w-2xl mx-auto">
              Everything you need to understand and optimize your energy consumption
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 hover:border-[#5dadec]/50 transition-colors group">
                <div className="w-12 h-12 bg-[#5dadec]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5dadec]/20 transition-colors">
                  <svg className="w-6 h-6 text-[#5dadec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#a0a0a0] text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-[#1a1a1f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-[#a0a0a0] max-w-2xl mx-auto">
              Get started in minutes with our simple setup process
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-[#5dadec]/10 mb-4">{step.num}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#a0a0a0]">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-[#5dadec]/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-24 px-6 bg-[#0d0d12]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Live Analytics Dashboard</h2>
            <p className="text-xl text-[#a0a0a0] max-w-2xl mx-auto">
              Powerful visualizations to understand your energy consumption
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Consumption</h3>
              <div className="h-64">
                <canvas ref={consumptionChartRef} />
              </div>
            </div>
            <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Peak Usage Hours</h3>
              <div className="h-64">
                <canvas ref={peakChartRef} />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
              <div className="h-64">
                <canvas ref={deviceChartRef} />
              </div>
            </div>
            <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#0d0d12] rounded-lg border border-[#2a2a35]">
                    <div>
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-[#a0a0a0]">{rec.desc}</p>
                    </div>
                    <div className="text-[#5dadec] font-semibold">{rec.save}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-[#1a1a1f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-[#a0a0a0] max-w-2xl mx-auto">
              See what our users are saying about PowerSense
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-[#0d0d12] border border-[#2a2a35] rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#5dadec]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#a0a0a0] mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5dadec]/20 flex items-center justify-center text-[#5dadec] font-semibold">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-[#a0a0a0]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl text-[#a0a0a0] mb-8">
            Join 50,000+ users who are already reducing their energy costs with PowerSense
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="bg-[#5dadec] text-[#0d0d12] px-8 py-3 rounded-lg font-medium hover:bg-[#4a9bd9] transition-colors text-lg">
              Start 14-Day Free Trial
            </Link>
            <button type="button" className="border border-[#2a2a35] text-[#e8e8ec] px-8 py-3 rounded-lg font-medium hover:bg-[#1a1a1f] transition-colors text-lg">
              Schedule a Demo
            </button>
          </div>
          <p className="text-sm text-[#a0a0a0] mt-4">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1a1a1f] border-t border-[#2a2a35]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
               <Image src="/logo.png" alt="Logo" width={48} height={48} />

                <span className="text-xl font-bold">PowerSense</span>
              </div>
              <p className="text-[#a0a0a0] text-sm">
                Smart energy analytics for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#5dadec] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#2a2a35] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#a0a0a0]">© 2026 PowerSense. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#a0a0a0] hover:text-[#5dadec] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-[#a0a0a0] hover:text-[#5dadec] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-[#a0a0a0] hover:text-[#5dadec] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
