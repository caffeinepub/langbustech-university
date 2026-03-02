import { Menu, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Corporate", href: "#corporate" },
  { label: "Accreditation", href: "#accreditation" },
  { label: "Publications", href: "#publications" },
  { label: "Certifications", href: "#certifications" },
  { label: "Recognition", href: "#recognition" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A14]/95 backdrop-blur-xl border-b border-orange-500/20 shadow-orange-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden glow-orange-sm group-hover:glow-orange transition-all duration-300">
              <img
                src="/assets/generated/university-logo-transparent.dim_300x300.png"
                alt="LangBusTech University Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm leading-tight">
                LangBusTech
              </div>
              <div className="font-display font-bold text-orange-500 text-xs leading-tight tracking-widest uppercase">
                University
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 text-xs font-body font-medium text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-all duration-200 tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-xs font-display font-bold px-4 py-2 rounded-lg transition-all duration-200 glow-orange-sm hover:glow-orange"
            >
              <Zap className="w-3 h-3" />
              Enroll Now
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0A0A14]/98 backdrop-blur-xl border-b border-orange-500/20 shadow-orange"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-sm font-body font-medium text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all"
                >
                  {link.label}
                </motion.button>
              ))}
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="mt-2 flex items-center justify-center gap-2 bg-orange-500 text-white text-sm font-display font-bold px-4 py-3 rounded-lg glow-orange-sm"
              >
                <Zap className="w-4 h-4" />
                Enroll Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
