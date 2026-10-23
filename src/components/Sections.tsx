import { motion } from "framer-motion";
import ByteDiagram, { type ByteField } from "./ByteDiagram";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

/* ─── Field Table ─── */
function FieldTable({ fields }: { fields: ByteField[] }) {
  const total = fields.reduce((s, f) => s + f.bytes, 0);
  let offset = 0;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-900/80">
            <th className="text-left font-mono text-[10px] text-gray-500 uppercase tracking-wider px-3 py-2">Offset</th>
            <th className="text-left font-mono text-[10px] text-gray-500 uppercase tracking-wider px-3 py-2">Field</th>
            <th className="text-left font-mono text-[10px] text-gray-500 uppercase tracking-wider px-3 py-2">Size</th>
            <th className="text-left font-mono text-[10px] text-gray-500 uppercase tracking-wider px-3 py-2">Encoding</th>
            <th className="text-left font-mono text-[10px] text-gray-500 uppercase tracking-wider px-3 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((f, i) => {
            const curOffset = offset;
            offset += f.bytes;
            return (
              <tr key={f.name} className="border-t border-gray-800/40 hover:bg-gray-900/30 transition-colors">
                <td className="px-3 py-2 font-mono text-xs text-gray-500 whitespace-nowrap">
                  {curOffset}–{curOffset + f.bytes - 1}
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: f.color }} />
                    <span className="font-mono text-xs text-white font-medium">{f.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2 font-mono text-xs text-gray-400 whitespace-nowrap">
                  {f.bytes} B
                </td>
                <td className="px-3 py-2">
                  {f.encoding ? (
                    <span className="font-mono text-[10px] bg-gray-800/80 text-cyan-400 px-1.5 py-0.5 rounded">
                      {f.encoding}
                    </span>
                  ) : (
                    <span className="text-gray-600 text-xs">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-gray-400 max-w-xs">{f.description}</td>
              </tr>
            );
          })}
          <tr className="border-t border-gray-700/60 bg-gray-900/50">
            <td className="px-3 py-2 font-mono text-xs text-gray-500">0–{total - 1}</td>
            <td className="px-3 py-2 font-mono text-xs text-white font-semibold">TOTAL</td>
            <td className="px-3 py-2 font-mono text-xs text-white font-semibold">{total} B</td>
            <td className="px-3 py-2" />
            <td className="px-3 py-2 text-xs text-gray-500">Complete payload</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({
  id,
  opcode,
  title,
  subtitle,
  accent,
}: {
  id: string;
  opcode: string;
  title: string;
  subtitle: string;
  accent: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs bg-gray-800/80 text-gray-400 px-2 py-1 rounded border border-gray-700/50">
          §{id}
        </span>
        <span
          className="font-mono text-xs px-2 py-1 rounded border"
          style={{
            color: accent,
            borderColor: accent + "40",
            backgroundColor: accent + "10",
          }}
        >
          0x{opcode}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 text-sm sm:text-base max-w-3xl">{subtitle}</p>
    </div>
  );
}

