import { Globe, GraduationCap, Lightbulb, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllRecognitions } from "../hooks/useQueries";
import type { Recognition } from "../hooks/useQueries";

const sampleRecognitions: Recognition[] = [
  {
    id: BigInt(1),
    title: "Top 50 Global Corporate Education Institutions 2026",
    year: BigInt(2026),
    description:
      "Recognized by the International Council for Corporate Education as one of the 50 most impactful corporate education institutions worldwide, ranked #12 in North America.",
    awardBody: "International Council for Corporate Education (ICCE)",
    category: "Global",
  },
  {
    id: BigInt(2),
    title: "Excellence in AI-Integrated Learning Innovation Award",
    year: BigInt(2025),
    description:
      "Awarded for pioneering the use of agentic AI systems in corporate curriculum design and personalized learning pathways, recognized at the Global EdTech Summit.",
    awardBody: "Global EdTech Summit — Innovation Awards",
    category: "Innovation",
  },
  {
    id: BigInt(3),
    title: "Best Corporate Training Provider — North America",
    year: BigInt(2025),
    description:
      "Voted Best Corporate Training Provider by 3,400 HR professionals in the annual eLearning Industry survey, based on impact, customization, and client satisfaction.",
    awardBody: "eLearning Industry Magazine",
    category: "Corporate",
  },
  {
    id: BigInt(4),
    title: "Academic Excellence in Professional Development Education",
    year: BigInt(2024),
    description:
      "The American Academy of Professional Development bestowed this honor recognizing LangBusTech's contribution to raising academic standards in professional learning.",
    awardBody: "American Academy of Professional Development",
    category: "Academic",
  },
  {
    id: BigInt(5),
    title: "New Jersey Governor's Award for Educational Innovation",
    year: BigInt(2024),
    description:
      "Presented by the State of New Jersey for exceptional contribution to workforce development and economic growth through innovative corporate education programs.",
    awardBody: "State of New Jersey — Office of the Governor",
    category: "Innovation",
  },
  {
    id: BigInt(6),
    title: "5-Star Corporate University Designation 2024",
    year: BigInt(2024),
    description:
      "LangBusTech achieved the coveted 5-Star Corporate University designation for maintaining the highest standards across curriculum, delivery, assessment, and outcomes.",
    awardBody: "Corporate University Xchange (CorpU)",
    category: "Academic",
  },
  {
    id: BigInt(7),
    title: "Outstanding Global Impact in Workforce Transformation",
    year: BigInt(2026),
    description:
      "Recognized by the World Economic Forum's Reskilling Initiative for measurable impact in helping organizations prepare workforces for the Fourth Industrial Revolution.",
    awardBody: "World Economic Forum Reskilling Initiative",
    category: "Global",
  },
  {
    id: BigInt(8),
    title: "Best Diversity & Inclusion Training Program — Americas",
    year: BigInt(2025),
    description:
      "Award for designing and delivering inclusive corporate training programs that have measurably improved DEI outcomes for 47 partner organizations.",
    awardBody: "Diversity Inc. Top 50 Awards",
    category: "Corporate",
  },
];

const categoryFilters = [
  "All",
  "Academic",
  "Corporate",
  "Innovation",
  "Global",
];

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Academic: GraduationCap,
  Corporate: Trophy,
  Innovation: Lightbulb,
  Global: Globe,
  All: Star,
};

const categoryColors: Record<string, string> = {
  Academic: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Corporate: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  Innovation: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Global: "text-teal-400 bg-teal-400/10 border-teal-400/30",
};

export default function RecognitionSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: backendRecognitions } = useGetAllRecognitions();

  const recognitions =
    backendRecognitions && backendRecognitions.length > 0
      ? backendRecognitions
      : sampleRecognitions;

  const filtered =
    activeCategory === "All"
      ? recognitions
      : recognitions.filter((r) => r.category === activeCategory);

  return (
    <section id="recognition" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0A20]/50 to-transparent" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 mb-4">
            <Trophy className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">
              Awards & Recognition
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Excellence Recognized{" "}
            <span className="gradient-text">Globally</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-body">
            Our commitment to transformative education has been recognized by
            the world's foremost academic, corporate, and governmental
            institutions.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categoryFilters.map((cat) => {
            const Icon = categoryIcons[cat] || Star;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-display font-bold tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white glow-orange-sm"
                    : "glass-card text-gray-400 hover:text-orange-400 hover:border-orange-500/30"
                }`}
              >
                <Icon className="w-3 h-3" />
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((rec, i) => {
            const Icon = categoryIcons[rec.category] || Trophy;
            const colorClass =
              categoryColors[rec.category] ||
              "text-orange-400 bg-orange-400/10 border-orange-400/30";
            return (
              <motion.div
                key={rec.id.toString()}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4"
              >
                {/* Year + Category */}
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-2xl text-orange-500">
                    {rec.year.toString()}
                  </span>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 ${colorClass}`}
                  >
                    <Icon className="w-3 h-3" />
                    {rec.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-white text-sm leading-snug">
                  {rec.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-xs font-body leading-relaxed line-clamp-4 flex-1">
                  {rec.description}
                </p>

                {/* Award Body */}
                <div className="pt-2 border-t border-white/5">
                  <div className="text-orange-400/70 text-xs font-mono">
                    {rec.awardBody}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
