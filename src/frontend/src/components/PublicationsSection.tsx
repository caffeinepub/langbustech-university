import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Download, User } from "lucide-react";
import { motion } from "motion/react";
import { Type } from "../backend";
import { useGetPublicationsByType } from "../hooks/useQueries";
import type { Publication } from "../hooks/useQueries";

const now = Date.now();
const oneMonth = 30 * 24 * 60 * 60 * 1000;

const sampleIntelligence: Publication[] = [
  {
    id: BigInt(1),
    title:
      "The Agentic AI Revolution: Reshaping Corporate Workforce Strategy 2026",
    publishedDate: BigInt((now - oneMonth) * 1_000_000),
    type: Type.intelligence,
    authorName: "Dr. Amara Osei-Bonsu, PhD",
    downloadUrl: "#",
    abstract:
      "This intelligence report examines how autonomous AI agents are fundamentally transforming workforce planning, skill acquisition, and human-machine collaboration in Fortune 500 enterprises. Featuring data from 280 global organizations.",
  },
  {
    id: BigInt(2),
    title:
      "Global Corporate Learning Index 2026: Skills Gap Analysis Across 50 Industries",
    publishedDate: BigInt((now - 2 * oneMonth) * 1_000_000),
    type: Type.intelligence,
    authorName: "Prof. Marcus Delacroix, LangBusTech Research",
    downloadUrl: "#",
    abstract:
      "Comprehensive analysis of skills deficiencies, training ROI benchmarks, and emerging competency needs across 50 industry sectors, drawing on surveys of 15,000 professionals across 40 countries.",
  },
  {
    id: BigInt(3),
    title: "AI Governance Frameworks for Corporate Education Institutions",
    publishedDate: BigInt((now - 3 * oneMonth) * 1_000_000),
    type: Type.intelligence,
    authorName: "LangBusTech Research Division",
    downloadUrl: "#",
    abstract:
      "An intelligence-grade examination of regulatory frameworks, ethical AI deployment in education, and institutional readiness for AI-driven learning systems.",
  },
];

const sampleWhite: Publication[] = [
  {
    id: BigInt(4),
    title: "Designing Corporate Learning Ecosystems for the Next Decade",
    publishedDate: BigInt((now - oneMonth * 1.5) * 1_000_000),
    type: Type.white,
    authorName: "Dr. Priya Venkataraman",
    downloadUrl: "#",
    abstract:
      "A white paper presenting LangBusTech's proprietary ALIGN framework for building sustainable, technology-integrated corporate learning architectures that scale with organizational growth.",
  },
  {
    id: BigInt(5),
    title: "Measuring True ROI of Leadership Development Programs",
    publishedDate: BigInt((now - 2.5 * oneMonth) * 1_000_000),
    type: Type.white,
    authorName: "James Okonkwo, MBA, SHRM-CP",
    downloadUrl: "#",
    abstract:
      "This paper introduces the LangBusTech Leadership ROI Matrix — a five-dimension model for quantifying organizational value from executive education investments.",
  },
  {
    id: BigInt(6),
    title: "Blended Learning Architectures for High-Performance Organizations",
    publishedDate: BigInt((now - 4 * oneMonth) * 1_000_000),
    type: Type.white,
    authorName: "Dr. Sofia Marchetti, EdD",
    downloadUrl: "#",
    abstract:
      "Technical guidance on designing hybrid learning modalities that combine AI-adaptive content, cohort collaboration, and expert-led facilitation for maximum behavioral change.",
  },
];