/* ─── Hex Preview ─── */
function HexPreview({ data }: { data: string }) {
  const bytes = data.match(/.{1,2}/g) || [];
  return (
    <div className="bg-gray-950 border border-gray-800/50 rounded-lg p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
      <div className="flex gap-4">
        <div className="text-gray-600 select-none flex-shrink-0">
          {Array.from({ length: Math.ceil(bytes.length / 16) }, (_, i) => (
            <div key={i}>{(i * 16).toString(16).padStart(4, "0")}</div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          {bytes.map((b, i) => (
            <span key={i} className="text-cyan-400/80 hover:text-cyan-300 transition-colors cursor-default">
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hash Diagram ─── */
function HashDiagram({ label, inputs, output }: { label: string; inputs: string[]; output: string }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
      <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">{label}</div>
      <div className="flex flex-wrap items-center gap-2">
        {inputs.map((input, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-mono text-xs bg-gray-800 text-amber-400 px-2 py-1 rounded border border-gray-700/50">
              {input}
            </span>
            {i < inputs.length - 1 && (
              <span className="text-gray-600 text-xs font-mono">||</span>
            )}
          </div>
        ))}
        <span className="text-gray-500 mx-1">→</span>
        <span className="font-mono text-xs bg-emerald-950/50 text-emerald-400 px-2 py-1 rounded border border-emerald-800/30">
          {output}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   §4.1  Tool Registration (0x0101)
   ═══════════════════════════════════════════════ */
export function Section41() {
  const fields: ByteField[] = [
    {
      name: "tool_id",
      bytes: 16,
      color: "#3b82f6",
      description: "UUID identifying the tool being registered",
      encoding: "UUID v4",
      details: "128-bit universally unique identifier",
    },
    {
      name: "capability_mask",
      bytes: 4,
      color: "#8b5cf6",
      description: "Requested system permissions bitmask",
      encoding: "uint32 BE",
      details: "e.g. CAP_CONTAINER_SOCKET, CAP_EMIT_EDAL_RECORDS",
    },
    {
      name: "binary_digest",
      bytes: 32,
      color: "#06b6d4",
      description: "SHA-256 digest of the tool executable artifact",
      encoding: "SHA-256",
    },
    {
      name: "exec_cmd",
      bytes: 28,
      color: "#f59e0b",
      description: "UTF-8 encoded execution command string (0–28 bytes)",
      encoding: "UTF-8 var",
      details: "Variable length, zero-padded to 28 bytes",
    },
  ];

  return (
    <motion.section id="s41" className="scroll-mt-24" {...fadeUp}>
      <SectionHeader
        id="4.1"
        opcode="0101"
        title="Command Payload: Tool Registration"
        subtitle="Registers binary capabilities against the active HostCapabilityPolicy. This payload binds a tool identity (UUID) to a set of requested permissions and a verified executable digest."
        accent="#3b82f6"
      />

      <div className="space-y-6">
        <ByteDiagram fields={fields} title="Payload Layout — 80 bytes" />
        <FieldTable fields={fields} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
              Capability Flags
            </div>
            <div className="space-y-1.5">
              {[
                { flag: "CAP_CONTAINER_SOCKET", bit: "0x0001" },
                { flag: "CAP_EMIT_EDAL_RECORDS", bit: "0x0002" },
                { flag: "CAP_NETWORK_EGRESS", bit: "0x0004" },
                { flag: "CAP_FS_WRITE", bit: "0x0008" },
              ].map((c) => (
                <div key={c.flag} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-300">{c.flag}</span>
                  <span className="font-mono text-[10px] text-purple-400 bg-purple-950/30 px-1.5 py-0.5 rounded">
                    {c.bit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
              Example Hex Dump
            </div>
            <HexPreview data="a1b2c3d4e5f6478091a2b3c4d5e6f708cafec0de00000003e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8556e706d2f776f726c64000000000000000000000000000000000000000000000000000000" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   §4.2  Orchestration Step (0x0202)
   ═══════════════════════════════════════════════ */
export function Section42() {
  const fields: ByteField[] = [
    {
      name: "deployment_id",
      bytes: 16,
      color: "#10b981",
      description: "Pipeline identifier UUID for the deployment",
      encoding: "UUID v4",
    },
    {
      name: "step_index",
      bytes: 2,
      color: "#34d399",
      description: "Unsigned step index within the pipeline",
      encoding: "uint16 BE",
    },
    {
      name: "target_node_id",
      bytes: 32,
      color: "#06b6d4",
      description: "SHA-256 digest of the target execution node host",
      encoding: "SHA-256",
    },
    {
      name: "manifest_payload",
      bytes: 30,
      color: "#f59e0b",
      description: "Zero-copy manifest configuration slice (0–30 bytes)",
      encoding: "raw var",
      details: "Zero-copy; no intermediate allocation",
    },
  ];

  return (
    <motion.section id="s42" className="scroll-mt-24" {...fadeUp}>
      <SectionHeader
        id="4.2"
        opcode="0202"
        title="Command Payload: Orchestration Step"
        subtitle="Encapsulates step execution requests submitted to the agent loop. Each step targets a specific execution node within a deployment pipeline."
        accent="#10b981"
      />

      <div className="space-y-6">
        <ByteDiagram fields={fields} title="Payload Layout — 80 bytes" />
        <FieldTable fields={fields} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">
              Pipeline Flow
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {["Deploy Init", "Step 0x00", "Step 0x01", "Step 0x02", "Finalize"].map(
                (step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`px-2 py-1 rounded text-[10px] font-mono border ${
                        i === 2
                          ? "bg-emerald-950/50 border-emerald-700/50 text-emerald-400"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-400"
                      }`}
                    >
                      {step}
                    </div>
                    {i < 4 && <span className="text-gray-600 text-xs">→</span>}
                  </div>
                )
              )}
            </div>
            <p className="text-[10px] text-gray-600 mt-2 font-mono">
              step_index = 0x0001 highlighted
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
              Example Hex Dump
            </div>
            <HexPreview data="f47ac10b58cc4372a5670e02b2c3d47900017f3e3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d001e" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   §4.3  Evidence Payload Layout
   ═══════════════════════════════════════════════ */
export function Section43() {
  const [activeAudit, setActiveAudit] = useState<"010A" | "020A">("010A");

  const baseFields: ByteField[] = [
    {
      name: "PREVIOUS_HASH",
      bytes: 32,
      color: "#f97316",
      description: "Hash chaining link to the previous evidence record",
      encoding: "SHA-256",
    },
    {
      name: "SUBJECT_BYTES",
      bytes: 16,
      color: "#fb923c",
      description: "Subject identifier (tool_id or deployment_id)",
      encoding: "UUID / raw",
    },
    {
      name: "EVIDENCE_PAYLOAD_HASH",
      bytes: 32,
      color: "#fbbf24",
      description: "Integrity digest of the evidence payload contents",
      encoding: "SHA-256",
    },
  ];

  return (
    <motion.section id="s43" className="scroll-mt-24" {...fadeUp}>
      <SectionHeader
        id="4.3"
        opcode="010A / 020A"
        title="Evidence Payload Layout"
        subtitle="Audit records use a universal 80-byte fixed structure for evidence chaining. The inner payload is shared across all audit record types, ensuring uniform verification."
        accent="#f97316"
      />

      <div className="space-y-6">
        <ByteDiagram fields={baseFields} title="Universal Evidence Layout — 80 bytes (fixed)" />
        <FieldTable fields={baseFields} />

        {/* Audit type tabs */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-800/50">
            <button
              onClick={() => setActiveAudit("010A")}
              className={`flex-1 px-4 py-3 text-sm font-mono transition-colors ${
                activeAudit === "010A"
                  ? "text-orange-400 bg-orange-950/20 border-b-2 border-orange-500"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              §4.3.1 Tool Registered (0x010A)
            </button>
            <button
              onClick={() => setActiveAudit("020A")}
              className={`flex-1 px-4 py-3 text-sm font-mono transition-colors ${
                activeAudit === "020A"
                  ? "text-orange-400 bg-orange-950/20 border-b-2 border-orange-500"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              §4.3.2 Step Parsed (0x020A)
            </button>
          </div>

          <div className="p-5 space-y-4">
            {activeAudit === "010A" ? (
              <>
                <div className="text-sm text-gray-300">
                  <span className="font-mono text-orange-400">SUBJECT_BYTES</span> ={" "}
                  <span className="font-mono text-white">tool_id</span>{" "}
                  <span className="text-gray-500">(16 bytes)</span>
                </div>
                <HashDiagram
                  label="EVIDENCE_PAYLOAD_HASH derivation"
                  inputs={["tool_id", "capability_mask", "binary_digest"]}
                  output="SHA-256 → 32B"
                />
                <div className="bg-gray-950/50 border border-gray-800/30 rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-mono">
                    evidence_hash = SHA256( tool_id ‖ capability_mask ‖ binary_digest )
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-300">
                  <span className="font-mono text-orange-400">SUBJECT_BYTES</span> ={" "}
                  <span className="font-mono text-white">deployment_id</span>{" "}
                  <span className="text-gray-500">(16 bytes)</span>
                </div>
                <HashDiagram
                  label="EVIDENCE_PAYLOAD_HASH derivation"
                  inputs={[
                    "deployment_id",
                    "step_index",
                    "manifest_len",
                    "SHA256(manifest_payload)",
                  ]}
                  output="SHA-256 → 32B"
                />
                <div className="bg-gray-950/50 border border-gray-800/30 rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-mono">
                    evidence_hash = SHA256( deployment_id ‖ step_index ‖ manifest_len ‖
                    SHA256(manifest_payload) )
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   §4.4  Bridge Discontinuity Payload (0x00FF)
   ═══════════════════════════════════════════════ */
export function Section44() {
  const fields: ByteField[] = [
    {
      name: "dropped_count",
      bytes: 8,
      color: "#ec4899",
      description: "Big-endian counter of overwritten frames during ring saturation",
      encoding: "uint64 BE",
    },
    {
      name: "prev_tip_hash",
      bytes: 32,
      color: "#f472b6",
      description: "H_store tip hash prior to gap detection",
      encoding: "SHA-256",
      details: "Last known durable tip before discontinuity",
    },
    {
      name: "next_tip_hash",
      bytes: 32,
      color: "#a855f7",
      description: "Re-anchored H_ring tip hash from the ring buffer",
      encoding: "SHA-256",
      details: "New anchor point after ring buffer re-sync",
    },
  ];

  return (
    <motion.section id="s44" className="scroll-mt-24" {...fadeUp}>
      <SectionHeader
        id="4.4"
        opcode="00FF"
        title="Bridge Discontinuity Payload"
        subtitle="Emitted by EdalSyncBridge when ring saturation forces unread in-memory frames to be overwritten prior to durable persistence. This sentinel marks a gap in the evidence chain."
        accent="#ec4899"
      />

      <div className="space-y-6">
        <ByteDiagram fields={fields} title="Payload Layout — 72 bytes" />
        <FieldTable fields={fields} />

        {/* Ring buffer visualization */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">
            Ring Buffer Discontinuity Model
          </div>
          <div className="relative">
            {/* Ring visualization */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {Array.from({ length: 16 }, (_, i) => {
                const isDropped = i >= 5 && i <= 8;
                const isPrevTip = i === 4;
                const isNextTip = i === 9;
                return (
                  <div
                    key={i}
                    className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center font-mono text-[9px] border transition-all ${
                      isDropped
                        ? "bg-red-950/40 border-red-800/40 text-red-400 line-through"
                        : isPrevTip
                        ? "bg-pink-950/40 border-pink-600/50 text-pink-400"
                        : isNextTip
                        ? "bg-purple-950/40 border-purple-600/50 text-purple-400"
                        : "bg-gray-800/40 border-gray-700/40 text-gray-500"
                    }`}
                  >
                    {isDropped ? "✕" : i.toString(16).toUpperCase()}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-6 mt-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-pink-950/40 border border-pink-600/50" />
                <span className="text-[10px] font-mono text-pink-400">prev_tip_hash</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-red-950/40 border border-red-800/40" />
                <span className="text-[10px] font-mono text-red-400">dropped frames</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-purple-950/40 border border-purple-600/50" />
                <span className="text-[10px] font-mono text-purple-400">next_tip_hash</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
            Example Hex Dump
          </div>
          <HexPreview data="0000000000000004e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8557f3e3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b" />
        </div>
      </div>
    </motion.section>
  );
}
