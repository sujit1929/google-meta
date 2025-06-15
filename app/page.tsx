"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Code2, Palette, Zap, ArrowRight, Github, ExternalLink, Coffee } from "lucide-react"

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const theme = localStorage.getItem("theme")
    setIsDark(theme === "dark")
  }, [])

  useEffect(() => {
    if (mounted) {
      if (isDark) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    }
  }, [isDark, mounted])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const featuredProblems = [
    {
      title: "Dynamic Form Builder",
      description: "Built a flexible form generator with validation, conditional fields, and real-time preview.",
      tags: ["React", "TypeScript", "Zod"],
      difficulty: "Advanced",
      link: "#",
    },
    {
      title: "Infinite Scroll Gallery",
      description: "Implemented virtualized scrolling with lazy loading and smooth animations for 10k+ images.",
      tags: ["React", "Intersection Observer", "CSS"],
      difficulty: "Intermediate",
      link: "#",
    },
    {
      title: "Real-time Collaboration Tool",
      description: "Created a collaborative whiteboard with WebSocket integration and conflict resolution.",
      tags: ["Next.js", "WebSocket", "Canvas API"],
      difficulty: "Advanced",
      link: "#",
    },
  ]

  const uiExperiments = [
    {
      title: "Morphing Button Collection",
      description: "Interactive buttons with fluid animations and micro-interactions",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["CSS", "Framer Motion"],
      link: "#",
    },
    {
      title: "Glassmorphism Dashboard",
      description: "Modern dashboard design with glass effect and dynamic backgrounds",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Tailwind", "CSS Grid"],
      link: "#",
    },
    {
      title: "3D Card Interactions",
      description: "Cards with 3D transforms and parallax scrolling effects",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["CSS 3D", "JavaScript"],
      link: "#",
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Sujeet Sharma
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-300"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500 rotate-0 scale-100 transition-all" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600 rotate-0 scale-100 transition-all" />
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-up">
              Frontend Magic
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 animate-slide-up animation-delay-200">
              Practicing frontend magic, one component at a time.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 animate-slide-up animation-delay-400">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              React Enthusiast
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
            >
              <Palette className="w-4 h-4 mr-2" />
              UI/UX Explorer
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Problem Solver
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Problems Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">Featured Problem Solutions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Complex challenges turned into elegant solutions through creative problem-solving and clean code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProblems.map((problem, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={problem.difficulty === "Advanced" ? "destructive" : "secondary"} className="text-xs">
                    {problem.difficulty}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <CardTitle className="text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {problem.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">{problem.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* UI Experiments Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">UI Experiments Lab</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Creative playground where design meets code. Exploring new interactions and visual experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uiExperiments.map((experiment, index) => (
            <div
              key={index}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 aspect-video mb-4 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={experiment.image || "/placeholder.svg"}
                  alt={experiment.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="h-5 w-5 ml-auto" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {experiment.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">{experiment.description}</p>
              <div className="flex flex-wrap gap-2">
                {experiment.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Code2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">Sujeet Sharma</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Crafting digital experiences with passion, creativity, and a touch of magic. Always learning, always
              building.
            </p>
            <div className="flex justify-center space-x-6 pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