const sampleOrange: Publication[] = [
  {
    id: BigInt(7),
    title:
      "Orange Report: Future Skills 2030 — The 12 Competencies Every Organization Must Build",
    publishedDate: BigInt((now - 0.5 * oneMonth) * 1_000_000),
    type: Type.orange,
    authorName: "LangBusTech Future Intelligence Lab",
    downloadUrl: "#",
    abstract:
      "Our signature Orange Report identifies 12 critical human-AI hybrid competencies that will define organizational resilience and competitive advantage by 2030. Required reading for CHROs and L&D executives.",
  },
  {
    id: BigInt(8),
    title:
      "Orange Report: The Corporate University Renaissance — AI as the New Campus",
    publishedDate: BigInt((now - oneMonth) * 1_000_000),
    type: Type.orange,
    authorName: "Tomás Kovalenko, LangBusTech",
    downloadUrl: "#",
    abstract:
      "Explores the transformation of corporate universities through agentic AI — from fixed curriculum to dynamic, self-optimizing learning environments that adapt to individual and organizational needs in real time.",
  },
  {
    id: BigInt(9),
    title:
      "Orange Report: New Jersey as the Global Hub for AI-Driven Corporate Education",
    publishedDate: BigInt((now - 2 * oneMonth) * 1_000_000),
    type: Type.orange,
    authorName: "LangBusTech Policy Research",
    downloadUrl: "#",
    abstract:
      "Strategic analysis of the tri-state region's emerging role in corporate education, featuring New Jersey's regulatory advantage, talent concentration, and LangBusTech's position as the anchor institution.",
  },
];

function formatDate(nanoTime: bigint): string {
  const ms = Number(nanoTime) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

function PublicationCard({
  pub,
  accent = false,
}: { pub: Publication; accent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accent ? "bg-orange-500/20 border border-orange-500/40" : "bg-white/5 border border-white/10"}`}
        >
          <BookOpen
            className={`w-5 h-5 ${accent ? "text-orange-400" : "text-gray-400"}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-white text-sm leading-snug mb-1">
            {pub.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {pub.authorName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(pub.publishedDate)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-xs font-body leading-relaxed line-clamp-3">
        {pub.abstract}
      </p>

      <button
        type="button"
        className={`group flex items-center gap-2 text-xs font-display font-bold mt-auto transition-colors ${accent ? "text-orange-400 hover:text-orange-300" : "text-gray-400 hover:text-orange-400"}`}
      >
        <Download className="w-3 h-3" />
        Download PDF
      </button>
    </motion.div>
  );
}

function PublicationsTab({
  type,
  sampleData,
  accent = false,
}: { type: Type; sampleData: Publication[]; accent?: boolean }) {
  const { data: backendPubs } = useGetPublicationsByType(type);
  const publications =
    backendPubs && backendPubs.length > 0 ? backendPubs : sampleData;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {publications.map((pub) => (
        <PublicationCard key={pub.id.toString()} pub={pub} accent={accent} />
      ))}
    </div>
  );
}

export default function PublicationsSection() {
  return (
    <section id="publications" className="py-24 relative overflow-hidden">
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
            <BookOpen className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">
              Research & Publications
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Intelligence, Insights &{" "}
            <span className="gradient-text">Orange Reports</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-body">
            Thought leadership publications advancing the science and practice
            of corporate education, AI-human collaboration, and workforce
            transformation.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="orange">
          <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 bg-white/5 border border-white/10 rounded-xl p-1">
            <TabsTrigger
              value="intelligence"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400 font-display font-bold text-xs rounded-lg"
            >
              Intelligence Reports
            </TabsTrigger>
            <TabsTrigger
              value="white"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400 font-display font-bold text-xs rounded-lg"
            >
              White Reports
            </TabsTrigger>
            <TabsTrigger
              value="orange"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:glow-orange-sm text-orange-400 font-display font-bold text-xs rounded-lg"
            >
              Orange Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="intelligence">
            <PublicationsTab
              type={Type.intelligence}
              sampleData={sampleIntelligence}
            />
          </TabsContent>
          <TabsContent value="white">
            <PublicationsTab type={Type.white} sampleData={sampleWhite} />
          </TabsContent>
          <TabsContent value="orange">
            <PublicationsTab
              type={Type.orange}
              sampleData={sampleOrange}
              accent={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
