import { Eye, Heart, MapPin, Target } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To equip individuals and organizations with the intelligence, skills, and credentials needed to lead in an AI-transformed global economy.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be the world's premier agentic AI-powered corporate education institution — where every learning journey is uniquely designed for maximum impact.",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Excellence Without Compromise · Human-Centered AI · Corporate Integrity · Lifelong Learning · Global Inclusion",
  },
];

const leadership = [
  {
    name: "Dr. Lansana Abdi-Yusuf",
    title: "President & Chief Academic Officer",
    initials: "LA",
    bio: "Former Harvard Business School executive educator with 25 years leading corporate universities at Fortune 100 companies.",
  },
  {
    name: "Prof. Namrata Singh",
    title: "Dean of AI & Innovation Programs",
    initials: "NS",
    bio: "Leading AI researcher and corporate strategist, architect of LangBusTech's agentic AI curriculum framework.",
  },
  {
    name: "James Okonkwo, MBA",
    title: "VP of Corporate Partnerships",
    initials: "JO",
    bio: "30+ years in enterprise learning and development, having partnered with 200+ global organizations across 40 countries.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
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
            <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">
              About LangBusTech
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Shaping the{" "}
            <span className="gradient-text">Leaders of Tomorrow</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto font-body">
            Founded with a singular vision to bridge the gap between corporate
            needs and academic excellence, LangBusTech University has grown into
            a globally recognized institution at the forefront of corporate
            intelligence education.
          </p>
        </motion.div>

        {/* Image + Overview */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glow-orange">
              <img
                src="/assets/generated/ai-brain-network.dim_800x600.jpg"
                alt="AI & Innovation at LangBusTech"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A14]/50 via-transparent to-orange-500/10" />
            </div>

            {/* Location Badge */}
            <div className="absolute bottom-4 left-4 glass-card rounded-xl px-4 py-3 border border-orange-500/30 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-white text-xs font-display font-bold">
                  New Jersey, USA
                </div>
                <div className="text-gray-400 text-xs font-mono">
                  Global Campus · Since 2018
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 font-body leading-relaxed text-sm">
                LangBusTech University was established in New Jersey, USA, with
                a founding principle: that corporate education must evolve
                beyond generic curricula to become truly transformative. Today,
                we serve organizations across 50+ countries with programs
                designed at the intersection of language, business strategy, and
                emerging technology.
              </p>
              <p className="text-gray-400 font-body leading-relaxed text-sm mt-4">
                Our agentic AI platform enables unprecedented personalization —
                every learner's journey adapts to their industry context, career
                stage, and organizational objectives. We partner with
                corporations not as a vendor, but as a strategic intelligence
                partner committed to long-term transformation.
              </p>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { label: "Founded", value: "2018" },
                { label: "Headquarters", value: "New Jersey, USA" },
                {
                  label: "Program Formats",
                  value: "On-site · Virtual · Hybrid",
                },
                { label: "Website", value: "langbustech.us" },
              ].map((fact) => (
                <div key={fact.label} className="p-3 glass-card rounded-lg">
                  <div className="text-gray-500 text-xs font-mono mb-1">
                    {fact.label}
                  </div>
                  <div className="text-white text-xs font-display font-bold">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-6 text-center flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 glow-orange-sm flex items-center justify-center">
                <v.icon className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                {v.title}
              </h3>
              <p className="text-gray-400 text-sm font-body leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-2xl text-white text-center mb-10">
            Institutional <span className="gradient-text">Leadership</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {leadership.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-orange-500/20 border-2 border-orange-500/40 glow-orange-sm flex items-center justify-center">
                  <span className="font-display font-bold text-orange-400 text-lg">
                    {leader.initials}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">
                    {leader.name}
                  </h4>
                  <p className="text-orange-400 text-xs font-mono mt-1">
                    {leader.title}
                  </p>
                </div>
                <p className="text-gray-400 text-xs font-body leading-relaxed">
                  {leader.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
