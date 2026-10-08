import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Target,
  BarChart2
} from 'lucide-react';
import { getProgressData } from '../utils/storage';

interface ProgressPageProps {
  onNavigate: (path: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ onNavigate }) => {
  const progress = getProgressData();

  const skillBars = [
    { label: 'Problem Solving', score: progress.skills.problemSolving, color: 'bg-emerald-500' },
    { label: 'Communication', score: progress.skills.communication, color: 'bg-primary' },
    { label: 'Technical Reasoning', score: progress.skills.technicalReasoning, color: 'bg-accent-purple' },
    { label: 'Decision Making', score: progress.skills.decisionMaking, color: 'bg-accent-amber' },
    { label: 'Proactiveness', score: progress.skills.proactiveness, color: 'bg-accent-teal' },
  ];

  return (
    <div className="min-h-screen bg-background text-text-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary">Analytics & Growth</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            My Progress
          </h1>
          <p className="text-sm text-text-muted mt-2">
            Track your performance across realistic workplace scenarios and measure growth on standardized criteria.
          </p>
        </div>

        {/* 3 TOP METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="rounded-xl border border-surface-border bg-surface p-6 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
              Scenarios Completed
            </span>
            <div className="text-4xl font-black font-mono text-white">
              {progress.scenariosCompleted}
            </div>
            <div className="text-xs text-text-muted flex items-center gap-1.5 pt-1">
              <span className="text-emerald-400 font-semibold">+2</span> this week
            </div>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface p-6 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
              Average Score
            </span>
            <div className="text-4xl font-black font-mono text-emerald-400">
              {progress.averageScore} <span className="text-lg text-text-dim font-normal">/ 10</span>
            </div>
            <div className="text-xs text-text-muted flex items-center gap-1.5 pt-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>+1.4 pts overall trajectory</span>
            </div>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface p-6 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
              Hours Practised
            </span>
            <div className="text-4xl font-black font-mono text-white">
              {progress.hoursPractised} <span className="text-lg text-text-dim font-normal">hrs</span>
            </div>
            <div className="text-xs text-text-muted flex items-center gap-1.5 pt-1">
              <span>Realistic workplace simulations</span>
            </div>
          </div>

        </div>

        {/* SCORE PROGRESSION CHART (CSS/SVG chart) */}
        <div className="rounded-2xl border border-surface-border bg-surface p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Score Progression</h2>
              <p className="text-xs text-text-muted">Progression across your recent simulation attempts.</p>
            </div>
            <span className="text-xs font-mono text-accent-emerald bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              Upward Growth Trend
            </span>
          </div>

          {/* Graph Visualization */}
          <div className="pt-6 pb-2">
            <div className="h-48 flex items-end justify-between gap-4 border-b border-surface-border px-4 pb-2">
              {progress.recentAttempts.map((attempt, idx) => {
                const heightPercent = (attempt.score / 10) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-mono text-white bg-surface-subtle border border-surface-border px-2 py-0.5 rounded shadow">
                      {attempt.score.toFixed(1)}/10
                    </div>
                    <div className="w-full max-w-[48px] bg-surface-subtle rounded-t-lg overflow-hidden h-40 flex items-end">
                      <div 
                        className="w-full bg-primary group-hover:bg-primary-light transition-all rounded-t-lg duration-500"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-mono text-white font-semibold">Attempt {attempt.attemptNumber}</div>
                      <div className="text-[10px] text-text-dim truncate max-w-[100px]">{attempt.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs text-text-muted">
            {progress.recentAttempts.map((a, i) => (
              <div key={i} className="p-3 bg-surface-subtle rounded-lg border border-surface-border/50">
                <span className="font-mono text-text-dim text-[11px] block">Attempt {a.attemptNumber}</span>
                <span className="text-white font-medium">{a.score} / 10</span>
                <div className="text-[11px] text-text-dim truncate mt-0.5">{a.scenarioTitle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILL IMPROVEMENT BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="rounded-2xl border border-surface-border bg-surface p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-semibold text-white">Skill Matrix Breakdown</h2>
            <p className="text-xs text-text-muted">
              Evaluated across Problem Solving, Technical Reasoning, and Stakeholder Communication.
            </p>

            <div className="space-y-4 pt-2">
              {skillBars.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-white">{skill.label}</span>
                    <span className="font-mono text-white font-bold">{skill.score.toFixed(1)} / 10</span>
                  </div>
                  <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden border border-surface-border/50">
                    <div 
                      className={`h-full rounded-full ${skill.color}`} 
                      style={{ width: `${skill.score * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI SCENARIO RECOMMENDATION */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-surface to-primary/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <Target className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  Personalized Recommendation
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Try "{progress.recommendation.scenarioTitle}" Next
              </h3>

              <p className="text-xs text-text-muted leading-relaxed">
                {progress.recommendation.reason}
              </p>
            </div>

            <button
              onClick={() => onNavigate(`/scenarios/${progress.recommendation.scenarioId}`)}
              className="w-full py-3 px-4 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
            >
              <span>Start Recommended Scenario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
