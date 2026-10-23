import type React from "react";
import { Cpu, Workflow, Shield, FileCode2, Activity, AlertTriangle } from "lucide-react";

/* ------------------------------------------------------------------ */

export interface FieldDef {
  name: string;
  bytes: number;
  description: string;
  color: string;
  detail?: string;
}

export interface PayloadSpec {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  totalBytes: string;
  fields: FieldDef[];
  notes?: string[];
}

/* ------------------------------------------------------------------ */
/*  Payload data                                                       */
/* ------------------------------------------------------------------ */

const payload41: PayloadSpec = {
  id: "4.1",
  code: "0x0101",
  title: "Tool Registration",
  subtitle: "Register binary capabilities against the active HostCapabilityPolicy",
  icon: Cpu,
  totalBytes: "52–80",
  fields: [
    {
      name: "tool_id",
      bytes: 16,
      description: "UUID identifying the tool",
      color: "from-blue-500 to-blue-600",
      detail: "A standard 16-byte UUID (RFC 4122) that uniquely identifies the tool being registered.",
    },
    {
      name: "capability_mask",
      bytes: 4,
      description: "Big-endian u32 permission bitmask",
      color: "from-amber-500 to-orange-500",
      detail: "4-byte big-endian unsigned integer. Each bit represents a requested system permission (e.g., CAP_CONTAINER_SOCKET, CAP_EMIT_EDAL_RECORDS).",
    },
    {
      name: "binary_digest",
      bytes: 32,
      description: "SHA-256 of the tool executable",
      color: "from-emerald-500 to-green-600",
      detail: "32-byte SHA-256 hash of the tool executable artifact, used for integrity verification at registration time.",
    },
    {
      name: "exec_cmd",
      bytes: 0,
      description: "UTF-8 command string (0–28 B)",
      color: "from-purple-500 to-violet-600",
      detail: "Variable-length (0–28 bytes) UTF-8 encoded execution command string. May be empty if the tool is invoked via its tool_id alone.",
    },
  ],
  notes: [
    "capability_mask is encoded in big-endian byte order.",
    "exec_cmd is variable-length; total payload size ranges from 52 to 80 bytes.",
    "binary_digest must match the artifact uploaded to the registry before registration is accepted.",
  ],
};

const payload42: PayloadSpec = {
  id: "4.2",
  code: "0x0202",
  title: "Orchestration Step",
  subtitle: "Encapsulates step execution requests submitted to the agent loop",
  icon: Workflow,
  totalBytes: "50–80",
  fields: [
    {
      name: "deployment_id",
      bytes: 16,
      description: "Pipeline identifier UUID",
      color: "from-cyan-500 to-blue-500",
      detail: "16-byte UUID identifying the deployment pipeline this step belongs to.",
    },
    {
      name: "step_index",
      bytes: 2,
      description: "Big-endian u16 step ordinal",
      color: "from-yellow-500 to-amber-500",
      detail: "2-byte big-endian unsigned integer representing the ordinal position of this step within the pipeline.",
    },
    {
      name: "target_node_id",
      bytes: 32,
      description: "SHA-256 of target node host",
      color: "from-rose-500 to-pink-500",
      detail: "32-byte SHA-256 digest of the target execution node's host identifier, binding the step to a specific node.",
    },
    {
      name: "manifest_payload",
      bytes: 0,
      description: "Zero-copy config slice (0–30 B)",
      color: "from-indigo-500 to-purple-500",
      detail: "Variable-length (0–30 bytes) zero-copy manifest configuration slice. Provides step-specific configuration without requiring a full copy.",
    },
  ],
  notes: [
    "step_index is a 2-byte big-endian unsigned integer (max 65 535 steps per pipeline).",
    "manifest_payload uses zero-copy semantics — the buffer is referenced, not duplicated.",
    "target_node_id binds execution to a specific host for audit traceability.",
  ],
};

const payload43: PayloadSpec = {
  id: "4.3",
  code: "0x010A / 0x020A",
  title: "Evidence Payload Layout",
  subtitle: "Universal 80-byte fixed structure for audit records",
  icon: Shield,
  totalBytes: "80 (fixed)",
  fields: [
    {
      name: "PREVIOUS_HASH",
      bytes: 32,
      description: "Hash chaining link",
      color: "from-slate-400 to-slate-500",
      detail: "32-byte hash of the previous evidence record, forming a tamper-evident chain across the audit log.",
    },
    {
      name: "SUBJECT_BYTES",
      bytes: 16,
      description: "Subject identifier (16 B)",
      color: "from-teal-500 to-cyan-500",
      detail: "16-byte subject identifier. For 0x010A this is tool_id; for 0x020A this is deployment_id.",
    },
    {
      name: "EVIDENCE_PAYLOAD_HASH",
      bytes: 32,
      description: "Digest of the evidence content",
      color: "from-orange-500 to-red-500",
      detail: "32-byte SHA-256 digest of the evidence payload fields. Computation differs between 0x010A and 0x020A sub-types.",
    },
  ],
  notes: [
    "This is a universal fixed-size layout shared by audit record types 0x010A and 0x020A.",
    "PREVIOUS_HASH creates a hash-chained audit trail — altering any record invalidates all subsequent records.",
    "Total evidence payload is always exactly 80 bytes.",
  ],
};

