import { SimulationReport } from '../types';

export interface UserProgressData {
  scenariosCompleted: number;
  averageScore: number;
  hoursPractised: number;
  recentAttempts: Array<{
    attemptNumber: number;
    scenarioTitle: string;
    score: number;
    date: string;
  }>;
  skills: {
    problemSolving: number;
    communication: number;
    technicalReasoning: number;
    decisionMaking: number;
    proactiveness: number;
  };
  recommendation: {
    scenarioId: string;
    scenarioTitle: string;
    reason: string;
  };
}

const STORAGE_KEY_REPORTS = 'worksim_reports';
const STORAGE_KEY_PROGRESS = 'worksim_progress';

export const initialProgressData: UserProgressData = {
  scenariosCompleted: 5,
  averageScore: 8.2,
  hoursPractised: 12,
  recentAttempts: [
    { attemptNumber: 1, scenarioTitle: 'Production Incident (Initial)', score: 6.2, date: 'Oct 01' },
    { attemptNumber: 2, scenarioTitle: 'Code Review Discussion', score: 7.0, date: 'Oct 03' },
    { attemptNumber: 3, scenarioTitle: 'Client Requirement Discussion', score: 7.8, date: 'Oct 05' },
    { attemptNumber: 4, scenarioTitle: 'Production Incident (Refined)', score: 8.2, date: 'Oct 07' },
  ],
  skills: {
    problemSolving: 8.4,
    communication: 8.1,
    technicalReasoning: 8.5,
    decisionMaking: 7.8,
    proactiveness: 8.0,
  },
  recommendation: {
    scenarioId: 'client-scope',
    scenarioTitle: 'Client Requirement Discussion',
    reason: 'Your technical reasoning is exceptionally strong (8.5/10). Practising communication-heavy client negotiation scenarios will balance your leadership readiness.'
  }
};

export const getSavedReports = (): Record<string, SimulationReport> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveReport = (report: SimulationReport) => {
  try {
    const reports = getSavedReports();
    reports[report.id] = report;
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));

    // Update progress
    const progress = getProgressData();
    progress.scenariosCompleted += 1;
    progress.recentAttempts.push({
      attemptNumber: progress.recentAttempts.length + 1,
      scenarioTitle: report.scenarioTitle,
      score: report.overallScore,
      date: 'Today'
    });
    // Recompute average
    const totalScore = progress.recentAttempts.reduce((acc, a) => acc + a.score, 0);
    progress.averageScore = Number((totalScore / progress.recentAttempts.length).toFixed(1));
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save report:', e);
  }
};

export const getProgressData = (): UserProgressData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return raw ? JSON.parse(raw) : initialProgressData;
  } catch {
    return initialProgressData;
  }
};
