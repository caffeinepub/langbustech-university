import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Calendar, CheckCircle2, Search, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllCertifications } from "../hooks/useQueries";
import type { Certification } from "../hooks/useQueries";

const sampleCertifications: Certification[] = [
  {
    id: BigInt(1),
    issueDate: BigInt((Date.now() - 60 * 24 * 60 * 60 * 1000) * 1_000_000),
    certName: "Certified Corporate Trainer (CCT)",
    description:
      "The gold standard credential for professional trainers operating in enterprise environments. Validates design, facilitation, and evaluation competencies.",
    isVerified: true,
    credentialId: "LBT-CCT-2024-001",
    requirements: "120 hours coursework + practicum + written examination",
    recipientName: "Alexandra Chen",
  },
  {
    id: BigInt(2),
    issueDate: BigInt((Date.now() - 90 * 24 * 60 * 60 * 1000) * 1_000_000),
    certName: "AI Business Strategist (AIBS)",
    description:
      "Recognizes mastery of AI strategy, implementation frameworks, and change management for enterprise AI transformation initiatives.",
    isVerified: true,
    credentialId: "LBT-AIBS-2024-042",
    requirements: "80 hours AI curriculum + strategy project + peer review",
    recipientName: "Marcus Williams",
  },
  {
    id: BigInt(3),
    issueDate: BigInt((Date.now() - 120 * 24 * 60 * 60 * 1000) * 1_000_000),
    certName: "Leadership Excellence Certificate (LEC)",
    description:
      "Advanced credential for executives who have completed LangBusTech's flagship leadership program and demonstrated applied leadership impact.",
    isVerified: true,
    credentialId: "LBT-LEC-2024-178",
    requirements: "Executive coaching + 360 assessment + capstone project",
    recipientName: "Priya Sharma",
  },
  {
    id: BigInt(4),
    issueDate: BigInt((Date.now() - 30 * 24 * 60 * 60 * 1000) * 1_000_000),
    certName: "Digital Transformation Professional (DTP)",
    description:
      "Certifies expertise in managing enterprise-wide digital transformation programs, from strategy to execution to cultural embedding.",
    isVerified: true,
    credentialId: "LBT-DTP-2024-256",
    requirements:
      "60 hours coursework + transformation case study + oral defense",
    recipientName: "Robert Okafor",
  },
  {
    id: BigInt(5),
    issueDate: BigInt((Date.now() - 180 * 24 * 60 * 60 * 1000) * 1_000_000),
    certName: "Corporate Innovation Catalyst (CIC)",
    description:
      "Recognizes professionals who lead innovation programs, design thinking workshops, and organizational creativity initiatives.",
    isVerified: true,
    credentialId: "LBT-CIC-2024-089",
    requirements:
      "Innovation lab participation + project portfolio + mentor evaluation",
    recipientName: "Yuki Tanaka",
  },
  {
    id: BigInt(6),
    issueDate: BigInt((Date.now() - 45 * 24 * 60 * 60 * 1000) * 1_000_000),
    certName: "Service Excellence Master (SEM)",
    description:
      "The highest service quality certification, validating expertise in designing and managing world-class customer experience programs.",
    isVerified: true,
    credentialId: "LBT-SEM-2024-312",
    requirements: "Service audit + NPS certification + client testimonials",
    recipientName: "Isabella Fernandez",
  },
];

function formatDate(nanoTime: bigint): string {
  const ms = Number(nanoTime) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function CertificationsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Certification[] | null>(
    null,
  );
  const [isSearching, setIsSearching] = useState(false);
  const { data: backendCerts } = useGetAllCertifications();

  const certifications =
    backendCerts && backendCerts.length > 0
      ? backendCerts
      : sampleCertifications;

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    // Simulate search on client side from sample data
    setTimeout(() => {
      const results = certifications.filter(
        (c) =>
          c.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.credentialId.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
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
            <Award className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">
              Certifications
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Professional Credentials{" "}
            <span className="gradient-text">That Matter</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-body">
            LangBusTech credentials are recognized by corporate partners
            globally as proof of genuine expertise and applied professional
            mastery.
          </p>
        </motion.div>

        {/* Certification Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id.toString()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Background hexagon decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-[4rem] -translate-y-4 translate-x-4" />

              {/* Badge Icon */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 glow-orange-sm flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex-1">
                  {cert.isVerified && (
                    <div className="flex items-center gap-1 text-green-400 text-xs font-mono mb-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Credential
                    </div>
                  )}
                  <div className="text-gray-500 text-xs font-mono">
                    {cert.credentialId}
                  </div>
                </div>
              </div>

              {/* Name */}
              <h3 className="font-display font-bold text-white text-sm leading-snug">
                {cert.certName}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs font-body leading-relaxed line-clamp-3 flex-1">
                {cert.description}
              </p>

              {/* Requirements */}
              <div className="flex items-start gap-2 p-3 bg-white/3 rounded-lg border border-white/5">
                <Shield className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-500 font-body">
                  {cert.requirements}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono border-t border-white/5 pt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-orange-400" />
                  {formatDate(cert.issueDate)}
                </span>
                <span className="text-orange-400/70">{cert.recipientName}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credential Verification */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-card rounded-2xl p-8 border border-orange-500/20"
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-display font-bold text-white text-xl mb-2">
              Verify a Credential
            </h3>
            <p className="text-gray-400 text-sm font-body">
              Enter a recipient name or credential ID to verify authenticity
            </p>
          </div>

          <div className="flex gap-3">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter name or credential ID..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 font-body focus:border-orange-500/50"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-orange-500 hover:bg-orange-400 text-white font-display font-bold glow-orange-sm px-6"
            >
              {isSearching ? "Searching..." : "Verify"}
            </Button>
          </div>

          {searchResults !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              {searchResults.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-4">
                  No credentials found for "{searchQuery}"
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {searchResults.map((cert) => (
                    <div
                      key={cert.id.toString()}
                      className="flex items-center gap-3 p-3 bg-green-400/5 border border-green-400/20 rounded-lg"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div>
                        <div className="text-white text-sm font-display font-bold">
                          {cert.certName}
                        </div>
                        <div className="text-gray-400 text-xs font-mono">
                          {cert.recipientName} · {cert.credentialId}
                        </div>
                      </div>
                      <span className="ml-auto text-green-400 text-xs font-mono">
                        ✓ Verified
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
