import { ArrowRight, Brain, Building2 } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1600x600.jpg"
          alt="LangBusTech University"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14]/70 via-[#0A0A14]/60 to-[#0A0A14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/80 via-transparent to-[#0A0A14]/80" />
      </div>

      {/* Circuit Grid Background */}
      <div className="absolute inset-0 circuit-bg opacity-30" />

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl animate-float" />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-orange-500/40 glow-orange-sm animate-pulse-glow">
            <Brain className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-xs font-display font-bold tracking-widest uppercase">
              Agentic AI Powered
            </span>
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
        >
          The Future of{" "}
          <span className="gradient-text text-glow-orange">
            Corporate Intelligence
          </span>{" "}
          Education
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-4 font-body leading-relaxed"
        >
          Customized AI-Aligned Corporate Skills for Global Leaders
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-orange-400/80 text-sm font-mono tracking-widest uppercase mb-12"
        >
          New Jersey, USA · Serving 50+ Countries · Global Excellence
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => handleNavClick("#programs")}
            className="group flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-display font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 glow-orange hover:glow-orange-lg"
          >
            Explore Programs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("#corporate")}
            className="group flex items-center gap-3 glass-card hover:border-orange-500/50 text-white font-display font-bold text-base px-8 py-4 rounded-xl transition-all duration-300"
          >
            <Building2 className="w-5 h-5 text-orange-400" />
            Corporate Partnership
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs font-mono tracking-widest uppercase">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-orange-500/60 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
