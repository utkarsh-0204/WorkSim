import React from 'react';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { Scenario } from '../types';

interface ScenarioBriefProps {
  scenario: Scenario;
  onStart: () => void;
  onBack: () => void;
}

export const ScenarioBrief: React.FC<ScenarioBriefProps> = ({ scenario, onStart, onBack }) => {
  return (
    <div className="min-h-screen bg-background text-text-main py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back navigation */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-text-dim hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Scenarios
        </button>

        {/* Card Brief container */}
        <div className="rounded-2xl border border-surface-border bg-surface overflow-hidden shadow-2xl">
          
          {/* Header Banner */}
          <div className="p-8 sm:p-10 border-b border-surface-border bg-gradient-to-b from-surface-subtle/80 to-surface">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-background border border-surface-border text-primary-light">
                {scenario.category}
              </span>
              <span className={`text-xs font-mono px-2.5 py-1 rounded ${
                scenario.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                scenario.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {scenario.difficulty}
              </span>
              <span className="text-xs font-mono text-text-dim flex items-center gap-1.5 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                {scenario.duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              {scenario.title}
            </h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              {scenario.description}
            </p>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            
            {/* Roles & Characters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-xl border border-surface-border bg-surface-subtle/50">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim block mb-3">
                  Your Role
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{scenario.role}</div>
                    <div className="text-xs text-text-dim">Individual Contributor / Decision Maker</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-surface-border bg-surface-subtle/50">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim block mb-3">
                  AI Character
                </span>
                <div className="flex items-center gap-3">
                  <img 
                    src={scenario.character.avatar} 
                    alt={scenario.character.name} 
                    className="w-10 h-10 rounded-full border border-surface-border object-cover" 
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{scenario.character.name}</div>
                    <div className="text-xs text-text-dim">{scenario.character.role} • {scenario.character.department}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* SITUATION */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim block mb-2">
                Situation
              </span>
              <div className="p-5 rounded-xl border border-surface-border bg-background/80 text-sm text-text-main leading-relaxed">
                “{scenario.situation}”
              </div>
            </div>

            {/* EVALUATION CRITERIA & OBJECTIVES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              
              {/* You will be evaluated on */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim flex items-center gap-1.5 mb-3">
                  <Award className="w-4 h-4 text-primary" />
                  You Will Be Evaluated On:
                </span>
                <ul className="space-y-2.5">
                  {scenario.evaluationCriteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Objectives */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
                  Session Objectives:
                </span>
                <ul className="space-y-2.5">
                  {scenario.initialObjectives.map(obj => (
                    <li key={obj.id} className="flex items-start gap-2.5 text-xs text-text-muted">
                      <div className="w-4 h-4 rounded-full border border-surface-border flex items-center justify-center shrink-0 text-text-dim">
                        ○
                      </div>
                      <span>{obj.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Assessment notice */}
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3 text-xs text-primary-light">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>
                Note: The simulator adapts dynamically to your real statements. Do not guess—systematic investigation and constructive communication are tracked in your debrief report.
              </span>
            </div>

            {/* Start Button */}
            <div className="pt-4 flex items-center justify-between border-t border-surface-border">
              <div className="text-xs text-text-dim">
                Evaluation begins immediately upon session start.
              </div>
              <button 
                onClick={onStart}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Simulation</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
