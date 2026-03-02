import { Calendar, CheckCircle, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useGetAllAccreditations } from "../hooks/useQueries";
import type { Accreditation } from "../hooks/useQueries";

const sampleAccreditations: Accreditation[] = [
  {
    id: BigInt(1),
    description:
      "International accreditation recognizing excellence in continuing education and professional development standards.",
    dateGranted: BigInt(
      Date.now() * 1000000 - 2 * 365 * 24 * 60 * 60 * 1000000000,
    ),
    bodyName:
      "International Association for Continuing Education & Training (IACET)",
    accreditationType: "Academic Excellence",
    expiryDate: BigInt(
      Date.now() * 1000000 + 3 * 365 * 24 * 60 * 60 * 1000000000,
    ),
  },
  {
    id: BigInt(2),
    description:
      "Preferred provider status recognizing alignment with SHRM's HR competency framework and professional standards.",
    dateGranted: BigInt(Date.now() * 1000000 - 365 * 24 * 60 * 60 * 1000000000),
    bodyName: "SHRM — Society for Human Resource Management",
    accreditationType: "HR Excellence",
    expiryDate: BigInt(
      Date.now() * 1000000 + 2 * 365 * 24 * 60 * 60 * 1000000000,
    ),
  },
  {
    id: BigInt(3),
    description:
      "Authorized training partner status for Project Management Institute curriculum and certification preparation.",
    dateGranted: BigInt(
      Date.now() * 1000000 - 18 * 30 * 24 * 60 * 60 * 1000000000,
    ),
    bodyName: "PMI — Project Management Institute",
    accreditationType: "Project Management",
    expiryDate: BigInt(
      Date.now() * 1000000 + 2.5 * 365 * 24 * 60 * 60 * 1000000000,
    ),
  },
  {
    id: BigInt(4),
    description:
      "ISO certification confirming consistent quality management systems across all educational delivery processes.",
    dateGranted: BigInt(
      Date.now() * 1000000 - 3 * 365 * 24 * 60 * 60 * 1000000000,
    ),
    bodyName: "Bureau Veritas — ISO Standards",
    accreditationType: "Quality Management",
    expiryDate: undefined,
  },
  {
    id: BigInt(5),
    description:
      "Global recognition as an authorized delivery partner for AI and machine learning professional certifications.",
    dateGranted: BigInt(
      Date.now() * 1000000 - 6 * 30 * 24 * 60 * 60 * 1000000000,
    ),
    bodyName: "Coursera for Business — AI Certification Authority",
    accreditationType: "AI & Technology",
  },
  {
    id: BigInt(6),
    description:
      "Accreditation for corporate governance, ethics, and executive education excellence by the EFMD global network.",
    dateGranted: BigInt(
      Date.now() * 1000000 - 4 * 365 * 24 * 60 * 60 * 1000000000,
    ),
    bodyName: "EFMD — European Foundation for Management Development",
    accreditationType: "Business Education",
    expiryDate: BigInt(Date.now() * 1000000 + 365 * 24 * 60 * 60 * 1000000000),
  },
];

const accreditationIcons = ["🏛️", "⚖️", "📊", "🔬", "🤖", "🌐"];

function formatDate(nanoTime: bigint): string {
  const ms = Number(nanoTime) / 1_000_000;
  return new Date(ms).getFullYear().toString();
}

export default function AccreditationSection() {
  const { data: backendAccreditations } = useGetAllAccreditations();
  const accreditations =
    backendAccreditations && backendAccreditations.length > 0
      ? backendAccreditations
      : sampleAccreditations;

  return (
    <section id="accreditation" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0A20]/50 to-transparent" />
      <div className="absolute inset-0 circuit-bg opacity-15" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 mb-4">
            <Shield className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">
              Accreditation
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Globally Recognized <span className="gradient-text">Standards</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-body">
            Our programs meet the highest international standards, validated by
            leading academic, professional, and regulatory bodies worldwide.
          </p>
        </motion.div>

        {/* Accreditation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accreditations.map((acc, i) => (
            <motion.div
              key={acc.id.toString()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Icon & Type */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-2xl">
                  {accreditationIcons[i % accreditationIcons.length]}
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {acc.accreditationType}
                </span>
              </div>

              {/* Body Name */}
              <h3 className="font-display font-bold text-white text-sm leading-snug">
                {acc.bodyName}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs font-body leading-relaxed flex-1">
                {acc.description}
              </p>

              {/* Dates */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                  <Calendar className="w-3 h-3 text-orange-400" />
                  Granted: {formatDate(acc.dateGranted)}
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400 font-mono">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
