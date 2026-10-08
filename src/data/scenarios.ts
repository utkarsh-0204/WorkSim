import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'prod-incident',
    title: 'Production Incident',
    category: 'Software Engineering',
    role: 'Software Engineer',
    difficulty: 'Intermediate',
    duration: '20–30 min',
    description: 'Your production server is down and users cannot log in. Investigate the incident, mitigate the outage, and decide what to do.',
    situation: 'Your company’s primary authentication and API gateway cluster is failing health checks. 504 gateway errors are spiking, and enterprise clients are unable to log in. The incident began roughly 10 minutes ago.',
    character: {
      id: 'priya-sharma',
      name: 'Priya Sharma',
      role: 'Engineering Manager',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256',
      department: 'Platform Engineering',
      bio: 'Pragmatic engineering manager with 10+ years leading platform resilience. Values systematic debugging over hasty guesses.'
    },
    evaluationCriteria: [
      'Problem Solving (structured investigation vs guesswork)',
      'Communication (clear status and transparent risk communication)',
      'Technical Reasoning (identifying root causes in distributed systems)',
      'Decision Making (safeguarding uptime vs root cause preservation)',
      'Proactiveness (post-mortem plans & preventative measures)'
    ],
    initialObjectives: [
      { id: 'obj-1', text: 'Understand the issue & isolate error domain', completed: false },
      { id: 'obj-2', text: 'Inspect telemetry or recent changes', completed: false },
      { id: 'obj-3', text: 'Take appropriate mitigation / action', completed: false },
      { id: 'obj-4', text: 'Communicate clearly to leadership', completed: false },
      { id: 'obj-5', text: 'Formulate long-term remediation & post-mortem', completed: false }
    ],
    initialSituationSummary: [
      'Production cluster is failing; users receive 504 errors on /auth/login.',
      'Incident started approximately 10 minutes ago.',
      'You have live shell access to cluster metrics and server logs.',
      'Engineering manager Priya Sharma is waiting for your immediate assessment.'
    ],
    initialMessage: "Hi, this is Priya, your Engineering Manager.\n\nOur production server is down and users are unable to log in.\n\nWhat will you do first?"
  },
  {
    id: 'code-review',
    title: 'Code Review Discussion',
    category: 'Software Engineering',
    role: 'Software Engineer',
    difficulty: 'Easy',
    duration: '15–20 min',
    description: 'Review a teammate’s critical pull request. Communicate constructive technical feedback, surface security risks, and reach consensus.',
    situation: 'Your teammate Marcus opened PR #482 adding a batch data export feature. It performs unindexed nested database queries inside a loop and bypasses tenant authorization checks.',
    character: {
      id: 'marcus-chen',
      name: 'Marcus Chen',
      role: 'Senior Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256',
      department: 'Data Infrastructure',
      bio: 'Talented engineer on tight deadlines. Appreciates technical precision and polite, objective feedback with clear code rationale.'
    },
    evaluationCriteria: [
      'Constructive Technical Feedback',
      'Security & Scalability Awareness',
      'Empathy and Non-combative Tone',
      'Actionable Alternative Suggestions',
      'Collaboration Consensus'
    ],
    initialObjectives: [
      { id: 'cr-1', text: 'Acknowledge teammate effort & high-level architecture', completed: false },
      { id: 'cr-2', text: 'Identify N+1 database performance bottlenecks', completed: false },
      { id: 'cr-3', text: 'Flag authorization and data leakage vulnerabilities', completed: false },
      { id: 'cr-4', text: 'Propose concise, concrete refactor examples', completed: false },
      { id: 'cr-5', text: 'Reach shared agreement on deployment criteria', completed: false }
    ],
    initialSituationSummary: [
      'PR #482: “High throughput async batch export to S3”.',
      'Code reviews are blocked awaiting your stamp before 5:00 PM sprint cut-off.',
      'Marcus believes the PR is ready to merge and seems eager to ship.'
    ],
    initialMessage: "Hey! Thanks for taking a look at PR #482. Product wants this batch export live for enterprise customers by end-of-day. How does the architecture look to you?"
  },
  {
    id: 'client-scope',
    title: 'Client Requirement Discussion',
    category: 'Product',
    role: 'Software/Product Engineer',
    difficulty: 'Intermediate',
    duration: '20–30 min',
    description: 'A key client has ambiguous, rapidly shifting requirements for an upcoming delivery. Clarify constraints and protect timelines.',
    situation: 'Apex Financial Services is your highest-value client. Their Lead Director Sarah has requested multiple real-time biometric verification features one week before the contracted MVP milestone.',
    character: {
      id: 'sarah-jenkins',
      name: 'Sarah Jenkins',
      role: 'VP of Technology, Apex Financial',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256&h=256',
      department: 'Client Stakeholder',
      bio: 'Executive client sponsor. Demanding, business-focused, but receptive to structured trade-off matrices and phased roadmaps.'
    },
    evaluationCriteria: [
      'Expectation Management & Boundary Setting',
      'Requirement Clarification & Active Listening',
      'Negotiating Scope vs Timeline Trade-offs',
      'Customer-Centric Value Framing',
      'Documenting Alignment & Next Steps'
    ],
    initialObjectives: [
      { id: 'cl-1', text: 'Clarify core business problem behind requested changes', completed: false },
      { id: 'cl-2', text: 'Articulate risk to agreed delivery milestone', completed: false },
      { id: 'cl-3', text: 'Propose Phased Delivery (Phase 1 MVP vs Phase 2 enhancement)', completed: false },
      { id: 'cl-4', text: 'Maintain warm professional partnership', completed: false },
      { id: 'cl-5', text: 'Commit to documented written summary', completed: false }
    ],
    initialSituationSummary: [
      'Contract signed for MVP launch in 8 days.',
      'Sarah sends an urgent message asking to tack on real-time biometric compliance.',
      'Failure to launch on schedule incurs SLA financial penalties.'
    ],
    initialMessage: "Hello. Our compliance committee met this morning, and we now believe our MVP will be obsolete without real-time multi-factor facial recognition. We must have this in next week's release. Can you make that happen?"
  },
  {
    id: 'team-conflict',
    title: 'Team Conflict Resolution',
    category: 'Software Engineering',
    role: 'Tech Lead / Senior Peer',
    difficulty: 'Intermediate',
    duration: '20–25 min',
    description: 'Two team members are deadlocked over migrating our core framework, delaying sprint commitments and creating friction.',
    situation: 'Frontend engineers are arguing in Slack channels over adopting Next.js App Router vs maintaining the current SPA architecture. Team morale is sliding.',
    character: {
      id: 'david-ross',
      name: 'David Ross',
      role: 'Principal Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
      department: 'Architecture Guild',
      bio: 'Veteran architect with deep company context. Wants clear data-driven decisions rather than subjective developer taste.'
    },
    evaluationCriteria: ['Conflict De-escalation', 'Objective Trade-off Analysis', 'Fostering Psychological Safety'],
    initialObjectives: [
      { id: 'tc-1', text: 'De-escalate emotional rhetoric', completed: false },
      { id: 'tc-2', text: 'Structure an empirical RFC benchmark process', completed: false }
    ],
    initialSituationSummary: [
      'Public Slack debates are becoming defensive.',
      'Sprint milestone delivery has stalled for 3 days.'
    ],
    initialMessage: "Glad you hopped on. The frontend team is at each other's throats regarding this architecture shift, and productivity has flatlined. How should we settle this?"
  },
  {
    id: 'feature-prioritization',
    title: 'Feature Prioritisation',
    category: 'Product',
    role: 'Product Manager',
    difficulty: 'Intermediate',
    duration: '20–30 min',
    description: 'Sales, Support, and Engineering all have competing P0 requirements with only 3 weeks of engineering bandwidth remaining in Q3.',
    situation: 'Sales wants Custom SSO to unblock a $120k ARR deal, Support needs automated refund tools, and Engineering demands technical debt refactoring.',
    character: {
      id: 'elena-rostova',
      name: 'Elena Rostova',
      role: 'Head of Product',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256',
      department: 'Product Strategy',
      bio: 'Executive leader who demands rigorous RICE prioritization framework and high-leverage business cases.'
    },
    evaluationCriteria: ['RICE Scoring Rigor', 'Stakeholder Expectation Balancing', 'Strategic Focus'],
    initialObjectives: [
      { id: 'fp-1', text: 'Define evaluation criteria and constraints', completed: false },
      { id: 'fp-2', text: 'Deliver transparent decision roadmap with clear trade-offs', completed: false }
    ],
    initialSituationSummary: [
      'Only 60 engineer-days remaining in current sprint cycle.',
      'Stakeholders from Sales and Ops are applying executive pressure.'
    ],
    initialMessage: "We only have 60 engineer-days left this quarter and three executive leaders demanding their feature is the only true P0. What framework are you using to make the call?"
  },
  {
    id: 'project-status-update',
    title: 'Project Status Update',
    category: 'Customer Support',
    role: 'Technical Program Manager',
    difficulty: 'Easy',
    duration: '15–20 min',
    description: 'A high-visibility platform milestone is slipping by 2 weeks due to third-party vendor API latency. Deliver the news to leadership.',
    situation: 'The international payment integration depends on an external bank webhook that is repeatedly failing integration test suites.',
    character: {
      id: 'alex-vance',
      name: 'Alex Vance',
      role: 'VP of Operations',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256',
      department: 'Executive Operations',
      bio: 'Direct, solution-oriented executive who values early warnings and proactive mitigation plans over excuses.'
    },
    evaluationCriteria: ['Early Warning Transparency', 'Actionable Mitigation Paths', 'Executive Executive Presence'],
    initialObjectives: [
      { id: 'ps-1', text: 'State delay directly with zero sugar-coating', completed: false },
      { id: 'ps-2', text: 'Present contingency plan and adjusted timeline with high confidence', completed: false }
    ],
    initialSituationSummary: [
      'Vendor bank integration blocked in staging environment.',
      'Executive sync meeting is in session right now.'
    ],
    initialMessage: "I hear rumors our international checkout release might miss next Monday's market press release. What is the current status and where do we stand?"
  }
];
