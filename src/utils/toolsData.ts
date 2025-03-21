import { Database } from '@/types/supabase';

// Define the AITool interface to match our app's expected structure
export interface AITool {
  id: string;
  name: string;
  logo: string;
  description: string;
  shortDescription: string;
  category: string[];
  pricing: string;
  rating: number;
  reviewCount: number;
  features: string[];
  url: string;
  apiAccess: boolean;
  createdAt?: number; // Adding the optional createdAt property
  pros?: string[];
  cons?: string[];
  useCases?: string[];
}

// Create a type for the database row
export type AIToolRow = Database['public']['Tables']['ai_tools']['Row'];

// Helper function to convert database row to AITool
export function mapRowToAITool(row: AIToolRow): AITool {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    description: row.description,
    shortDescription: row.shortdescription,
    category: row.category,
    pricing: row.pricing,
    rating: row.rating,
    reviewCount: row.reviewcount,
    features: row.features,
    url: row.url,
    apiAccess: row.apiaccess,
    createdAt: row.createdat ? new Date(row.createdat).getTime() : undefined,
    pros: row.pros || undefined,
    cons: row.cons || undefined,
    useCases: row.usecases || undefined
  };
}

// Helper function to convert AITool to database row for inserts/updates
export function mapAIToolToRow(tool: Partial<AITool>): Partial<AIToolRow> {
  const row: Partial<AIToolRow> = {
    name: tool.name,
    logo: tool.logo,
    description: tool.description,
    shortdescription: tool.shortDescription,
    category: tool.category,
    pricing: tool.pricing,
    rating: tool.rating,
    reviewcount: tool.reviewCount,
    features: tool.features,
    url: tool.url,
    apiaccess: tool.apiAccess,
  };

  if (tool.id) row.id = tool.id;
  if (tool.createdAt) row.createdat = new Date(tool.createdAt).toISOString();
  if (tool.pros) row.pros = tool.pros;
  if (tool.cons) row.cons = tool.cons;
  if (tool.useCases) row.usecases = tool.useCases;

  return row;
}

