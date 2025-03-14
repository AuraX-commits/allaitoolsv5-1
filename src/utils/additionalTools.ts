
import { AITool } from "@/utils/toolsData";

export const additionalTools: AITool[] = [
  {
    id: "anthropic-claude",
    name: "Claude",
    logo: "https://cdn.oaistatic.com/_next/static/media/claude-icon.266ce14c.svg",
    url: "https://claude.ai",
    description: "Claude is an AI assistant built by Anthropic to be helpful, harmless, and honest. Claude excels at thoughtful dialogue and creative content generation with nuanced understanding. It can perform complex tasks like coding, reasoning, and detailed analysis. Claude has industry-leading context windows that allow it to analyze lengthy documents and maintain in-depth conversations. It's designed with safeguards to reduce harmful outputs and avoid reinforcing biases.",
    shortDescription: "A conversational AI assistant designed to be helpful, harmless, and honest.",
    category: ["Conversational AI", "Text Generation", "Research"],
    features: [
      "100K token context window",
      "Document analysis capabilities",
      "Python code generation and debugging",
      "Multilingual support",
      "Reduced hallucinations and improved accuracy"
    ],
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 982,
    apiAccess: true,
    pros: [
      "Extraordinarily long context window",
      "Nuanced understanding of complex queries",
      "Excellent writing capabilities",
      "Research-oriented approach to answers",
      "Strong safety measures"
    ],
    cons: [
      "API usage can get expensive at scale",
      "Sometimes overly cautious with responses",
      "Free tier has limitations"
    ],
    useCases: [
      "Research assistance and literature review",
      "Content creation and editing",
      "Software development and debugging",
      "Educational tutoring and explanation",
      "Business documentation analysis"
    ]
  },
  {
    id: "perplexity-ai",
    name: "Perplexity AI",
    logo: "https://www.perplexity.ai/favicon.ico",
    url: "https://www.perplexity.ai",
    description: "Perplexity AI is an AI-powered answer engine that provides direct responses to user queries by searching the web and citing sources. It combines the power of large language models with real-time web searches to deliver accurate, up-to-date information with full citations. Users can ask follow-up questions to dive deeper into topics, and the system maintains context throughout the conversation. Perplexity aims to make information discovery more efficient and transparent by providing concise answers backed by reliable sources.",
    shortDescription: "AI-powered answer engine with real-time information and source citations.",
    category: ["Search", "Research", "Conversational AI"],
    features: [
      "Real-time web search capabilities",
      "Source citations for all information",
      "Conversational follow-up questions",
      "Academic, professional, and writing modes",
      "Integration with multiple AI models (Claude, GPT-4, etc.)"
    ],
    pricing: "Freemium",
    rating: 4.6,
    reviewCount: 753,
    apiAccess: true,
    pros: [
      "Up-to-date information unlike static LLMs",
      "Sources provided for fact-checking",
      "Clean, intuitive interface",
      "Maintains conversation context",
      "Free tier is quite capable"
    ],
    cons: [
      "Occasionally includes irrelevant sources",
      "Limited customization options",
      "Pro subscription needed for best models"
    ],
    useCases: [
      "Academic research with proper citations",
      "Staying updated on current events and developments",
      "Market and competitor research",
      "Learning complex topics with follow-up questions",
      "Fact-checking and information verification"
    ]
  },
  {
    id: "runway-gen-2",
    name: "Runway Gen-2",
    logo: "https://storage.googleapis.com/coherent-depth-373410-thumbnails/runway/static/images/favicon-256.png",
    url: "https://runwayml.com",
    description: "Runway Gen-2 is a state-of-the-art AI video generation model that can create realistic videos from text prompts, images, or existing video clips. It allows users to generate completely new videos based on text descriptions, transform still images into moving videos, or extend and edit existing footage. Gen-2 excels at creating visually compelling, high-quality video content with natural motion and realistic details. The platform offers an intuitive interface designed for both professionals and beginners in video production.",
    shortDescription: "AI-powered video generation from text, images, or existing video clips.",
    category: ["Video Editing", "Image Generation", "Content Creation"],
    features: [
      "Text-to-video generation",
      "Image-to-video transformation",
      "Video extension and editing",
      "Style transfer capabilities",
      "Professional export options"
    ],
    pricing: "Paid",
    rating: 4.7,
    reviewCount: 612,
    apiAccess: true,
    pros: [
      "Impressive video quality and realism",
      "Simple, intuitive interface",
      "Flexible input options (text, image, video)",
      "Regular model improvements",
      "Professional-grade outputs"
    ],
    cons: [
      "Processing can be time-intensive",
      "Higher-tier plans are expensive",
      "Limited control over specific details",
      "Some content restrictions"
    ],
    useCases: [
      "Creating promotional videos and advertisements",
      "Generating stock footage for productions",
      "Conceptualizing scenes before filming",
      "Adding motion to still photography",
      "Producing creative visual content for social media"
    ]
  },
  {
    id: "midjourney",
    name: "Midjourney",
    logo: "https://seeklogo.com/images/M/midjourney-logo-BB5F7C3A46-seeklogo.com.png",
    url: "https://www.midjourney.com",
    description: "Midjourney is an AI image generation tool that creates stunning, artistic visuals from text descriptions. It excels at producing creative, aesthetically pleasing images with unique artistic styles and high detail. Users interact with Midjourney primarily through Discord, where they can input text prompts and receive generated images in various styles. The platform allows for image refinement through variations, upscaling, and parameter adjustments. Midjourney has become particularly popular among artists, designers, and creative professionals for conceptual art, illustration, and visual ideation.",
    shortDescription: "AI art generator creating detailed, artistic images from text descriptions.",
    category: ["Image Generation", "Design", "Content Creation"],
    features: [
      "High-quality image generation from text",
      "Multiple artistic style options",
      "Image variation and refinement tools",
      "Parameter controls for customization",
      "High-resolution upscaling"
    ],
    pricing: "Paid",
    rating: 4.9,
    reviewCount: 1205,
    apiAccess: false,
    pros: [
      "Exceptional aesthetic quality",
      "Intuitive prompt system",
      "Strong artistic interpretation",
      "Active community for inspiration",
      "Regular model improvements"
    ],
    cons: [
      "Discord-based interface may not suit everyone",
      "Limited control over specific details",
      "Usage limitations based on subscription tier",
      "No direct API access"
    ],
    useCases: [
      "Concept art and visualization",
      "Marketing and promotional materials",
      "Book and album cover design",
      "Interior design visualization",
      "Character and environment design for games/film"
    ]
  },
  {
    id: "eleven-labs",
    name: "ElevenLabs",
    logo: "https://global-uploads.webflow.com/64c4a5623b3a1d139a0708c6/64c4ba99d455f4fb3881b6cd_favicon-xl.png",
    url: "https://elevenlabs.io",
    description: "ElevenLabs is a cutting-edge AI voice generation platform that creates natural-sounding, expressive synthetic voices. It offers voice cloning capabilities, multilingual text-to-speech conversion, and voice customization options. The technology produces remarkably human-like voices with appropriate emotional intonation and natural cadence. Users can generate voiceovers in multiple languages, clone their own voice with just a few minutes of sample audio, or choose from a library of pre-made voices. ElevenLabs provides both web interface and API access for integration into various applications.",
    shortDescription: "AI voice generation platform creating natural-sounding, expressive synthetic voices.",
    category: ["Voice Generation", "Content Creation", "Transcription"],
    features: [
      "Natural-sounding voice synthesis",
      "Voice cloning capabilities",
      "Multilingual support (30+ languages)",
      "Emotion and emphasis control",
      "Adjustable voice settings"
    ],
    pricing: "Freemium",
    rating: 4.7,
    reviewCount: 842,
    apiAccess: true,
    pros: [
      "Exceptionally natural-sounding voices",
      "Extensive language support",
      "Simple voice cloning process",
      "Good free tier for testing",
      "Comprehensive API documentation"
    ],
    cons: [
      "Higher costs for premium voices and features",
      "Usage limits on free tier",
      "Occasional pronunciation issues with specialized terms",
      "Cloned voices require fine-tuning for best results"
    ],
    useCases: [
      "Creating voiceovers for videos and presentations",
      "Developing accessible content for visually impaired users",
      "Localizing content into multiple languages",
      "Audiobook production",
      "Interactive voice applications and games"
    ]
  }
];
