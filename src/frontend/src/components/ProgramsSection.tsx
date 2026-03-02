import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, Building2, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Category } from "../backend";
import { useGetAllCourses } from "../hooks/useQueries";
import type { Course } from "../hooks/useQueries";

const sampleCourses: Course[] = [
  {
    id: BigInt(1),
    title: "AI Business Strategy & Implementation",
    duration: BigInt(40),
    description:
      "Master the application of artificial intelligence in enterprise environments. Design AI roadmaps, assess organizational readiness, and lead transformative AI initiatives.",
    level: "Executive",
    isCorporateCustomizable: true,
    category: Category.aiSkills,
    corporateAlignment: "Digital Transformation Teams, C-Suite Executives",
  },
  {
    id: BigInt(2),
    title: "Corporate Leadership Excellence Program",
    duration: BigInt(32),
    description:
      "Develop transformative leadership capabilities for the modern global enterprise. Build influence, drive change, and cultivate high-performance cultures.",
    level: "Senior Management",
    isCorporateCustomizable: true,
    category: Category.leadership,
    corporateAlignment: "Executive Teams, Board Members, VP Level",
  },
  {
    id: BigInt(3),
    title: "Advanced Service Training Fundamentals",
    duration: BigInt(24),
    description:
      "Elevate customer experience standards across your organization. Build service excellence frameworks that drive loyalty, retention, and revenue growth.",
    level: "Intermediate",
    isCorporateCustomizable: true,
    category: Category.serviceTraining,
    corporateAlignment: "Customer Service, Operations, Front-line Managers",
  },
  {
    id: BigInt(4),
    title: "Digital Business Transformation Bootcamp",
    duration: BigInt(48),
    description:
      "Navigate the complexities of digital transformation with a structured approach. Combine technology, process redesign, and cultural change management.",
    level: "Advanced",
    isCorporateCustomizable: true,
    category: Category.businessTransformation,
    corporateAlignment: "Transformation Teams, IT Leadership, COOs",
  },
  {
    id: BigInt(5),
    title: "Professional Development & Career Acceleration",
    duration: BigInt(20),
    description:
      "Unlock your professional potential with evidence-based growth strategies. Master communication, emotional intelligence, and career navigation skills.",
    level: "All Levels",
    isCorporateCustomizable: false,
    category: Category.professionalDevelopment,
    corporateAlignment: "All Employees, HR Departments, Talent Development",
  },
  {
    id: BigInt(6),
    title: "Agentic AI for Corporate Decision Making",
    duration: BigInt(36),
    description:
      "Harness the power of agentic AI systems for autonomous business operations. Design AI agents that act, learn, and optimize business workflows.",
    level: "Expert",
    isCorporateCustomizable: true,
    category: Category.aiSkills,
    corporateAlignment: "AI Teams, Data Science, Digital Innovation",
  },
];

const categoryLabels: Record<Category, string> = {
  [Category.aiSkills]: "AI Skills",
  [Category.leadership]: "Leadership",
  [Category.serviceTraining]: "Service Training",
  [Category.businessTransformation]: "Business Transformation",
  [Category.professionalDevelopment]: "Professional Development",
};

const categoryColors: Record<Category, string> = {
  [Category.aiSkills]: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  [Category.leadership]: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  [Category.serviceTraining]:
    "text-green-400 border-green-400/40 bg-green-400/10",
  [Category.businessTransformation]:
    "text-purple-400 border-purple-400/40 bg-purple-400/10",
  [Category.professionalDevelopment]:
    "text-teal-400 border-teal-400/40 bg-teal-400/10",
};

const filters = [
  { label: "All Programs", value: "all" },
  { label: "AI Skills", value: Category.aiSkills },
  { label: "Leadership", value: Category.leadership },
  { label: "Service Training", value: Category.serviceTraining },
  { label: "Business Transformation", value: Category.businessTransformation },
  {
    label: "Professional Development",
    value: Category.professionalDevelopment,
  },
];

export default function ProgramsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { data: backendCourses } = useGetAllCourses();

  const courses =
    backendCourses && backendCourses.length > 0
      ? backendCourses
      : sampleCourses;
  const filtered =
    activeFilter === "all"
      ? courses
      : courses.filter((c) => c.category === activeFilter);

  return (
    <section id="programs" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-20" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 mb-4">
            <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">
              Academic Programs
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Corporate-Aligned <span className="gradient-text">Curriculum</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-body">
            Every program designed in consultation with industry leaders —
            customizable to your organization's specific goals, culture, and
            transformation agenda.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((f) => (
            <button
              type="button"
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-xs font-display font-bold tracking-wide transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-orange-500 text-white glow-orange-sm"
                  : "glass-card text-gray-400 hover:text-orange-400 hover:border-orange-500/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id.toString()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Category Badge */}
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${categoryColors[course.category]}`}
                >
                  {categoryLabels[course.category]}
                </span>
                {course.isCorporateCustomizable && (
                  <Badge className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/40 font-mono">
                    Corporate ⚡
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-lg text-white leading-snug">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm font-body line-clamp-3 leading-relaxed">
                {course.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-400" />
                  {Number(course.duration)}h
                </span>
                <span className="flex items-center gap-1">
                  <BarChart2 className="w-3 h-3 text-orange-400" />
                  {course.level}
                </span>
              </div>

              {/* Corporate alignment */}
              {course.corporateAlignment && (
                <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                  <Building2 className="w-3 h-3 text-orange-400/60 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-500 font-body">
                    {course.corporateAlignment}
                  </span>
                </div>
              )}

              {/* CTA */}
              <button
                type="button"
                className="group mt-auto flex items-center gap-2 text-orange-400 hover:text-orange-300 text-xs font-display font-bold tracking-wide transition-colors"
              >
                View Program Details
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 font-display font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200"
          >
            Request Custom Program Design
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
