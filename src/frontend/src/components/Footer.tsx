import { ExternalLink, Globe, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

const footerLinks = {
  Programs: [
    "AI Skills",
    "Leadership Excellence",
    "Service Training",
    "Business Transformation",
    "Professional Development",
  ],
  Institution: [
    "About Us",
    "Accreditation",
    "Publications",
    "Certifications",
    "Recognition",
  ],
  Corporate: [
    "Custom Programs",
    "Corporate Partnerships",
    "Course Customization",
    "ROI Assessment",
    "Enterprise Solutions",
  ],
  Connect: [
    "Contact Us",
    "Student Portal",
    "Faculty Resources",
    "Alumni Network",
    "Media Inquiries",
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "langbustech.us";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="relative overflow-hidden border-t border-orange-500/20">
      <div className="absolute inset-0 bg-[#080810]" />
      <div className="absolute inset-0 circuit-bg opacity-20" />

      <div className="relative container mx-auto px-4">
        {/* Top */}
        <div className="py-16 grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden glow-orange-sm">
                <img
                  src="/assets/generated/university-logo-transparent.dim_300x300.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm">
                  LangBusTech
                </div>
                <div className="font-display font-bold text-orange-500 text-xs tracking-widest uppercase">
                  University
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm font-body leading-relaxed mb-6 max-w-sm">
              The world's premier agentic AI-powered corporate education
              institution. Transforming organizations and professionals globally
              through customized intelligence education.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <MapPin className="w-3 h-3 text-orange-400" />
                New Jersey, USA
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <Globe className="w-3 h-3 text-orange-400" />
                <a
                  href="https://www.langbustech.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  www.langbustech.us
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: SiLinkedin, href: "#", label: "LinkedIn" },
                { Icon: SiX, href: "#", label: "X (Twitter)" },
                { Icon: SiYoutube, href: "#", label: "YouTube" },
                { Icon: SiFacebook, href: "#", label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg glass-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/40 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={() => {
                          const sectionMap: Record<string, string> = {
                            "Contact Us": "#contact",
                            "About Us": "#about",
                            Accreditation: "#accreditation",
                            Publications: "#publications",
                            Certifications: "#certifications",
                            Recognition: "#recognition",
                            "Custom Programs": "#corporate",
                            "Corporate Partnerships": "#corporate",
                          };
                          const href = sectionMap[link] || "#home";
                          const el = document.querySelector(href);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-xs text-gray-500 hover:text-orange-400 font-body transition-colors text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500 font-body text-center sm:text-left">
            © {year} LangBusTech University. All Rights Reserved. | New Jersey,
            USA |{" "}
            <a
              href="https://www.langbustech.us"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              www.langbustech.us
            </a>
          </div>
          <div className="text-xs text-gray-600 font-body">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
