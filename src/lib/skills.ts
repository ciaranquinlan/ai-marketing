export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "strategy" | "content" | "conversion";
  inputType: "text" | "url" | "mixed";
  fields: SkillField[];
  systemPrompt: string;
}

export interface SkillField {
  id: string;
  label: string;
  type: "text" | "textarea" | "url";
  placeholder: string;
  required: boolean;
}

export const skills: Skill[] = [
  {
    id: "positioning-basics",
    name: "Positioning Basics",
    description: "Clarify who you're for, what you do, and why you're different. Get a complete positioning statement and messaging framework.",
    icon: "🎯",
    category: "strategy",
    inputType: "text",
    fields: [
      {
        id: "product",
        label: "What's your product/service?",
        type: "textarea",
        placeholder: "e.g., An AI-powered writing assistant for marketing teams",
        required: true,
      },
      {
        id: "audience",
        label: "Who is your ideal customer?",
        type: "textarea",
        placeholder: "e.g., B2B SaaS marketing managers at companies with 50-500 employees",
        required: true,
      },
      {
        id: "competitors",
        label: "Who are your main competitors?",
        type: "textarea",
        placeholder: "e.g., Jasper, Copy.ai, Writer",
        required: false,
      },
      {
        id: "differentiator",
        label: "What makes you different?",
        type: "textarea",
        placeholder: "e.g., We integrate directly with your CRM and learn your brand voice",
        required: false,
      },
    ],
    systemPrompt: `You are an expert brand strategist specializing in positioning. Your task is to create a clear, compelling positioning statement and messaging framework.

Follow this framework:
1. **Target Audience Analysis**: Define the ideal customer profile (ICP) with specifics
2. **Market Category**: What category do they compete in?
3. **Key Differentiators**: What makes them uniquely valuable?
4. **Positioning Statement**: A clear, one-sentence positioning statement following the format:
   "For [target audience] who [need/want], [product] is a [category] that [key benefit]. Unlike [competitors], we [differentiator]."
5. **Messaging Pillars**: 3-4 key messages that support the positioning
6. **Elevator Pitch**: 30-second version
7. **Tagline Options**: 3 punchy tagline suggestions

Be specific, avoid jargon, and make it actionable. Output in clean markdown format.`,
  },
  {
    id: "homepage-audit",
    name: "Homepage Audit",
    description: "Get instant conversion feedback on any homepage or landing page. Actionable fixes in minutes.",
    icon: "📄",
    category: "conversion",
    inputType: "url",
    fields: [
      {
        id: "url",
        label: "Homepage URL",
        type: "url",
        placeholder: "https://example.com",
        required: true,
      },
      {
        id: "goal",
        label: "Primary conversion goal",
        type: "text",
        placeholder: "e.g., Get demo signups, newsletter subscriptions, purchases",
        required: false,
      },
      {
        id: "audience",
        label: "Target audience",
        type: "text",
        placeholder: "e.g., Enterprise CTOs, Small business owners",
        required: false,
      },
    ],
    systemPrompt: `You are a conversion rate optimization (CRO) expert. Analyze the provided homepage and deliver actionable feedback.

Structure your audit as:

## Quick Score
Rate 1-10 on: Clarity, Trust, Urgency, Design, Mobile-friendliness

## Hero Section
- Headline effectiveness
- Value proposition clarity
- CTA strength and visibility

## Trust Signals
- Social proof present?
- Testimonials, logos, stats?
- Missing trust elements

## Content Flow
- Does the page tell a story?
- Are benefits clear?
- Is there a logical progression?

## Conversion Blockers
- What might stop someone from converting?
- Friction points identified

## Top 5 Quick Wins
Specific, actionable changes ranked by impact

## Competitor Comparison (if known)
How does this compare to industry standards?

Be direct and specific. Reference exact elements on the page. Output in clean markdown.`,
  },
  {
    id: "content-ideas",
    name: "Content Idea Generator",
    description: "Generate 20+ content ideas across formats based on your positioning. Blog posts, social, videos, and more.",
    icon: "💡",
    category: "content",
    inputType: "text",
    fields: [
      {
        id: "business",
        label: "What's your business/expertise?",
        type: "textarea",
        placeholder: "e.g., AI consulting for Australian businesses",
        required: true,
      },
      {
        id: "audience",
        label: "Who's your target audience?",
        type: "textarea",
        placeholder: "e.g., Tech-curious business owners, marketing managers",
        required: true,
      },
      {
        id: "goals",
        label: "Content goals",
        type: "text",
        placeholder: "e.g., Thought leadership, lead generation, SEO",
        required: false,
      },
      {
        id: "existing",
        label: "What content have you already created?",
        type: "textarea",
        placeholder: "e.g., We have a blog about AI trends, active on LinkedIn",
        required: false,
      },
    ],
    systemPrompt: `You are a content strategist specializing in B2B thought leadership. Generate a comprehensive content idea bank.

Deliver:

## Content Pillars
Define 3-4 main themes/topics to own

## Blog Post Ideas (10)
- Title, angle, target keyword, estimated word count
- Mix of how-to, opinion, case study, listicle formats

## LinkedIn Posts (10)
- Hook line + brief description
- Mix of: personal story, hot take, how-to, question, carousel idea

## Video/Podcast Ideas (5)
- Title + format (interview, solo, tutorial)
- Key talking points

## Lead Magnets (3)
- Downloadable content ideas (guides, templates, checklists)

## Repurposing Map
Show how one piece of content can become 5+ pieces

## Content Calendar Suggestion
Which pieces to prioritize and rough timing

Be creative but strategic. Each idea should tie back to their positioning and audience. Output in clean markdown.`,
  },
  {
    id: "linkedin-authority",
    name: "LinkedIn Authority Builder",
    description: "Build a complete LinkedIn content system. Positioning, content pillars, formats, and a posting calendar.",
    icon: "💼",
    category: "content",
    inputType: "text",
    fields: [
      {
        id: "name",
        label: "Your name and role",
        type: "text",
        placeholder: "e.g., Sarah Chen, CEO at TechStartup",
        required: true,
      },
      {
        id: "expertise",
        label: "Your expertise/niche",
        type: "textarea",
        placeholder: "e.g., AI implementation, digital transformation, startup scaling",
        required: true,
      },
      {
        id: "audience",
        label: "Who do you want to reach?",
        type: "textarea",
        placeholder: "e.g., CTOs, VPs of Engineering, tech founders",
        required: true,
      },
      {
        id: "goals",
        label: "LinkedIn goals",
        type: "text",
        placeholder: "e.g., Build authority, generate leads, attract talent",
        required: false,
      },
      {
        id: "current",
        label: "Current LinkedIn presence",
        type: "textarea",
        placeholder: "e.g., 2k followers, post occasionally, mostly share company news",
        required: false,
      },
    ],
    systemPrompt: `You are a LinkedIn ghostwriter and personal branding expert. Create a complete LinkedIn content strategy.

Deliver:

## Profile Positioning
- Headline formula (specific)
- About section structure
- Featured section recommendations

## Content Pillars (4)
For each pillar:
- Topic theme
- Why it matters to their audience
- Example angles

## Content Mix
Optimal ratio of:
- Educational posts
- Personal stories
- Hot takes/opinions
- Behind-the-scenes
- Engagement posts

## Post Templates (5)
Ready-to-use formats with fill-in-the-blank structure:
- The contrarian take
- The lesson learned
- The how-to breakdown
- The question hook
- The story arc

## Sample Posts (3)
Fully written example posts they can adapt

## Posting Schedule
- Optimal days/times
- Frequency recommendation
- Content batching strategy

## Engagement Strategy
- How to build community
- Comment strategy
- DM approach

## 30-Day Quick Start
Week-by-week plan to build momentum

Be specific to their niche and audience. Output in clean markdown.`,
  },
  {
    id: "ai-discoverability",
    name: "AI Discoverability Audit",
    description: "See how your brand appears in ChatGPT, Perplexity, Claude, and Gemini. Get visibility recommendations.",
    icon: "🔍",
    category: "strategy",
    inputType: "mixed",
    fields: [
      {
        id: "brand",
        label: "Brand/Company name",
        type: "text",
        placeholder: "e.g., Acme Corp",
        required: true,
      },
      {
        id: "url",
        label: "Website URL",
        type: "url",
        placeholder: "https://acme.com",
        required: true,
      },
      {
        id: "industry",
        label: "Industry/Category",
        type: "text",
        placeholder: "e.g., B2B SaaS, E-commerce, Professional Services",
        required: true,
      },
      {
        id: "competitors",
        label: "Main competitors",
        type: "textarea",
        placeholder: "e.g., Competitor A, Competitor B, Competitor C",
        required: false,
      },
      {
        id: "queries",
        label: "Key queries you want to rank for",
        type: "textarea",
        placeholder: "e.g., 'best project management software', 'AI consulting Australia'",
        required: false,
      },
    ],
    systemPrompt: `You are an AI search optimization (AEO/GEO) specialist. Audit how a brand appears in AI-powered search and recommendations.

Structure your audit:

## Executive Summary
Overall AI discoverability score (1-10) with key findings

## AI Search Presence Analysis
For each major AI system (ChatGPT, Claude, Perplexity, Gemini):
- Likely visibility for key queries
- Factors helping/hurting discoverability
- Specific recommendations

## Content Analysis
- Is content structured for AI consumption?
- Schema markup presence
- FAQ content
- Authoritative signals

## Citation Potential
- Are they cited in sources AI models reference?
- Wikipedia, industry publications, data sources
- Backlink profile quality

## Competitive Position
- How do competitors likely appear?
- Share of voice estimation

## Recommendations (Prioritized)

### Quick Wins (This Week)
- Immediate changes for better AI visibility

### Medium-Term (This Month)
- Content and structure improvements

### Long-Term Strategy
- Authority building, PR, citations

## AI-Friendly Content Checklist
Specific content to create for AI discoverability

## Monitoring Suggestions
How to track AI visibility over time

Be specific and actionable. This is about AI/LLM discoverability, not traditional SEO. Output in clean markdown.`,
  },
];

export function getSkill(id: string): Skill | undefined {
  return skills.find((s) => s.id === id);
}

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((s) => s.category === category);
}
