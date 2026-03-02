import { Brain, Send, Sparkles, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAddAIAdvisorMessage,
  useCreateAIAdvisorSession,
} from "../hooks/useQueries";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

type ConversationStage =
  | "greeting"
  | "ask_role"
  | "ask_industry"
  | "ask_goals"
  | "recommend"
  | "open";

const programRecommendations: Record<string, string[]> = {
  executive: [
    "Corporate Leadership Excellence Program",
    "AI Business Strategy & Implementation",
    "Digital Business Transformation Bootcamp",
  ],
  manager: [
    "Professional Development & Career Acceleration",
    "Corporate Leadership Excellence Program",
    "Advanced Service Training Fundamentals",
  ],
  tech: [
    "Agentic AI for Corporate Decision Making",
    "AI Business Strategy & Implementation",
    "Digital Business Transformation Bootcamp",
  ],
  hr: [
    "Professional Development & Career Acceleration",
    "Advanced Service Training Fundamentals",
    "Corporate Leadership Excellence Program",
  ],
  default: [
    "AI Business Strategy & Implementation",
    "Professional Development & Career Acceleration",
    "Corporate Leadership Excellence Program",
  ],
};

function getRecommendations(role: string, goals: string): string[] {
  const r = role.toLowerCase();
  const g = goals.toLowerCase();
  if (
    r.includes("exec") ||
    r.includes("ceo") ||
    r.includes("cto") ||
    r.includes("vp")
  )
    return programRecommendations.executive;
  if (r.includes("manager") || r.includes("director") || r.includes("lead"))
    return programRecommendations.manager;
  if (g.includes("ai") || g.includes("tech") || g.includes("digital"))
    return programRecommendations.tech;
  if (r.includes("hr") || r.includes("talent") || r.includes("people"))
    return programRecommendations.hr;
  return programRecommendations.default;
}

