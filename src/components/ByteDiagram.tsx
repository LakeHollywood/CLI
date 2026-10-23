import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ByteField {
  name: string;
  bytes: number;
  color: string;
  description: string;
  details?: string;
  encoding?: string;
}

interface ByteDiagramProps {
  fields: ByteField[];
  title?: string;
  totalBytes?: number;
  showHoverDetails?: boolean;
}

export default function ByteDiagram({
  fields,
  title,
  totalBytes,
  showHoverDetails = true,
}: ByteDiagramProps) {
  const [activeField, setActiveField] = useState<number | null>(null);
  const total = totalBytes ?? fields.reduce((s, f) => s + f.bytes, 0);

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gray-800" />
          <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            {title}
          </h4>
          <div className="h-px flex-1 bg-gray-800" />
        </div>
      )}

      {/* Byte bar */}
      <div className="relative">
        <div className="flex rounded-lg overflow-hidden border border-gray-700/50 h-14 sm:h-16">
          {fields.map((field, i) => {
            const pct = (field.bytes / total) * 100;
            const isActive = activeField === i;
            return (
              <motion.div
                key={field.name}
                className="relative flex items-center justify-center cursor-pointer overflow-hidden group"
                style={{
                  width: `${pct}%`,
                  minWidth: field.bytes >= 2 ? "2rem" : "1rem",
                  backgroundColor: field.color,
                  opacity: activeField !== null && !isActive ? 0.4 : 1,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={() => setActiveField(i)}
                onMouseLeave={() => setActiveField(null)}
                whileHover={{ filter: "brightness(1.2)" }}
              >
                {/* Byte grid overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent ${Math.max(100 / field.bytes, 2)}%, rgba(0,0,0,0.3) ${Math.max(100 / field.bytes, 2)}%, rgba(0,0,0,0.3) calc(${Math.max(100 / field.bytes, 2)}% + 1px))`,
                  }}
                />
                <div className="relative z-10 text-center px-1">
                  <div className="text-[10px] sm:text-xs font-mono text-white/90 font-bold truncate">
                    {field.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-white/60">
                    {field.bytes}B
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="byte-active"
                    className="absolute inset-0 border-2 border-white/50 rounded-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Byte offset markers */}
        <div className="flex mt-1">
          {fields.reduce<{ offset: number; elements: React.ReactNode[] }>(
            (acc, field, i) => {
              acc.elements.push(
                <div
                  key={i}
                  className="text-[9px] font-mono text-gray-600"
                  style={{
                    width: `${(field.bytes / total) * 100}%`,
                    minWidth: field.bytes >= 2 ? "2rem" : "1rem",
                  }}
                >
                  +{acc.offset}
                </div>
              );
              acc.offset += field.bytes;
              return acc;
            },
            { offset: 0, elements: [] }
          ).elements}
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-gray-600">
            +{total}B (end)
          </span>
        </div>
      </div>

      {/* Hover detail tooltip */}
      {showHoverDetails && (
        <AnimatePresence mode="wait">
          {activeField !== null && (
            <motion.div
              key={activeField}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="bg-gray-900 border border-gray-700/50 rounded-lg p-3 flex items-start gap-3"
            >
              <div
                className="w-3 h-3 rounded-sm mt-0.5 flex-shrink-0"
                style={{ backgroundColor: fields[activeField].color }}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-sm text-white font-semibold">
                    {fields[activeField].name}
                  </span>
                  <span className="font-mono text-xs text-gray-500">
                    {fields[activeField].bytes} byte{fields[activeField].bytes !== 1 ? "s" : ""}
                  </span>
                  {fields[activeField].encoding && (
                    <span className="font-mono text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">
                      {fields[activeField].encoding}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {fields[activeField].description}
                </p>
                {fields[activeField].details && (
                  <p className="text-xs text-gray-500 mt-0.5 font-mono">
                    {fields[activeField].details}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
