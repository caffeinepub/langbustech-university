import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  FileCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { Status } from "../backend";
import { useGetAllCorporatePrograms } from "../hooks/useQueries";
import type { CorporateProgram } from "../hooks/useQueries";

const samplePrograms: CorporateProgram[] = [
  {
    id: BigInt(1),
    status: Status.active,
    description:
      "Complete AI-driven talent transformation for Fortune 500 enterprise — covering leadership, digital fluency, and innovation culture.",
    customRequirements:
      "Executive coaching, AI literacy modules, 12-month roadmap",
    companyName: "GlobalTech Enterprises",
    programTitle: "Enterprise AI Transformation Initiative",
  },
  {
    id: BigInt(2),
    status: Status.active,
    description:
      "Service excellence overhaul for a multinational financial services firm — aligning front-line staff with premium client experience standards.",
    customRequirements:
      "CX benchmarking, roleplay simulations, quarterly assessments",
    companyName: "Meridian Financial Group",
    programTitle: "Elite Client Experience Training",
  },
  {
    id: BigInt(3),
    status: Status.active,
    description:
      "Custom leadership pipeline program for 200+ mid-level managers transitioning to senior executive roles across 8 global offices.",
    customRequirements:
      "360° assessments, executive mentorship, cross-cultural modules",
    companyName: "NovaCorp Global",
    programTitle: "Executive Leadership Pipeline",
  },
];

const features = [
  {
    icon: Target,
    title: "Custom Curriculum Design",
    desc: "Programs engineered from scratch to match your corporate strategy, industry context, and team objectives.",
  },
  {
    icon: Users,
    title: "On-site & Virtual Delivery",
    desc: "Flexible delivery at your offices globally or via our immersive virtual campus environment.",
  },
  {
    icon: FileCheck,
    title: "Post-Training Assessment",
    desc: "Rigorous evaluation frameworks measuring behavioral change, skill acquisition, and performance impact.",
  },
  {
    icon: TrendingUp,
    title: "ROI Reporting",
    desc: "Comprehensive analytics dashboards showing measurable business outcomes and learning ROI.",
  },
];

const statusColors: Record<Status, string> = {
  [Status.active]: "text-green-400 border-green-400/40 bg-green-400/10",
  [Status.completed]: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  [Status.inquiry]: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
};

export default function CorporateSolutionsSection() {
  const { data: backendPrograms } = useGetAllCorporatePrograms();
  const programs =
    backendPrograms && backendPrograms.length > 0
      ? backendPrograms
      : samplePrograms;

  return (
    <section id="corporate" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent" />

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
              Corporate Solutions
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Tailor-Made{" "}
            <span className="gradient-text">Corporate Training</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-body">
            We partner with organizations to design transformative learning
            experiences that align with your strategic vision and deliver
            measurable results.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glow-orange">
              <img
                src="/assets/generated/corporate-training.dim_800x500.jpg"
                alt="Corporate Training"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A14]/60 via-transparent to-orange-500/10" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-3 border border-orange-500/30">
              <div className="text-orange-500 font-display font-bold text-2xl">
                150+
              </div>
              <div className="text-gray-400 text-xs font-body">
                Active Partnerships
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 glass-card rounded-xl glass-card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-body leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            <button
              type="button"
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-display font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 glow-orange-sm hover:glow-orange mt-2 w-fit"
            >
              Request Custom Program
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Active Programs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-2xl text-white mb-8 text-center">
            Active Corporate <span className="gradient-text">Partnerships</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-orange-400" />
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${statusColors[program.status]}`}
                  >
                    {program.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm mb-1">
                    {program.programTitle}
                  </h4>
                  <div className="text-orange-400 text-xs font-mono mb-2">
                    {program.companyName}
                  </div>
                  <p className="text-gray-400 text-xs font-body leading-relaxed line-clamp-2">
                    {program.description}
                  </p>
                </div>
                {program.customRequirements && (
                  <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-500">
                      {program.customRequirements}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Building2({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}
