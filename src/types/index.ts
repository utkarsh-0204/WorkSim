export interface AICharacter {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
  bio: string;
}

export interface ScenarioObjective {
  id: string;
  text: string;
  completed: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  category: 'Software Engineering' | 'Product' | 'Data' | 'Design' | 'Customer Support';
  role: string;
  difficulty: 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  situation: string;
  character: AICharacter;
  evaluationCriteria: string[];
  initialObjectives: ScenarioObjective[];
  initialSituationSummary: string[];
  initialMessage: string;
}

export interface Message {
  id: string;
  sender: 'ai' | 'user' | 'system';
  senderName: string;
  text: string;
  timestamp: string; // e.g. "10:01 AM"
  actionType?: string;
  metadata?: {
    isConsequence?: boolean;
    infoDiscovered?: string;
    decisionTag?: string;
  };
}

export interface EvaluationPoint {
  category: 'Problem Solving' | 'Communication' | 'Technical Reasoning' | 'Decision Making' | 'Proactiveness';
  score: number; // 0 - 10
  evidence: string;
  evidenceTimestamp?: string;
  quoteOrAction?: string;
  isPositive: boolean;
}

export interface SimulationReport {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  characterName: string;
  completedAt: string;
  durationMinutes: number;
  overallScore: number;
  decisionPathSummary: string;
  scores: {
    problemSolving: number;
    communication: number;
    technicalReasoning: number;
    decisionMaking: number;
    proactiveness: number;
  };
  rubricDetails: EvaluationPoint[];
  strengths: string[];
  areasToImprove: string[];
  nextAttemptAdvice: string;
  transcript: Message[];
}

export interface SimulationState {
  scenario: Scenario;
  currentStep: number;
  conversationHistory: Message[];
  userDecisions: Array<{
    timestamp: string;
    text: string;
    decisionType: string;
  }>;
  discoveredInformation: string[];
  objectives: ScenarioObjective[];
  isThinking: boolean;
  isCompleted: boolean;
  finalReport?: SimulationReport;
  elapsedSeconds: number;
}
