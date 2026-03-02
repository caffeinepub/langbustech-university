import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Corporate Partners" },
  { value: 200, suffix: "+", label: "Certified Programs" },
  { value: 50, suffix: "+", label: "Countries Served" },
  { value: 10000, suffix: "+", label: "Professionals Trained", prefix: "" },
];

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
}: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const formatted =
    count >= 1000
      ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
      : count.toString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count >= 1000 ? formatted : count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-orange-500/10" />
      <div className="absolute inset-0 border-y border-orange-500/20" />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-orange-500 text-glow-orange mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <div className="text-gray-400 text-sm font-body tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
