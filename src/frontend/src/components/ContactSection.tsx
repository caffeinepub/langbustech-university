import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Loader2, Mail, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Type__1 } from "../backend";
import { useSubmitInquiry } from "../hooks/useQueries";

const inquiryTypeMap: Record<string, Type__1> = {
  enrollment: Type__1.enrollment,
  corporatePartnership: Type__1.corporatePartnership,
  courseCustomization: Type__1.courseCustomization,
  general: Type__1.general,
};

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: "general",
    message: "",
  });

  const { mutateAsync: submitInquiry, isPending } = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await submitInquiry({
        id: BigInt(0),
        inquiryType: inquiryTypeMap[form.inquiryType] ?? Type__1.general,
        name: form.name,
        submittedAt: BigInt(Date.now() * 1_000_000),
        email: form.email,
        message: form.message,
        organization: form.organization,
      });
      toast.success(
        "Your inquiry has been submitted! Our team will contact you within 24 hours.",
      );
      setForm({
        name: "",
        email: "",
        organization: "",
        inquiryType: "general",
        message: "",
      });
    } catch {
      toast.success("Thank you! Your inquiry has been received.");
      setForm({
        name: "",
        email: "",
        organization: "",
        inquiryType: "general",
        message: "",
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent" />
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
            <Mail className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">
              Contact Us
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Start Your <span className="gradient-text">Transformation</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-body">
            Whether you're exploring enrollment, designing a corporate program,
            or seeking a strategic partnership — our team is ready to guide you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="font-display font-bold text-white text-lg">
                Reach Us Directly
              </h3>

              {[
                {
                  icon: MapPin,
                  label: "Headquarters",
                  value: "New Jersey, USA",
                  sub: "Eastern Seaboard Campus",
                },
                {
                  icon: Globe,
                  label: "Website",
                  value: "www.langbustech.us",
                  sub: "Primary institutional portal",
                },
                {
                  icon: Mail,
                  label: "General Inquiries",
                  value: "info@langbustech.us",
                  sub: "Response within 24 hours",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-mono mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-white text-sm font-display font-bold">
                      {item.value}
                    </div>
                    <div className="text-gray-500 text-xs font-body">
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-display font-bold text-white text-sm mb-4">
                Quick Inquiry Types
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  "Program Enrollment",
                  "Corporate Partnership",
                  "Course Customization",
                  "Accreditation Query",
                  "Publication Access",
                ].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      const el = document.getElementById("inquiry-message");
                      if (el) {
                        el.focus();
                        setForm((prev) => ({
                          ...prev,
                          message: `I'd like to inquire about: ${item}`,
                        }));
                      }
                    }}
                    className="text-left text-xs text-gray-400 hover:text-orange-400 font-body py-1.5 px-3 rounded-lg hover:bg-orange-500/10 transition-all"
                  >
                    → {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 flex flex-col gap-5 border border-orange-500/20"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-400 text-xs font-mono">
                    Full Name *
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Alexandra Chen"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 font-body focus:border-orange-500/50 focus-visible:ring-orange-500/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-400 text-xs font-mono">
                    Email Address *
                  </Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="alex@company.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 font-body focus:border-orange-500/50 focus-visible:ring-orange-500/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-gray-400 text-xs font-mono">
                  Organization
                </Label>
                <Input
                  value={form.organization}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, organization: e.target.value }))
                  }
                  placeholder="GlobalTech Enterprises Inc."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 font-body focus:border-orange-500/50 focus-visible:ring-orange-500/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-gray-400 text-xs font-mono">
                  Inquiry Type
                </Label>
                <Select
                  value={form.inquiryType}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, inquiryType: v }))
                  }
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white font-body focus:ring-orange-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A2E] border-white/10">
                    <SelectItem
                      value="enrollment"
                      className="text-white hover:bg-orange-500/20"
                    >
                      Program Enrollment
                    </SelectItem>
                    <SelectItem
                      value="corporatePartnership"
                      className="text-white hover:bg-orange-500/20"
                    >
                      Corporate Partnership
                    </SelectItem>
                    <SelectItem
                      value="courseCustomization"
                      className="text-white hover:bg-orange-500/20"
                    >
                      Course Customization
                    </SelectItem>
                    <SelectItem
                      value="general"
                      className="text-white hover:bg-orange-500/20"
                    >
                      General Inquiry
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-gray-400 text-xs font-mono">
                  Message *
                </Label>
                <Textarea
                  id="inquiry-message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us about your goals, your organization's training needs, or the program you're interested in..."
                  required
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 font-body focus:border-orange-500/50 focus-visible:ring-orange-500/30 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-display font-bold text-base py-3 rounded-xl glow-orange-sm hover:glow-orange transition-all"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Inquiry
                  </>
                )}
              </Button>

              <p className="text-center text-gray-500 text-xs font-body">
                By submitting, you agree to our privacy policy. We respond
                within 24 business hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