const payload431: PayloadSpec = {
  id: "4.3.1",
  code: "0x010A",
  title: "Audit: Tool Registered",
  subtitle: "Evidence record emitted when a tool is registered",
  icon: FileCode2,
  totalBytes: "80 (fixed)",
  fields: [
    {
      name: "PREVIOUS_HASH",
      bytes: 32,
      description: "Hash chain link",
      color: "from-slate-400 to-slate-500",
      detail: "32-byte hash of the preceding evidence record in the audit chain.",
    },
    {
      name: "tool_id",
      bytes: 16,
      description: "SUBJECT_BYTES = tool_id",
      color: "from-blue-500 to-blue-600",
      detail: "The 16-byte tool_id UUID from the original Tool Registration payload, used here as the SUBJECT_BYTES field.",
    },
    {
      name: "EVIDENCE_PAYLOAD_HASH",
      bytes: 32,
      description: "SHA-256(tool_id ‖ cap_mask ‖ bin_digest)",
      color: "from-orange-500 to-red-500",
      detail: "SHA-256 digest computed over the concatenation: tool_id (16B) || capability_mask (4B) || binary_digest (32B) = 52 bytes input.",
    },
  ],
  notes: [
    "SUBJECT_BYTES is populated with tool_id (16 bytes) from the Tool Registration payload.",
    "EVIDENCE_PAYLOAD_HASH = SHA-256(tool_id ‖ capability_mask ‖ binary_digest).",
    "This binds the audit record to the exact registration parameters.",
  ],
};

const payload432: PayloadSpec = {
  id: "4.3.2",
  code: "0x020A",
  title: "Audit: Step Parsed",
  subtitle: "Evidence record emitted when an orchestration step is parsed",
  icon: Activity,
  totalBytes: "80 (fixed)",
  fields: [
    {
      name: "PREVIOUS_HASH",
      bytes: 32,
      description: "Hash chain link",
      color: "from-slate-400 to-slate-500",
      detail: "32-byte hash of the preceding evidence record in the audit chain.",
    },
    {
      name: "deployment_id",
      bytes: 16,
      description: "SUBJECT_BYTES = deployment_id",
      color: "from-cyan-500 to-blue-500",
      detail: "The 16-byte deployment_id UUID from the Orchestration Step payload, used here as the SUBJECT_BYTES field.",
    },
    {
      name: "EVIDENCE_PAYLOAD_HASH",
      bytes: 32,
      description: "SHA-256(deploy_id ‖ step_idx ‖ manifest_len ‖ SHA256(manifest))",
      color: "from-orange-500 to-red-500",
      detail: "SHA-256 digest computed over: deployment_id (16B) || step_index (2B) || manifest_len (varint) || SHA-256(manifest_payload) (32B).",
    },
  ],
  notes: [
    "SUBJECT_BYTES is populated with deployment_id (16 bytes) from the Orchestration Step payload.",
    "EVIDENCE_PAYLOAD_HASH = SHA-256(deployment_id ‖ step_index ‖ manifest_len ‖ SHA256(manifest_payload)).",
    "The nested SHA-256 of manifest_payload allows verification without retaining the full manifest.",
  ],
};

const payload44: PayloadSpec = {
  id: "4.4",
  code: "0x00FF",
  title: "Bridge Discontinuity",
  subtitle: "Emitted when ring saturation forces frame overwrites before durable persistence",
  icon: AlertTriangle,
  totalBytes: "72",
  fields: [
    {
      name: "dropped_count",
      bytes: 8,
      description: "Big-endian u64 overwritten frame count",
      color: "from-red-500 to-rose-600",
      detail: "8-byte big-endian unsigned 64-bit integer counting the number of in-memory frames that were overwritten before they could be durably persisted.",
    },
    {
      name: "prev_tip_hash",
      bytes: 32,
      description: "H_store tip hash before gap",
      color: "from-gray-500 to-slate-500",
      detail: "32-byte H_store tip hash captured immediately prior to gap detection. Represents the last known-good state before data loss.",
    },
    {
      name: "next_tip_hash",
      bytes: 32,
      description: "Re-anchored H_ring tip hash",
      color: "from-amber-500 to-yellow-500",
      detail: "32-byte re-anchored H_ring tip hash from the ring buffer after the discontinuity. Allows consumers to re-sync from the new anchor point.",
    },
  ],
  notes: [
    "Emitted by EdalSyncBridge when ring buffer saturation forces overwrites.",
    "dropped_count indicates how many frames were lost — critical for gap detection.",
    "prev_tip_hash and next_tip_hash together define the discontinuity boundary for consumers.",
    "This payload type (0x00FF) is reserved exclusively for bridge-layer discontinuity signaling.",
  ],
};

export const allPayloads: PayloadSpec[] = [payload41, payload42, payload43, payload431, payload432, payload44];
