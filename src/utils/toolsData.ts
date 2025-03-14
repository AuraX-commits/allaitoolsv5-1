
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
  pros?: string[];
  cons?: string[];
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
    pros: ["Versatile across many topics", "Easy to use interface", "Constantly improving", "Free tier available"],
    cons: ["May occasionally generate incorrect information", "Knowledge cutoff date", "Limited context window"]
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
    pros: ["Exceptional aesthetic quality", "Active community", "Regular updates", "Intuitive iteration system"],
    cons: ["No free tier", "Discord-only interface", "Queue times during peak usage"]
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
    pros: ["Purpose-built for marketing", "Extensive template library", "Good team features", "Plagiarism checker"],
    cons: ["Higher price point", "Learning curve for best results", "Output quality varies by topic"]
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
    pros: ["User-friendly interface", "Accurate prompt interpretation", "Commercial rights to images", "API available"],
    cons: ["Credit-based system", "Less artistic style than some alternatives", "No unlimited plan"]
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
    pros: ["Seamless IDE integration", "Handles complex suggestions", "Learns from your coding style", "Supports many languages"],
    cons: ["Subscription required", "Occasional irrelevant suggestions", "May suggest deprecated approaches"]
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
    pros: ["Very long context window", "Thoughtful, nuanced responses", "Good at following instructions", "Less prone to hallucinations"],
    cons: ["Limited availability in some regions", "Fewer features than some competitors", "Sometimes overly cautious"]
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
    pros: ["Free and open-source", "Can run locally", "Highly customizable", "Large ecosystem of tools"],
    cons: ["Technical setup for local use", "Higher hardware requirements", "Less beginner-friendly"]
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
    pros: ["Combines search and AI capabilities", "Provides sources for verification", "Up-to-date information", "Conversational interface"],
    cons: ["Limited customization", "Occasional citation errors", "Premium tier needed for some features"]
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
  "Open Source"
];

export const pricingOptions = ["All", "Free", "Freemium", "Subscription", "Credit-based", "Self-hosted"];
