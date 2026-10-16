import React from 'react';
import {
  ArrowLeft,
  Play,
  Clock,
  Award,
  CheckCircle2,
  User,
  ShieldAlert,
} from 'lucide-react';
import { Scenario } from '../types';

interface ScenarioBriefProps {
  scenario: Scenario;
  onStart: () => void;
  onBack: () => void;
}

const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

const DIFFICULTY_TONE: Record<string, string> = {
  Easy: 'text-accent-emerald',
  Foundational: 'text-accent-emerald',
  Intermediate: 'text-accent-amber',
  Advanced: 'text-accent-rose',
};

export const ScenarioBrief: React.FC<ScenarioBriefProps> = ({ scenario, onStart, onBack }) => {
  return (
    <div className="min-h-screen bg-background text-text-main py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-text-dim hover:text-text-main mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Scenarios
        </button>

        {/* Card Brief container */}
        <div className="rounded-lg border border-surface-border bg-surface overflow-hidden shadow-sm">

          {/* Header Banner */}
          <div className="p-8 sm:p-10 border-b border-surface-border bg-surface-subtle">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
              <span className="font-medium text-text-muted">
                {scenario.category}
              </span>
              <span className={`font-medium ${DIFFICULTY_TONE[scenario.difficulty] || 'text-text-dim'}`}>
                {scenario.difficulty}
              </span>
              <span className="text-text-dim flex items-center gap-1.5 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                {scenario.duration}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-main tracking-tight mb-3">
              {scenario.title}
            </h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              {scenario.description}
            </p>
          </div>

          <div className="p-8 sm:p-10 space-y-8">

            {/* Roles & Characters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="p-5 rounded-lg border border-surface-border bg-surface-subtle">
                <span className="text-xs text-text-dim block mb-3">
                  Your role
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-muted flex items-center justify-center text-text-main shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-main">{scenario.role}</div>
                    <div className="text-xs text-text-dim">Individual Contributor / Decision Maker</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-surface-border bg-surface-subtle">
                <span className="text-xs text-text-dim block mb-3">
                  AI character
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-muted flex items-center justify-center text-xs font-medium text-text-main shrink-0">
                    {initials(scenario.character.name)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-main">{scenario.character.name}</div>
                    <div className="text-xs text-text-dim">{scenario.character.role} · {scenario.character.department}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* SITUATION */}
            <div>
              <span className="text-xs text-text-dim block mb-2">
                Situation
              </span>
              <div className="p-5 rounded-lg border border-surface-border bg-background text-sm text-text-main leading-relaxed">
                “{scenario.situation}”
              </div>
            </div>

            {/* EVALUATION CRITERIA & OBJECTIVES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">

              {/* You will be evaluated on */}
              <div>
                <span className="text-xs text-text-dim flex items-center gap-1.5 mb-3">
                  <Award className="w-4 h-4 text-primary" />
                  You'll be evaluated on
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
                <span className="text-xs text-text-dim flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
                  Session objectives
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
            <div className="p-4 rounded-lg border border-surface-border bg-primary-muted flex items-center gap-3 text-xs text-text-main">
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-background bg-primary hover:bg-primary-hover shadow-sm transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-background" />
                <span>Start Simulation</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