export const aiTools: AITool[] = [
  {
    id: "1",
    name: "ChatGPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png",
    description: "ChatGPT is an AI-powered chatbot developed by OpenAI, based on the GPT architecture. It can generate human-like text based on the input it receives, allowing it to engage in conversations, answer questions, assist with writing, and more.",
    shortDescription: "AI chatbot that can answer questions, assist with writing, and engage in natural conversations.",
    category: ["Text Generation", "Conversational AI", "Writing Assistant"],
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 1243,
    features: ["Natural language processing", "Context retention", "Various knowledge domains", "Content creation", "Code generation"],
    url: "https://chat.openai.com",
    apiAccess: true,
    pros: ["Versatile across many topics", "Easy to use interface", "Constantly improving", "Free tier available", "Detailed responses to complex questions"],
    cons: ["May occasionally generate incorrect information", "Knowledge cutoff date", "Limited context window", "Can be slow during peak times", "Occasional repetitive responses"],
    useCases: [
      "Content creation for blogs and social media",
      "Drafting emails and professional communications",
      "Explaining complex concepts in simple terms",
      "Helping with programming and debugging code",
      "Brainstorming ideas and creative writing",
      "Research assistance and summarization",
      "Language translation and learning"
    ]
  },
  {
    id: "2",
    name: "Midjourney",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Midjourney_Emblem.png/480px-Midjourney_Emblem.png",
    description: "Midjourney is an AI image generation tool that creates images from text descriptions (prompts). It uses a machine learning model trained on a diverse set of images to generate unique and artistic visualizations based on user instructions.",
    shortDescription: "AI art generator that creates stunning images from text descriptions.",
    category: ["Image Generation", "AI Art", "Design"],
    pricing: "Subscription",
    rating: 4.7,
    reviewCount: 876,
    features: ["Text-to-image generation", "Style customization", "High-resolution outputs", "Community features", "Iteration and refinement"],
    url: "https://www.midjourney.com",
    apiAccess: false,
    pros: ["Exceptional aesthetic quality", "Active community", "Regular updates", "Intuitive iteration system", "Artistic style that's recognizably unique"],
    cons: ["No free tier", "Discord-only interface", "Queue times during peak usage", "Limited control over specific details", "Learning curve for effective prompting"],
    useCases: [
      "Creating concept art for games and films",
      "Generating illustrations for books and articles",
      "Designing unique marketing and advertising visuals",
      "Visualizing architectural and interior design concepts",
      "Producing custom artwork for personal or commercial use",
      "Creating unique NFT collections",
      "Fashion and product design visualization"
    ]
  },
  {
    id: "3",
    name: "Jasper",
    logo: "https://assets-global.website-files.com/60e5f2de011b86acebc30db7/6229737eef82c66d9900f678_Jasper%20Logo.svg",
    description: "Jasper (formerly Jarvis) is an AI content creation platform designed to help teams create marketing copy, social media posts, blog articles, and more. It uses AI models to generate original content based on user inputs and guidelines.",
    shortDescription: "AI writing assistant specialized for marketing and content creation.",
    category: ["Text Generation", "Content Creation", "Marketing"],
    pricing: "Subscription",
    rating: 4.6,
    reviewCount: 723,
    features: ["50+ writing templates", "Multi-language support", "SEO integration", "Team collaboration", "Brand voice customization"],
    url: "https://www.jasper.ai",
    apiAccess: true,
    pros: ["Purpose-built for marketing", "Extensive template library", "Good team features", "Plagiarism checker", "SEO-optimized content production"],
    cons: ["Higher price point", "Learning curve for best results", "Output quality varies by topic", "Sometimes generates generic content", "Can require significant editing"],
    useCases: [
      "Writing SEO-optimized blog posts and articles",
      "Creating social media content and campaign copy",
      "Generating product descriptions for e-commerce",
      "Drafting email newsletters and marketing campaigns",
      "Producing consistent content across multiple platforms",
      "Creating ad copy for PPC campaigns",
      "Scaling content production for marketing teams"
    ]
  },
  {
    id: "4",
    name: "DALL-E",
    logo: "https://seeklogo.com/images/D/dall-e-logo-1DDC919A99-seeklogo.com.png",
    description: "DALL-E is an AI system created by OpenAI that can generate detailed images from text descriptions. It can create realistic images and art from a simple text input, combining concepts, attributes, and styles in innovative ways.",
    shortDescription: "AI image creation system that generates detailed visuals from text prompts.",
    category: ["Image Generation", "AI Art", "Design"],
    pricing: "Credit-based",
    rating: 4.5,
    reviewCount: 895,
    features: ["Text-to-image generation", "Edit existing images", "Variations of uploaded images", "Outpainting and inpainting", "Commercial usage rights"],
    url: "https://openai.com/dall-e-2",
    apiAccess: true,
    pros: ["User-friendly interface", "Accurate prompt interpretation", "Commercial rights to images", "API available", "Realistic image generation"],
    cons: ["Credit-based system", "Less artistic style than some alternatives", "No unlimited plan", "Limited control over specific details", "Sometimes produces generic results"],
    useCases: [
      "Creating custom illustrations for websites and apps",
      "Generating product mockups and prototypes",
      "Designing logos and brand visuals",
      "Producing editorial images for articles",
      "Creating custom social media graphics",
      "Visual brainstorming for design projects",
      "Education and visualization of concepts"
    ]
  },
  {
    id: "5",
    name: "GitHub Copilot",
    logo: "https://github.githubassets.com/images/modules/site/copilot/copilot.png",
    description: "GitHub Copilot is an AI pair programmer that helps developers write better code faster. It suggests code and entire functions in real-time, right from your editor, trained on billions of lines of public code.",
    shortDescription: "AI coding assistant that suggests code completions as you type.",
    category: ["Code Generation", "Developer Tools", "Productivity"],
    pricing: "Subscription",
    rating: 4.6,
    reviewCount: 1120,
    features: ["Code completions", "IDE integration", "Multiple programming languages", "Function suggestions", "Comment-to-code conversion"],
    url: "https://github.com/features/copilot",
    apiAccess: false,
    pros: ["Seamless IDE integration", "Handles complex suggestions", "Learns from your coding style", "Supports many languages", "Increases development speed"],
    cons: ["Subscription required", "Occasional irrelevant suggestions", "May suggest deprecated approaches", "Security and licensing concerns", "Sometimes produces non-optimal code"],
    useCases: [
      "Accelerating coding with real-time completions",
      "Learning new programming languages or frameworks",
      "Converting comments to functional code",
      "Automating repetitive coding tasks",
      "Suggesting solutions to complex programming problems",
      "Documentation generation",
      "Quick prototyping and experimentation"
    ]
  },
  {
    id: "6",
    name: "Anthropic Claude",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Anthropic_Logo.png/640px-Anthropic_Logo.png",
    description: "Claude is an AI assistant created by Anthropic, designed to be helpful, harmless, and honest. It excels at thoughtful dialogue and complex reasoning, while avoiding many of the problematic behaviors of other AI systems.",
    shortDescription: "Conversational AI assistant focused on helpful, harmless, and honest interactions.",
    category: ["Text Generation", "Conversational AI", "Research"],
    pricing: "Freemium",
    rating: 4.7,
    reviewCount: 683,
    features: ["Natural conversation", "Long context windows", "Reduced hallucinations", "Constitutional AI approach", "Document analysis"],
    url: "https://claude.ai",
    apiAccess: true,
    pros: ["Very long context window", "Thoughtful, nuanced responses", "Good at following instructions", "Less prone to hallucinations", "Strong reasoning abilities"],
    cons: ["Limited availability in some regions", "Fewer features than some competitors", "Sometimes overly cautious", "Can be slower than alternatives", "Knowledge limitations"],
    useCases: [
      "Analyzing and summarizing long documents",
      "Conducting nuanced research on complex topics",
      "Creating detailed, factually accurate content",
      "Customer support and conversational assistance",
      "Ethical AI applications requiring careful reasoning",
      "Educational content development",
      "Business analysis and decision support"
    ]
  },
  {
    id: "7",
    name: "Stable Diffusion",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Stable_Diffusion_logo.svg/1024px-Stable_Diffusion_logo.svg.png",
    description: "Stable Diffusion is an open-source AI image generation model that can create detailed images based on text descriptions. Unlike many alternatives, it can be run locally on consumer hardware and has spawned a large ecosystem of tools and interfaces.",
    shortDescription: "Open-source AI image generator that can run locally or through various interfaces.",
    category: ["Image Generation", "AI Art", "Open Source"],
    pricing: "Free/Self-hosted",
    rating: 4.5,
    reviewCount: 742,
    features: ["Text-to-image generation", "Image-to-image transformation", "Open-source codebase", "Local installation option", "Active community"],
    url: "https://stability.ai/stable-diffusion",
    apiAccess: true,
    pros: ["Free and open-source", "Can run locally", "Highly customizable", "Large ecosystem of tools", "Privacy-focused option"],
    cons: ["Technical setup for local use", "Higher hardware requirements", "Less beginner-friendly", "Quality can vary by model version", "Requires prompt engineering skills"],
    useCases: [
      "Self-hosted image generation for privacy-conscious users",
      "Custom integration in existing applications and websites",
      "Research and experimentation with AI image models",
      "Creating art with full control over the generation process",
      "Building custom UI interfaces for specific workflows",
      "Educational purposes for understanding AI image generation",
      "Custom model training for specialized use cases"
    ]
  },
  {
    id: "8",
    name: "Perplexity AI",
    logo: "https://storage.googleapis.com/msgsndr/WkKNfYMdzi9gILcl2H5J/media/6544ae7508c951c1a8ef9604.png",
    description: "Perplexity AI is an AI-powered answer engine that combines the capabilities of search engines and large language models to provide comprehensive, cited answers to complex questions rather than just links to sources.",
    shortDescription: "AI search engine that provides direct answers with citations instead of just links.",
    category: ["Search", "Research", "Information Retrieval"],
    pricing: "Freemium",
    rating: 4.6,
    reviewCount: 512,
    features: ["Direct answers to questions", "Source citations", "Real-time information", "Conversation memory", "Pro search capabilities"],
    url: "https://www.perplexity.ai",
    apiAccess: false,
    pros: ["Combines search and AI capabilities", "Provides sources for verification", "Up-to-date information", "Conversational interface", "Faster than traditional research"],
    cons: ["Limited customization", "Occasional citation errors", "Premium tier needed for some features", "May lack depth on specialized topics", "Source quality can vary"],
    useCases: [
      "Academic research with citation tracking",
      "Quickly finding comprehensive answers to complex questions",
      "Market research and competitive analysis",
      "Learning about new topics with reliable sources",
      "Real-time information gathering for professionals",
      "Fact-checking and verifying information",
      "Exploratory research across multiple topics"
    ]
  },
  {
    id: "4b1305d2-2576-4af6-bb1e-c496d3f0bb76",
    name: "Acedit",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQH1fUaPsDzCbA/company-logo_200_200/company-logo_200_200/0/1725004962480/acedit_ai_logo?e=2147483647&v=beta&t=_9qlhjyBKJhgmWzXzRnmpou1KgSjwtMyH2OFL14uhoc",
    description: "Acedit is an AI-powered interview coaching tool designed to give job seekers, recent graduates, and career changers a competitive edge. By simulating real interview scenarios and providing tailored feedback, Acedit helps users refine their answers, boost confidence, and improve overall performance. The tool generates personalized Q&A, offers real-time coaching during practice sessions, and even assists with cover letter generation by analyzing your resume and LinkedIn profile. Acedit's comprehensive approach makes it a one-stop solution for interview preparation, ensuring that you are well-prepared to face any interview situation.",
    shortDescription: "AI-powered interview coaching tool for job seekers, graduates, and career changers.",
    category: ["Career", "Education", "Productivity"],
    pricing: "Freemium",
    rating: 4.7,
    reviewCount: 350,
    features: ["Interview simulations", "Real-time feedback", "Cover letter generation", "Resume analysis", "Personalized coaching"],
    url: "https://acedit.ai",
    apiAccess: false,
    pros: ["Realistic interview simulations", "Personalized feedback", "Time-saving preparation", "Builds confidence", "Helps identify weaknesses"],
    cons: ["Limited industry-specific questions", "Only available on web", "Some advanced features require premium subscription"],
    useCases: [
      "Preparing for technical interviews in tech industry",
      "Practice for behavioral interviews for recent graduates",
      "Refining answers for career changers",
      "Generating tailored cover letters based on job descriptions",
      "Improving communication skills for interviews"
    ]
  },
  {
    id: "cd601b48-d1c9-4083-bbf1-ffeada75b58e",
    name: "Ada Support",
    logo: "https://yt3.googleusercontent.com/0SPNOzt56miEVuE1of5gdCMSiSLiB5eHAGd-X_kWEGr6oO4-rArfnMllvUkNeNAVz0ZwYAhD=s160-c-k-c0x00ffffff-no-rj",
    description: "Ada Support is an AI-powered customer service automation platform that helps businesses improve their customer experience while reducing operational costs. Using conversational AI, Ada can handle customer inquiries across multiple channels, including websites, mobile apps, and social media platforms. The platform offers seamless handoffs to human agents when needed, provides detailed analytics on customer interactions, and supports multiple languages for global operations. Ada's no-code builder makes it easy for non-technical teams to create, deploy, and optimize automated customer experiences.",
    shortDescription: "AI-powered customer service automation platform.",
    category: ["Customer Service", "Automation", "Business"],
    pricing: "Paid",
    rating: 4.7,
    reviewCount: 425,
    features: ["No-code conversation builder", "Multilingual support", "Omnichannel deployment", "Seamless agent handoff", "Advanced analytics"],
    url: "https://ada.cx",
    apiAccess: true,
    pros: ["Reduces customer service costs", "Easy implementation without coding", "Handles high volume of inquiries", "Seamless integration with existing tools", "Detailed performance analytics"],
    cons: ["Higher price point", "Complex setup for advanced use cases", "Some customizations require professional services"],
    useCases: [
      "Automating repetitive customer inquiries",
      "Providing 24/7 customer support across time zones",
      "Supporting customers across multiple languages",
      "Reducing call center volume and wait times",
      "Gathering customer insights through conversation data"
    ]
  },
  {
    id: "13bfab79-a671-4b94-a4dd-a03fcaef7740",
    name: "Amazon CodeWhisperer",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xQcwKitRgXfqdi34DYlocPSEXD2G2zZipg&s",
    description: "Amazon CodeWhisperer is an AI-powered coding assistant that helps developers write code faster and with fewer errors. Deeply integrated with AWS services, it provides contextually relevant code suggestions based on comments and existing code in your IDE. Unlike other code generators, CodeWhisperer specializes in suggesting secure coding patterns and identifying potential security vulnerabilities. It supports multiple programming languages including Python, Java, JavaScript, TypeScript, and C#, and works across popular IDEs such as VS Code, IntelliJ, and AWS Cloud9. CodeWhisperer continuously learns from AWS's vast code repositories to provide increasingly relevant suggestions.",
    shortDescription: "AI-powered code generator integrated with AWS services.",
    category: ["Code Generation", "Developer Tools", "Productivity"],
    pricing: "Freemium",
    rating: 4.6,
    reviewCount: 780,
    features: ["Real-time code suggestions", "Security vulnerability scanning", "AWS service integration", "Multiple language support", "IDE plugins"],
    url: "https://aws.amazon.com/codewhisperer",
    apiAccess: true,
    pros: ["Excellent AWS service integration", "Security-focused suggestions", "Works offline", "Free tier available", "Multi-IDE support"],
    cons: ["Best performance with AWS-related code", "Still improving for some languages", "Enterprise features require paid tier", "Learning curve for optimal prompting"],
    useCases: [
      "Accelerating AWS cloud development",
      "Improving code security and compliance",
      "Learning new AWS services and APIs",
      "Reducing boilerplate code in projects",
      "Implementing best practices automatically"
    ]
  },
  {
    id: "2d914a77-7526-4562-890d-034e48a6bcfd",
    name: "Tome",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlzSz0cdnvnDG1sI4m6QOea4P95iqJddJAA&s",
    description: "Tome is an AI-powered assistant designed for sales professionals, streamlining the process of identifying and targeting key accounts. It leverages your existing playbook and CRM data to pinpoint strategic initiatives and key decision-makers, enabling personalized outreach. Tome acts as a 'second brain' for sales teams, providing tailored insights and strategic account mapping that enhance sales efficiency and effectiveness.",
    shortDescription: "AI-driven tool for sales targeting and personalized outreach.",
    category: ["Sales", "Business", "Automation"],
    pricing: "Freemium",
    rating: 4.5,
    reviewCount: 5,
    features: ["CRM integration", "Account mapping", "Strategic insights", "Personalized outreach", "Decision maker identification"],
    url: "https://tome.app",
    apiAccess: true,
    pros: ["Free tier available", "Integrates with existing CRM systems", "Saves time on account research", "Increases targeting accuracy", "Customizable for different sales processes"],
    cons: ["Limited integrations on free tier", "Learning curve for complex sales cycles", "May require data cleanup in CRM", "Premium features can be costly", "Best for B2B rather than B2C"],
    useCases: [
      "Identifying decision makers in target accounts",
      "Creating personalized outreach strategies",
      "Prioritizing accounts based on strategic fit",
      "Mapping account relationships and organizational structures",
      "Enhancing sales team productivity"
    ]
  },
  {
    id: "57c81d30-03f3-4346-8604-54d8f6fd1a8b",
    name: "Writer.com",
    logo: "https://writer.com/wp-content/uploads/2023/08/writer.png",
    description: "Writer.com provides enterprise-grade AI writing and content generation tools with brand voice customization.",
    shortDescription: "Enterprise AI writing platform for teams.",
    category: ["Text Generation", "Content Creation", "Marketing"],
    pricing: "Paid",
    rating: 4.7,
    reviewCount: 1500,
    features: ["Brand voice customization", "Content generation", "Grammar and style checking", "Team collaboration", "Enterprise security"],
    url: "https://writer.com",
    apiAccess: false,
    pros: ["Enterprise-grade security", "Consistent brand voice across teams", "High-quality content generation", "Team collaboration features", "Integrated grammar and style checking"],
    cons: ["$18/month starting price", "No free tier", "Limited customization on basic plans", "Complex setup for enterprise", "Overkill for individual users"],
    useCases: [
      "Creating consistent marketing content across teams",
      "Maintaining brand voice across global organizations",
      "Generating high-volume content for multiple channels",
      "Enforcing style guidelines across enterprise content",
      "Streamlining content approval processes"
    ]
  },
  {
    id: "5093e031-aa24-4ba0-90fa-f624984388e7",
    name: "Zams (prev. Obviously AI)",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHevF3vdNLBnw/company-logo_200_200/B56ZUsrK_gHEAI-/0/1740211269999/zamshq_logo?e=1749686400&v=beta&t=c6-PnLHCHhp6d3CNkF5uCZSHghpQqU0m14YKPoejYr0",
    description: "Obviously AI enables anyone to build and deploy machine learning models without coding.",
    shortDescription: "No-code AI platform for predictive analytics and machine learning.",
    category: ["Data Analysis", "Machine Learning", "No-Code"],
    pricing: "Paid",
    rating: 4.8,
    reviewCount: 1200,
    features: ["No-code prediction models", "Automated machine learning", "Easy data integration", "Visual analytics", "Model deployment"],
    url: "https://zams.com",
    apiAccess: false,
    pros: ["No coding required", "Fast model creation", "Intuitive user interface", "Works with various data sources", "Accurate predictions"],
    cons: ["$75/month starting price", "Limited customization for advanced ML needs", "Requires structured data", "Limited to specific prediction types", "Data size limitations on basic plans"],
    useCases: [
      "Predicting customer churn without coding",
      "Forecasting sales and inventory needs",
      "Credit risk assessment and scoring",
      "Demand forecasting for resource planning",
      "Marketing campaign optimization"
    ]
  },
  {
    id: "aaf55289-a442-452f-94f6-fe96ecbce0ae",
    name: "Zapier",
    logo: "https://yt3.googleusercontent.com/ytc/AIdro_kmxr4Gm2zB3Fj45CMBgTKlmavwj7vAQaja9g5dBws_kQ=s160-c-k-c0x00ffffff-no-rj",
    description: "Zapier helps automate repetitive tasks by connecting different apps and services with AI assistance.",
    shortDescription: "AI-enhanced automation platform connecting apps and automating workflows.",
    category: ["Automation", "Productivity", "Integration"],
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 15000,
    features: ["App integration", "Workflow automation", "AI-assisted zap creation", "Scheduled triggers", "Multi-step zaps"],
    url: "https://zapier.com",
    apiAccess: true,
    pros: ["Connects 5000+ apps", "No coding required", "Time-saving automation", "Easy to use interface", "Free tier available"],
    cons: ["$20/month for advanced features", "Complex zaps can be difficult to debug", "Limited error handling on free tier", "Some integrations have limitations", "Can be cost-prohibitive at scale"],
    useCases: [
      "Automating data transfer between applications",
      "Creating automated marketing workflows",
      "Syncing customer data across platforms",
      "Automating social media posting schedules",
      "Streamlining customer support processes"
    ]
  }
];

export const categories = [
  "All",
  "Text Generation",
  "Image Generation",
  "Conversational AI",
  "Code Generation",
  "Search",
  "Marketing",
  "Design",
  "Developer Tools",
  "Video Editing",
  "Transcription", 
  "Translation",
  "Automation",
  "Collaboration",
  "Presentation",
  "Voice Generation",
  "Customer Service",
  "Data Analysis",
  "Research",
  "Education",
  "Productivity",
  "Content Creation",
  "Open Source",
  "Career",
  "Business",
  "Sales",
  "Machine Learning",
  "No-Code",
  "Integration"
];

export const pricingOptions = ["All", "Free", "Freemium", "Subscription", "Credit-based", "Self-hosted", "Paid"];
