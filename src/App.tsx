import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section41, Section42, Section43, Section44 } from "./components/Sections";
import {
  Binary,
  Shield,
  ChevronRight,
  Menu,
  X,
  Hash,
  Layers,
  ArrowDown,
  Lock,
  GitBranch,
} from "lucide-react";

/* ─── Navigation ─── */
const sections = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "s41", label: "§4.1 Tool Registration", opcode: "0x0101", color: "#3b82f6" },
  { id: "s42", label: "§4.2 Orchestration Step", opcode: "0x0202", color: "#10b981" },
  { id: "s43", label: "§4.3 Evidence Payload", opcode: "0x010A/0x020A", color: "#f97316" },
  { id: "s44", label: "§4.4 Bridge Discontinuity", opcode: "0x00FF", color: "#ec4899" },
];

function Navbar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Binary className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Transaction Encoder</span>
              <span className="text-[10px] font-mono text-gray-500 ml-2">V2 WIRE CODEC</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 text-xs font-mono text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          <button className="md:hidden text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50">
          <div className="px-4 py-3 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors"
              >
                {"color" in s && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                )}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero / Overview ─── */
function Overview() {
  return (
    <section id="overview" className="relative pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-gray-950 to-gray-950" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-gray-300 text-xs font-mono">SPECIFICATION v2.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Transaction Encoder
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              V2 Wire Codec
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Binary protocol specification for command payloads, evidence records, and bridge
            discontinuity markers. All fields are big-endian unless otherwise noted.
          </p>
        </motion.div>

        {/* Spec cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            {
              id: "s41",
              opcode: "0x0101",
              title: "Tool Registration",
              bytes: "80B",
              color: "#3b82f6",
              icon: Shield,
            },
            {
              id: "s42",
              opcode: "0x0202",
              title: "Orchestration Step",
              bytes: "80B",
              color: "#10b981",
              icon: GitBranch,
            },
            {
              id: "s43",
              opcode: "0x010A",
              title: "Evidence Payload",
              bytes: "80B",
              color: "#f97316",
              icon: Hash,
            },
            {
              id: "s44",
              opcode: "0x00FF",
              title: "Bridge Discontinuity",
              bytes: "72B",
              color: "#ec4899",
              icon: Lock,
            },
          ].map((card) => (
            <a
              key={card.id}
              href={`#${card.id}`}
              className="group relative bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 hover:border-gray-700/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: card.color + "20", border: `1px solid ${card.color}40` }}
                  >
                    <card.icon className="w-4 h-4" style={{ color: card.color }} />
                  </div>
                  <span className="font-mono text-[10px] text-gray-600">{card.bytes}</span>
                </div>
                <div className="font-mono text-[10px] mb-1" style={{ color: card.color }}>
                  {card.opcode}
                </div>
                <div className="text-sm font-medium text-white group-hover:text-gray-200 transition-colors">
                  {card.title}
                </div>
                <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all absolute top-4 right-4" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="#s41" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-400 transition-colors">
            <span className="text-[10px] font-mono">EXPLORE SPEC</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section Divider ─── */
function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
    </div>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800/50 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
              <Binary className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-mono text-gray-400">
              Transaction Encoder V2 Wire Codec Specification
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-gray-600">
              All sizes in bytes • Big-endian • SHA-256 digests
            </span>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800/30 text-center">
          <p className="text-[10px] font-mono text-gray-700">
            SPEC-v2.0 • EDAL SYNC PROTOCOL • RING BUFFER EVIDENCE CHAIN
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Overview />
      <SectionDivider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        <Section41 />
        <SectionDivider />
        <Section42 />
        <SectionDivider />
        <Section43 />
        <SectionDivider />
        <Section44 />
      </div>

      <Footer />
    </div>
  );
}