const stageMessages: Record<ConversationStage, string> = {
  greeting:
    "Hello! I'm LangBot, your AI Academic Advisor. I'm here to help you find the perfect program for your professional journey. What's your name?",
  ask_role:
    "Great to meet you! What's your current role or title? (e.g., HR Manager, CEO, Product Lead, Consultant)",
  ask_industry:
    "Perfect. What industry are you in? (e.g., Finance, Healthcare, Technology, Manufacturing)",
  ask_goals:
    "Excellent context! What are your primary learning goals? (e.g., lead AI transformation, improve team performance, advance my career)",
  recommend: "",
  open: "Is there anything else you'd like to know about our programs, certifications, or corporate partnerships?",
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 glass-card rounded-xl rounded-tl-none w-fit">
      <div className="typing-dots flex gap-1">
        {["dot-0", "dot-1", "dot-2"].map((key, i) => (
          <span
            key={key}
            className="w-1.5 h-1.5 rounded-full bg-orange-400"
            style={{
              animationDelay: `${i * 0.2}s`,
              animation: "typing-dot 1.4s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AIAdvisorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<ConversationStage>("greeting");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<bigint | null>(null);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initializedRef = useRef(false);

  const { mutateAsync: createSession } = useCreateAIAdvisorSession();
  const { mutateAsync: addMessage } = useAddAIAdvisorMessage();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const addBotMessage = useCallback((content: string, delay = 800) => {
    setIsTyping(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        const msg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, msg]);
        resolve();
      }, delay);
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (initializedRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
      return;
    }
    initializedRef.current = true;

    const init = async () => {
      try {
        const sid = await createSession(`session-${Date.now()}`);
        setSessionId(sid);
      } catch {
        // fallback: use local state only
      }
      await addBotMessage(stageMessages.greeting, 500);
      setStage("ask_role");
      setTimeout(() => inputRef.current?.focus(), 300);
    };
    init();
  }, [isOpen, createSession, addBotMessage]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input.trim();
    setInput("");

    // Try to persist message to backend
    try {
      if (sessionId !== null) {
        await addMessage({
          sessionId,
          message: { content: currentInput, role: "user" },
        });
      }
    } catch {
      // Local fallback
    }

    // Flow logic
    if (stage === "greeting") {
      setUserName(currentInput.split(" ")[0]);
      await addBotMessage(
        `Welcome, ${currentInput.split(" ")[0]}! ${stageMessages.ask_role}`,
      );
      setStage("ask_industry");
    } else if (stage === "ask_industry") {
      setUserRole(currentInput);
      await addBotMessage(stageMessages.ask_goals);
      setStage("ask_goals");
    } else if (stage === "ask_goals") {
      const recs = getRecommendations(userRole, currentInput);
      const recText = `Based on your background and goals, here are my top 3 personalized program recommendations for you, ${userName}:

**1. ${recs[0]}**
Highly aligned with your leadership trajectory and strategic goals.

**2. ${recs[1]}**
Perfect for developing the skills you described.

**3. ${recs[2]}**
Rounds out your professional development journey.

All three are customizable for corporate delivery. Would you like to learn more about any of these programs, or shall I connect you with our enrollment team?`;
      await addBotMessage(recText, 1500);
      setStage("open");
    } else {
      // Open conversation
      const response = generateContextResponse(currentInput);
      await addBotMessage(response);
    }
  };

  const generateContextResponse = (input: string): string => {
    const i = input.toLowerCase();
    if (i.includes("enroll") || i.includes("sign up") || i.includes("register"))
      return "Excellent! To begin enrollment, please visit our Contact section or email admissions@langbustech.us. Our team will guide you through a customized enrollment consultation to ensure the program is perfectly aligned with your goals.";
    if (i.includes("corporate") || i.includes("company") || i.includes("team"))
      return "For corporate and team training solutions, LangBusTech offers fully customized programs. Our Corporate Solutions team can design a bespoke learning architecture for your entire organization. Shall I connect you with our corporate partnerships team?";
    if (i.includes("certif"))
      return "LangBusTech offers 6 premium professional certifications, including the Certified Corporate Trainer (CCT), AI Business Strategist, and Leadership Excellence Certificate. Each credential is recognized globally by our corporate network of 500+ partners.";
    if (i.includes("cost") || i.includes("price") || i.includes("fee"))
      return "Program investment varies based on format, duration, and customization level. Individual programs start from $2,400, and corporate packages offer significant volume pricing. For a detailed quote tailored to your needs, please use our Contact form.";
    if (i.includes("duration") || i.includes("how long") || i.includes("time"))
      return "Program durations range from 20 to 48 hours of structured learning, delivered over 2-12 weeks depending on the format. We offer intensive bootcamps, weekly modules, and self-paced tracks to fit any professional schedule.";
    return "That's a great question. Our academic advisors would be best positioned to provide a detailed answer. Please reach out through our Contact section, or I can flag this for a personal consultation. Is there anything else I can help you explore?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const key = `line-${i}-${line.slice(0, 8)}`;
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p
            key={key}
            className="font-display font-bold text-white mt-2 mb-0.5"
          >
            {line.slice(2, -2)}
          </p>
        );
      }
      return (
        <p key={key} className={line === "" ? "h-2" : ""}>
          {line}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-orange-500 text-white font-display font-bold text-sm px-5 py-3 rounded-full shadow-orange-lg animate-pulse-glow"
            aria-label="Open AI Advisor"
          >
            <Brain className="w-5 h-5" />
            <span className="hidden sm:inline">AI Advisor</span>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] flex flex-col rounded-2xl overflow-hidden shadow-orange-lg border border-orange-500/30"
            style={{ maxHeight: "80vh", height: "580px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-orange-500">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-display font-bold text-white text-sm">
                  LangBot AI Advisor
                </div>
                <div className="text-orange-100 text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  Online · Agentic AI · LangBusTech
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
                aria-label="Close advisor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
              style={{ background: "#0A0A14" }}
            >
              {/* Welcome Banner */}
              {messages.length === 0 && !isTyping && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-orange-400" />
                  </div>
                  <p className="text-gray-400 text-xs font-body">
                    Connecting to AI Advisor...
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-orange-500/30 border border-orange-500/40"
                        : "bg-white/10 border border-white/20"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Brain className="w-3 h-3 text-orange-400" />
                    ) : (
                      <User className="w-3 h-3 text-gray-400" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] text-xs font-body leading-relaxed rounded-2xl px-3 py-2.5 ${
                      msg.role === "assistant"
                        ? "glass-card text-gray-200 rounded-tl-none border border-orange-500/15"
                        : "bg-orange-500/90 text-white rounded-tr-none"
                    }`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500/30 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-3 h-3 text-orange-400" />
                  </div>
                  <TypingIndicator />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 border-t border-orange-500/20 flex items-center gap-2"
              style={{ background: "#0D0D1A" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-body placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all glow-orange-sm flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
