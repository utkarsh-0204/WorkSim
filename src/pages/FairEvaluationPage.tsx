import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  Target, 
  Search, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface FairEvaluationPageProps {
  onNavigate: (path: string) => void;
}

export const FairEvaluationPage: React.FC<FairEvaluationPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background text-text-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Transparent Rubric Framework
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How Are You Evaluated?
          </h1>
          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            WorkSim is designed around fair, evidence-based assessment. You are judged on what you actually do, your systematic technical reasoning, and the consequences of your decisions—never on buzzwords or presentation trivia.
          </p>
        </div>

        {/* 4 CORE PRINCIPLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-xl border border-surface-border bg-surface space-y-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-semibold text-white">Predefined, Grounded Rubrics</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Every scenario evaluates five transparent dimensions: Problem Solving, Communication, Technical Reasoning, Decision Making, and Proactiveness. The rubrics are calibrated against standard engineering ladder expectations.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-surface-border bg-surface space-y-3">
            <div className="w-8 h-8 rounded-lg bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-accent-emerald font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-semibold text-white">Every Score Requires Evidence</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              No black-box numerical scores. Every evaluation line item in your debrief links directly to a timestamped quote or action in your session transcript, proving exactly why you earned that score.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-surface-border bg-surface space-y-3">
            <div className="w-8 h-8 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-semibold text-white">No Vocabulary or Fluff Penalties</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Using long sentences or corporate jargon does not inflate scores. WorkSim rewards direct, structured decision-making: inspecting logs, isolating failure domains, protecting data integrity, and communicating risk honestly.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-surface-border bg-surface space-y-3">
            <div className="w-8 h-8 rounded-lg bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber font-bold text-sm">
              04
            </div>
            <h3 className="text-base font-semibold text-white">Adaptive Decision Trees</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Decisions yield realistic consequences. A hasty server reboot without checking database locks triggers a second outage; checking logs isolates the root cause. You are measured on how you handle consequences.
            </p>
          </div>

        </div>

        {/* COMPARISON TABLE: WHAT IS REWARDED VS PENALIZED */}
        <div className="rounded-2xl border border-surface-border bg-surface overflow-hidden">
          <div className="p-6 border-b border-surface-border bg-surface-subtle">
            <h3 className="text-base font-semibold text-white">Behavioral Scoring Matrix</h3>
            <p className="text-xs text-text-muted mt-1">Understanding the difference between high-impact engineering and passive chat.</p>
          </div>

          <div className="divide-y divide-surface-border">
            
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  What the Simulator Rewards
                </div>
                <ul className="text-xs text-text-muted space-y-1.5 list-disc pl-5">
                  <li>Formulating a clear diagnostic hypothesis before taking destructive steps</li>
                  <li>Inquiring about recent deploys, configuration changes, or metrics anomalies</li>
                  <li>Proposing multi-phase mitigation plans that safeguard customer transactions</li>
                  <li>Providing transparent status updates to cross-functional teams</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                  <XCircle className="w-4 h-4" />
                  What Lowers Performance Scores
                </div>
                <ul className="text-xs text-text-muted space-y-1.5 list-disc pl-5">
                  <li>Speculative restarting of production clusters without gathering logs</li>
                  <li>Agreeing immediately to impossible deadlines without flagging risks</li>
                  <li>Condescending code review tone or dismissing teammate inputs</li>
                  <li>Ignoring data loss risks or leaving orphan connections running</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('/scenarios/prod-incident')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
          >
            <span>Practice Production Incident Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
