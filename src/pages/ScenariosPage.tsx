import React, { useState } from 'react';
import { Search, ChevronRight, Clock, Award, Users } from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';
import { Scenario } from '../types';

interface ScenariosPageProps {
  onNavigate: (path: string) => void;
}

const CATEGORIES = ['All', 'Software Engineering', 'Product', 'Data', 'Design', 'Customer Support'] as const;

export const ScenariosPage: React.FC<ScenariosPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredScenarios = SCENARIOS.filter(s => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.character.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-text-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Explore Scenarios
          </h1>
          <p className="text-base text-text-muted">
            Practise situations you may actually face at work. Choose an incident, roleplay with AI leaders, and get evaluated on hard evidence.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8 pb-6 border-b border-surface-border">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search scenarios, roles or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface text-text-muted border border-surface-border hover:text-white hover:bg-surface-subtle'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario: Scenario) => (
            <div 
              key={scenario.id}
              className="rounded-xl border border-surface-border bg-surface flex flex-col justify-between p-6 hover:border-surface-border/90 hover:bg-surface-subtle/40 transition-all group"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-primary-light border border-surface-border">
                    {scenario.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-text-dim">
                    <Clock className="w-3.5 h-3.5" />
                    {scenario.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary-light transition-colors">
                  {scenario.title}
                </h3>

                <div className="text-xs text-text-dim mb-3 font-mono">
                  Role: <span className="text-text-muted">{scenario.role}</span>
                </div>

                <p className="text-xs text-text-muted leading-relaxed mb-6">
                  {scenario.description}
                </p>
              </div>

              {/* Character & Action */}
              <div className="pt-4 border-t border-surface-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={scenario.character.avatar} 
                      alt={scenario.character.name} 
                      className="w-8 h-8 rounded-full border border-surface-border object-cover" 
                    />
                    <div>
                      <div className="text-xs font-medium text-white">{scenario.character.name}</div>
                      <div className="text-[10px] text-text-dim">{scenario.character.role}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    scenario.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    scenario.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>

                <button 
                  onClick={() => onNavigate(`/scenarios/${scenario.id}`)}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-surface-subtle border border-surface-border group-hover:bg-primary group-hover:border-primary transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Start Scenario</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredScenarios.length === 0 && (
          <div className="text-center py-16 border border-surface-border rounded-xl bg-surface/30">
            <p className="text-sm text-text-muted">No scenarios matched your filter criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
};
