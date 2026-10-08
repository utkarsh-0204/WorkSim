import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface StickyBoardSectionProps {
  onNavigate?: (path: string) => void;
}

export const StickyBoardSection: React.FC<StickyBoardSectionProps> = ({ onNavigate }) => {
  const [hoveredNote, setHoveredNote] = useState<number | null>(null);

  return (
    <section 
      aria-label="Behind the scenes: core scenarios and evaluation"
      className="relative py-20 md:py-24 border-b border-surface-border bg-[#0B0D11] overflow-hidden"
    >
      {/* Restrained dark workshop background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle, direct header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-wider text-text-dim font-medium mb-1.5">
            Planning Notes
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            The core situations WorkSim simulates
          </h2>
          <p className="mt-2 text-sm text-text-muted leading-relaxed">
            Real team challenges, actual conversations, and concrete evidence rather than automated multiple-choice tests.
          </p>
        </div>

        {/* 4 realistic sticky notes with natural overlap and slight imperfect rotations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

          {/* NOTE 1: Production Incident (Soft Muted Amber/Gold Paper) */}
          <div 
            onMouseEnter={() => setHoveredNote(1)}
            onMouseLeave={() => setHoveredNote(null)}
            className="group relative flex flex-col justify-between rounded-lg p-5 transition-all duration-200 ease-out cursor-default select-none
              bg-[#1E1B14] text-neutral-200 border border-amber-900/40
              shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]
              hover:-translate-y-1 hover:rotate-0 rotate-[-1.2deg]"
            style={{ transformOrigin: 'top center' }}
          >
            {/* Small subtle tape strip */}
            <div 
              aria-hidden="true" 
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/10 border border-white/10 shadow-sm rounded-sm rotate-[-0.5deg]"
            />

            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-950/80">
                <span className="text-[11px] font-mono text-amber-400/90 font-medium">01 • OUTAGE</span>
                <span className="text-[11px] text-amber-300/60">P0 Severity</span>
              </div>

              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                Production Incident
              </h3>

              <p className="text-xs text-neutral-300/90 leading-relaxed italic mb-3">
                “Production is down and users cannot log in. What do you check first?”
              </p>

              <div className="text-[11px] text-neutral-400 space-y-1">
                <div>• Investigate server telemetry</div>
                <div>• Communicate status to Priya</div>
                <div>• Mitigate pool exhaustion</div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-amber-950/80 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Engineering Manager</span>
              <span className="text-amber-300/80 font-mono">15 min</span>
            </div>
          </div>

          {/* NOTE 2: Demanding Client (Muted Coral/Sand Paper) */}
          <div 
            onMouseEnter={() => setHoveredNote(2)}
            onMouseLeave={() => setHoveredNote(null)}
            className="group relative flex flex-col justify-between rounded-lg p-5 transition-all duration-200 ease-out cursor-default select-none
              bg-[#1F181A] text-neutral-200 border border-rose-950/50
              shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]
              hover:-translate-y-1 hover:rotate-0 rotate-[1deg]"
            style={{ transformOrigin: 'top center' }}
          >
            {/* Small pushpin accent */}
            <div 
              aria-hidden="true" 
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-neutral-400/80 border border-neutral-300/40 shadow-sm"
            />

            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-rose-950/80">
                <span className="text-[11px] font-mono text-rose-300/90 font-medium">02 • CLIENT</span>
                <span className="text-[11px] text-rose-300/60">Escalation</span>
              </div>

              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                Difficult Client
              </h3>

              <p className="text-xs text-neutral-300/90 leading-relaxed italic mb-3">
                “The milestone is late. Walk me through exactly what happened.”
              </p>

              <div className="text-[11px] text-neutral-400 space-y-1">
                <div>• Explain blockers without excuses</div>
                <div>• Re-align deliverable scope</div>
                <div>• Provide firm revised dates</div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-rose-950/80 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Sarah Jenkins (Client)</span>
              <span className="text-rose-300/80 font-mono">12 min</span>
            </div>
          </div>

          {/* NOTE 3: Code Review (Subtle Lavender/Slate Paper) */}
          <div 
            onMouseEnter={() => setHoveredNote(3)}
            onMouseLeave={() => setHoveredNote(null)}
            className="group relative flex flex-col justify-between rounded-lg p-5 transition-all duration-200 ease-out cursor-default select-none
              bg-[#171922] text-neutral-200 border border-slate-800
              shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]
              hover:-translate-y-1 hover:rotate-0 rotate-[-0.8deg]"
            style={{ transformOrigin: 'top center' }}
          >
            {/* Tape accent */}
            <div 
              aria-hidden="true" 
              className="absolute -top-2.5 left-8 w-14 h-4 bg-white/10 border border-white/10 shadow-sm rounded-sm rotate-[-2deg]"
            />

            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                <span className="text-[11px] font-mono text-indigo-300/90 font-medium">03 • TECHNICAL</span>
                <span className="text-[11px] text-indigo-300/60">PR Discussion</span>
              </div>

              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                Code Review
              </h3>

              <p className="text-xs text-neutral-300/90 leading-relaxed italic mb-3">
                “Your reviewer disagrees with your architectural approach.”
              </p>

              <div className="text-[11px] text-neutral-400 space-y-1">
                <div>• Defend trade-offs with data</div>
                <div>• Accept valid technical criticism</div>
                <div>• Maintain team trust</div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Senior Staff Engineer</span>
              <span className="text-indigo-300/80 font-mono">10 min</span>
            </div>
          </div>

          {/* NOTE 4: Evidence-Based Debrief (Muted Olive/Green Paper) */}
          <div 
            onMouseEnter={() => setHoveredNote(4)}
            onMouseLeave={() => setHoveredNote(null)}
            className="group relative flex flex-col justify-between rounded-lg p-5 transition-all duration-200 ease-out cursor-default select-none
              bg-[#151D18] text-neutral-200 border border-emerald-950/60
              shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]
              hover:-translate-y-1 hover:rotate-0 rotate-[1.3deg]"
            style={{ transformOrigin: 'top center' }}
          >
            {/* Small pushpin accent */}
            <div 
              aria-hidden="true" 
              className="absolute -top-2 right-8 w-3.5 h-3.5 rounded-full bg-neutral-400/80 border border-neutral-300/40 shadow-sm"
            />

            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-950/80">
                <span className="text-[11px] font-mono text-emerald-400/90 font-medium">04 • DEBRIEF</span>
                <span className="text-[11px] text-emerald-300/60">Evaluation</span>
              </div>

              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                Evidence-Based Feedback
              </h3>

              <p className="text-xs text-neutral-300/90 leading-relaxed mb-3">
                Every score is anchored to exact quotes from your session:
              </p>

              <div className="text-[11px] text-neutral-400 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>Communication</span>
                  <span className="text-emerald-400 font-mono">8.4 / 10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ownership</span>
                  <span className="text-emerald-400 font-mono">8.7 / 10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Decision Making</span>
                  <span className="text-emerald-400 font-mono">7.6 / 10</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-emerald-950/80">
              <span className="text-[11px] text-emerald-300/90 italic block">
                “Not just a score. Here's why.”
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
