export interface SkillFormData {
  name: string;
  description: string;
  trigger: string;
  instructions: string[];
  alwaysDo: string[];
  neverDo: string[];
  goodExample: string;
  badExample: string;
}

export interface Preset {
  label: string;
  data: SkillFormData;
}

export const presets: Preset[] = [
  {
    label: 'Meeting Prep',
    data: {
      name: 'meeting-prep',
      description: 'Prep talking points and research for any upcoming meeting',
      trigger: 'prep me for a meeting with...',
      instructions: [
        'Research the person or company using available context (LinkedIn, website, prior conversations).',
        'Identify 3 talking points relevant to the meeting objective.',
        'Draft an opening line that references something specific to them.',
        'Suggest 2 questions to ask that demonstrate preparation.',
        'Flag any potential objections or concerns to prepare for.',
      ],
      alwaysDo: [
        'Include the person\'s name and company in the first line.',
        'Keep total output under 300 words.',
        'End with a "Quick Reference" summary block.',
      ],
      neverDo: [
        'Use generic openers like "Hope you\'re doing well."',
        'Include information that cannot be verified.',
        'Write in a salesy or overly enthusiastic tone.',
      ],
      goodExample: 'Meeting with Sarah Chen, VP Engineering at Acme Corp:\n\nTalking Points:\n1. Their recent migration to microservices (referenced in their Q3 blog post)\n2. Shared connection through the Cleveland Tech Meetup\n3. Their open headcount for platform engineers signals scaling challenges\n\nOpener: "Sarah, I noticed Acme\'s engineering blog on the microservices migration. That mirrors a pattern we see often in mid-market SaaS."',
      badExample: 'Hey Sarah! Hope you\'re having an amazing day! I\'d love to chat about how our revolutionary AI platform can 10x your engineering team\'s productivity. We\'re the best-in-class solution for...',
    },
  },
  {
    label: 'Email Follow-up',
    data: {
      name: 'email-followup',
      description: 'Draft a professional follow-up email after a meeting or call',
      trigger: 'write a follow-up email for...',
      instructions: [
        'Reference 1 specific topic discussed in the meeting.',
        'Restate any commitments or next steps agreed upon.',
        'Include a clear call-to-action with a specific timeline.',
        'Keep the email under 150 words.',
      ],
      alwaysDo: [
        'Use the recipient\'s first name.',
        'Include a specific date or timeframe for next steps.',
        'Match the formality level of the original conversation.',
      ],
      neverDo: [
        'Add fluff or filler phrases.',
        'Introduce new topics not discussed in the meeting.',
        'Use "just following up" or "circling back" as openers.',
      ],
      goodExample: 'Subject: Next Steps from Our Thursday Call\n\nDavid,\n\nGood speaking with you about the onboarding bottleneck. The 3-week cycle you described is exactly the kind of workflow we audit.\n\nAs discussed, I\'ll send over the diagnostic questionnaire by Friday. Once you complete it, we can schedule the 90-minute discovery session.\n\nDoes the week of March 24th work for your team?\n\nBest,\nChris',
      badExample: 'Subject: Following Up!\n\nHey David! Just wanted to circle back on our amazing conversation. I think we really hit it off! Let me know if you want to chat more about all the incredible things we can do together!',
    },
  },
  {
    label: 'Brand Voice',
    data: {
      name: 'brand-voice',
      description: 'Enforce consistent brand voice and tone across all written content',
      trigger: 'write this in our brand voice...',
      instructions: [
        'Analyze the input content for tone, word choice, and structure.',
        'Rewrite to match the defined brand voice attributes.',
        'Preserve the core message and all factual content.',
        'Adjust sentence length and complexity to match brand guidelines.',
      ],
      alwaysDo: [
        'Use active voice.',
        'Keep sentences under 25 words on average.',
        'Lead with the benefit or outcome, not the feature.',
      ],
      neverDo: [
        'Use jargon or buzzwords (synergy, leverage, disrupt, 10x).',
        'Write in passive voice.',
        'Use exclamation marks more than once per piece.',
      ],
      goodExample: 'Before: "Our innovative, cutting-edge AI solution leverages next-generation machine learning to revolutionize your workflow!"\n\nAfter: "Our AI audits your current workflow and identifies the 3 highest-impact automation opportunities. Most clients see results within two weeks."',
      badExample: '',
    },
  },
  {
    label: 'Research Brief',
    data: {
      name: 'research-brief',
      description: 'Compile a structured research brief on any topic with sources and key findings',
      trigger: 'research...',
      instructions: [
        'Define the research question clearly at the top.',
        'Gather information from available context and knowledge.',
        'Organize findings into 3-5 key themes or categories.',
        'Include specific data points, quotes, or evidence where available.',
        'Write a 2-3 sentence executive summary at the top.',
      ],
      alwaysDo: [
        'Start with an executive summary.',
        'Label each section with a clear heading.',
        'Note confidence level (high/medium/low) for each finding.',
      ],
      neverDo: [
        'Present speculation as fact.',
        'Include findings without attribution or context.',
        'Exceed 500 words without explicit request.',
      ],
      goodExample: '',
      badExample: '',
    },
  },
  {
    label: 'Weekly Report',
    data: {
      name: 'weekly-report',
      description: 'Generate a structured weekly progress report from notes and activity',
      trigger: 'write my weekly report...',
      instructions: [
        'Organize updates into: Completed, In Progress, Blocked, Next Week.',
        'For each item, include a 1-sentence status and any metrics.',
        'Highlight decisions made or decisions needed.',
        'Keep the total report under 400 words.',
      ],
      alwaysDo: [
        'Use bullet points for readability.',
        'Include dates for deadlines and milestones.',
        'Flag blockers with a clear "BLOCKED:" prefix.',
      ],
      neverDo: [
        'Include trivial tasks (emails sent, meetings attended).',
        'Use vague status updates ("working on it").',
        'Bury blockers in the middle of the report.',
      ],
      goodExample: '## Week of March 10, 2026\n\n### Completed\n- Deployed v2.1 auth flow to production (March 11)\n- Closed 3 support tickets: #421, #423, #425\n\n### In Progress\n- API rate limiting: 70% complete, targeting March 17 deploy\n\n### BLOCKED\n- Database migration requires DevOps approval (requested March 9, no response)\n\n### Next Week\n- Ship rate limiting\n- Begin user dashboard redesign (design review scheduled March 18)',
      badExample: '',
    },
  },
];

export const emptyFormData: SkillFormData = {
  name: '',
  description: '',
  trigger: '',
  instructions: ['', ''],
  alwaysDo: [''],
  neverDo: [''],
  goodExample: '',
  badExample: '',
};
