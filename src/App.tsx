import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Binary,
  Layers,
  ArrowRight,
  ChevronRight,
  Copy,
  Check,
  Hash,
  AlertTriangle,
  Cpu,
  Workflow,
  Shield,
  Activity,
  Info,
  BookOpen,
  Terminal,
} from "lucide-react";
import { allPayloads, type PayloadSpec } from "./data/payloads";

/* ------------------------------------------------------------------ */
/*  Byte Diagram Component                                             */
/* ------------------------------------------------------------------ */

function ByteDiagram({ spec }: { spec: PayloadSpec }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxBytes = Math.max(...spec.fields.map((f) => f.bytes), 1);
  const totalFixed = spec.fields.reduce((s, f) => s + f.bytes, 0);
  const hasVariable = spec.fields.some((f) => f.bytes === 0);

  return (
    <div className="space-y-4">
      {/* Byte bar */}
      <div className="relative">
        <div className="flex rounded-xl overflow-hidden border border-gray-700/50 shadow-lg">
          {spec.fields.map((field, idx) => {
            const isVariable = field.bytes === 0;
            const widthPct = isVariable
              ? 20
              : (field.bytes / (hasVariable ? totalFixed + 10 : totalFixed)) * 100;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={field.name}
                className={`relative bg-gradient-to-b ${field.color} flex items-center justify-center cursor-pointer transition-all duration-200 border-r border-black/20 last:border-r-0`}
                style={{ width: `${widthPct}%`, minWidth: isVariable ? "80px" : "40px" }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                animate={{
                  scaleY: isHovered ? 1.08 : 1,
                  zIndex: isHovered ? 10 : 1,
                }}
                transition={{ duration: 0.15 }}
              >
                <div className="text-center px-1 py-3">
                  <div className="text-white/90 text-[10px] sm:text-xs font-bold truncate leading-tight">
                    {field.name}
                  </div>
                  <div className="text-white/60 text-[9px] sm:text-[10px] mt-0.5">
                    {isVariable ? "0–?" : `${field.bytes}B`}
                  </div>
                </div>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Byte offset ruler */}
        <div className="flex mt-2 text-[10px] text-gray-500 font-mono">
          {(() => {
            let offset = 0;
            return spec.fields.map((field, idx) => {
              const isVariable = field.bytes === 0;
              const widthPct = isVariable
                ? 20
                : (field.bytes / (hasVariable ? totalFixed + 10 : totalFixed)) * 100;
              const startOffset = offset;
              offset += field.bytes;
              return (
                <div
                  key={idx}
                  className="text-center"
                  style={{ width: `${widthPct}%`, minWidth: isVariable ? "80px" : "40px" }}
                >
                  <span className={hoveredIdx === idx ? "text-white" : ""}>
                    {startOffset}
                  </span>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Hovered field detail */}
      <AnimatePresence mode="wait">
        {hoveredIdx !== null && (
          <motion.div
            key={hoveredIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`bg-gradient-to-r ${spec.fields[hoveredIdx].color} rounded-xl p-4 shadow-lg`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-sm">{spec.fields[hoveredIdx].name}</span>
              <span className="text-white/70 text-xs">
                {spec.fields[hoveredIdx].bytes === 0
                  ? "variable"
                  : `${spec.fields[hoveredIdx].bytes} bytes`}
              </span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              {spec.fields[hoveredIdx].detail || spec.fields[hoveredIdx].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Field table */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800/50">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Field</th>
              <th className="text-center text-gray-400 font-medium px-4 py-3">Size</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3 hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {spec.fields.map((field, idx) => (
              <tr
                key={field.name}
                className={`border-b border-gray-800/30 last:border-b-0 transition-colors ${
                  hoveredIdx === idx ? "bg-gray-800/30" : "hover:bg-gray-800/20"
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-sm bg-gradient-to-br ${field.color}`} />
                    <code className="text-gray-200 font-mono text-xs">{field.name}</code>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-gray-300 font-mono text-xs">
                    {field.bytes === 0 ? "0–var" : `${field.bytes}B`}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">
                  {field.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Payload Section                                                    */
/* ------------------------------------------------------------------ */

function PayloadSection({ spec, index }: { spec: PayloadSpec; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(spec.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      id={`section-${spec.id.replace(".", "")}`}
      className="relative py-16 sm:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Section background accent */}
      {index % 2 === 0 && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950" />
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-600/20">
              <spec.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-gray-500 font-mono text-sm">§{spec.id}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 rounded-lg px-2.5 py-1 transition-colors"
                >
                  <code className="text-red-400 font-mono text-sm font-bold">{spec.code}</code>
                  {copied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-500" />
                  )}
                </button>
                <span className="text-gray-600 text-sm font-mono">{spec.totalBytes} bytes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">{spec.title}</h2>
              <p className="text-gray-400 mt-1">{spec.subtitle}</p>
            </div>
          </div>
        </motion.div>

        {/* Byte Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ByteDiagram spec={spec} />
        </motion.div>

        {/* Notes */}
        {spec.notes && spec.notes.length > 0 && (
          <motion.div
            className="mt-8 bg-gray-900/30 border border-gray-800/30 rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Implementation Notes</span>
            </div>
            <ul className="space-y-2">
              {spec.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Overview", href: "#overview" },
    { label: "§4.1 Tool Reg", href: "#section-41" },
    { label: "§4.2 Orch Step", href: "#section-42" },
    { label: "§4.3 Evidence", href: "#section-43" },
    { label: "§4.4 Bridge", href: "#section-44" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <Binary className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Transaction Encoder</span>
              <span className="text-gray-500 text-xs ml-1.5 hidden sm:inline">V2 Wire Codec</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800/50"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button className="lg:hidden text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
            <Layers className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-400 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-gray-800/50"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-14">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/15 via-gray-950 to-gray-950" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[80px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-1.5 mb-8"
        >
          <Hash className="w-3.5 h-3.5 text-red-400" />
          <span className="text-gray-300 text-sm font-mono">Specification v2.0</span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Transaction Encoder
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
            V2 Wire Codec
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Binary wire format specification for command payloads, evidence audit records,
          and bridge discontinuity signaling in the EdalSync protocol.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#section-41"
            className="group flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-red-600/20 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            Read Specification
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#overview"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors border border-gray-700 text-sm"
          >
            <Terminal className="w-4 h-4" />
            Payload Overview
          </a>
        </motion.div>

        {/* Payload code cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { code: "0x0101", label: "Tool Reg" },
            { code: "0x0202", label: "Orch Step" },
            { code: "0x010A", label: "Evidence" },
            { code: "0x00FF", label: "Bridge Gap" },
          ].map((item) => (
            <div
              key={item.code}
              className="bg-gray-900/60 border border-gray-800/50 rounded-xl p-3 hover:border-gray-700/50 transition-colors"
            >
              <div className="text-red-400 font-mono text-sm font-bold">{item.code}</div>
              <div className="text-gray-500 text-xs mt-0.5">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Overview                                                           */
/* ------------------------------------------------------------------ */

function Overview() {
  const overviewItems = [
    {
      icon: Cpu,
      code: "0x0101",
      title: "Tool Registration",
      desc: "Register binary capabilities against the active HostCapabilityPolicy",
      bytes: "52–80 B",
      section: "#section-41",
    },
    {
      icon: Workflow,
      code: "0x0202",
      title: "Orchestration Step",
      desc: "Step execution requests submitted to the agent loop",
      bytes: "50–80 B",
      section: "#section-42",
    },
    {
      icon: Shield,
      code: "0x010A / 0x020A",
      title: "Evidence Payload",
      desc: "Universal 80-byte fixed audit record structure",
      bytes: "80 B fixed",
      section: "#section-43",
    },
    {
      icon: AlertTriangle,
      code: "0x00FF",
      title: "Bridge Discontinuity",
      desc: "Ring saturation overflow signaling from EdalSyncBridge",
      bytes: "72 B",
      section: "#section-44",
    },
  ];

  return (
    <section id="overview" className="relative py-20 bg-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-gray-950 to-gray-950" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Payload Overview</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Sections 4.1–4.4 define the complete set of command and evidence payloads in the V2 wire codec.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {overviewItems.map((item, idx) => (
            <motion.a
              key={item.code}
              href={item.section}
              className="group relative bg-gray-900/50 border border-gray-800/50 rounded-2xl p-5 hover:border-gray-700/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600/80 to-orange-600/80 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-red-400 font-mono text-xs font-bold">{item.code}</code>
                    <span className="text-gray-600 text-xs font-mono">{item.bytes}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Relationship Diagram                                               */
/* ------------------------------------------------------------------ */

function RelationshipDiagram() {
  return (
    <section className="relative py-20 bg-gray-950">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Audit Chain{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Relationships
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            How command payloads generate evidence records through hash-chained audit trails.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-900/30 border border-gray-800/30 rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Command → Evidence */}
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-mono text-xs font-bold">0x0101</span>
                </div>
                <h4 className="text-white text-sm font-semibold">Tool Registration</h4>
                <p className="text-gray-400 text-xs mt-1">Produces tool_id, capability_mask, binary_digest</p>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-gray-700" />
                  <div className="bg-gray-800 rounded-full px-3 py-1 text-[10px] text-gray-400 font-mono">
                    generates
                  </div>
                  <div className="w-px h-4 bg-gray-700" />
                  <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-mono text-xs font-bold">0x010A</span>
                </div>
                <h4 className="text-white text-sm font-semibold">Audit: Tool Registered</h4>
                <p className="text-gray-400 text-xs mt-1">
                  SUBJECT = tool_id · HASH = SHA-256(tool_id ‖ cap_mask ‖ bin_digest)
                </p>
              </div>
            </div>

            {/* Right: Command → Evidence */}
            <div className="space-y-4">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Workflow className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-mono text-xs font-bold">0x0202</span>
                </div>
                <h4 className="text-white text-sm font-semibold">Orchestration Step</h4>
                <p className="text-gray-400 text-xs mt-1">Produces deployment_id, step_index, manifest_payload</p>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-gray-700" />
                  <div className="bg-gray-800 rounded-full px-3 py-1 text-[10px] text-gray-400 font-mono">
                    generates
                  </div>
                  <div className="w-px h-4 bg-gray-700" />
                  <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 font-mono text-xs font-bold">0x020A</span>
                </div>
                <h4 className="text-white text-sm font-semibold">Audit: Step Parsed</h4>
                <p className="text-gray-400 text-xs mt-1">
                  SUBJECT = deployment_id · HASH = SHA-256(deploy_id ‖ step_idx ‖ manifest_len ‖ SHA256(manifest))
                </p>
              </div>
            </div>
          </div>

          {/* Bridge note */}
          <div className="mt-6 bg-red-500/5 border border-red-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-400 font-mono text-xs font-bold">0x00FF</span>
                  <span className="text-white text-sm font-semibold">Bridge Discontinuity</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Emitted independently by EdalSyncBridge when ring saturation forces frame overwrites.
                  Not generated from command payloads — it signals data loss boundaries in the audit chain.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800/50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <Binary className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white">Transaction Encoder V2</span>
            <span className="text-gray-600 text-xs">Wire Codec Specification</span>
          </div>
          <div className="text-gray-600 text-xs">
            Sections 4.1 – 4.4 · Binary payload format documentation
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <Overview />
      <RelationshipDiagram />

      {allPayloads.map((spec, idx) => (
        <PayloadSection key={spec.id} spec={spec} index={idx} />
      ))}

      <Footer />
    </div>
  );
}
