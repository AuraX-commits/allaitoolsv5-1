
export interface TechHub {
  city: string;
  state?: string;
  country: string;
  region: string;
  keywords: string[];
  population?: string;
  techCompanies?: string[];
}

export const TECH_HUBS: TechHub[] = [
  // USA Tech Hubs
  {
    city: "San Francisco",
    state: "California",
    country: "USA",
    region: "North America",
    keywords: ["silicon valley", "bay area", "tech startup", "venture capital", "fintech", "ai companies"],
    population: "870k",
    techCompanies: ["Google", "Facebook", "Uber", "Airbnb", "Salesforce"]
  },
  {
    city: "Seattle",
    state: "Washington",
    country: "USA",
    region: "North America",
    keywords: ["amazon", "microsoft", "cloud computing", "enterprise software", "gaming"],
    population: "750k",
    techCompanies: ["Amazon", "Microsoft", "Boeing", "Expedia"]
  },
  {
    city: "Austin",
    state: "Texas",
    country: "USA",
    region: "North America",
    keywords: ["sxsw", "dell", "tech meetups", "startup ecosystem", "music tech"],
    population: "965k",
    techCompanies: ["Dell", "IBM", "Oracle", "Indeed"]
  },
  {
    city: "Boston",
    state: "Massachusetts",
    country: "USA",
    region: "North America",
    keywords: ["mit", "harvard", "biotech", "fintech", "edtech", "robotics"],
    population: "685k",
    techCompanies: ["HubSpot", "Wayfair", "TripAdvisor"]
  },
  {
    city: "New York",
    state: "New York",
    country: "USA",
    region: "North America",
    keywords: ["wall street", "fintech", "media tech", "adtech", "fashion tech"],
    population: "8.3M",
    techCompanies: ["Goldman Sachs", "JPMorgan", "IBM", "Google"]
  },
  {
    city: "Los Angeles",
    state: "California",
    country: "USA",
    region: "North America",
    keywords: ["hollywood", "entertainment tech", "media", "gaming", "streaming"],
    population: "4M",
    techCompanies: ["Snapchat", "SpaceX", "Netflix", "Disney"]
  },
  {
    city: "Denver",
    state: "Colorado",
    country: "USA",
    region: "North America",
    keywords: ["outdoor tech", "cannabis tech", "aerospace", "telecommunications"],
    population: "715k",
    techCompanies: ["Arrow Electronics", "DaVita", "Liberty Media"]
  },
  {
    city: "Chicago",
    state: "Illinois",
    country: "USA",
    region: "North America",
    keywords: ["fintech", "logistics tech", "manufacturing tech", "trading"],
    population: "2.7M",
    techCompanies: ["Boeing", "Abbott", "McDonald's", "Groupon"]
  },
  
  // Europe Tech Hubs
  {
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    keywords: ["fintech capital", "banking tech", "ai research", "blockchain", "insurtech"],
    population: "9M",
    techCompanies: ["DeepMind", "Revolut", "Monzo", "Wise"]
  },
  {
    city: "Berlin",
    country: "Germany",
    region: "Europe",
    keywords: ["startup hub", "b2b saas", "mobility tech", "rocket internet", "zalando"],
    population: "3.7M",
    techCompanies: ["SAP", "Zalando", "Delivery Hero", "N26"]
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    region: "Europe",
    keywords: ["booking.com", "adyen", "payment tech", "travel tech", "logistics"],
    population: "870k",
    techCompanies: ["Booking.com", "Adyen", "TomTom", "Philips"]
  },
  {
    city: "Stockholm",
    country: "Sweden",
    region: "Europe",
    keywords: ["spotify", "klarna", "gaming", "fintech", "music tech", "unicorns"],
    population: "975k",
    techCompanies: ["Spotify", "Klarna", "King", "Ericsson"]
  },
  {
    city: "Paris",
    country: "France",
    region: "Europe",
    keywords: ["station f", "ai research", "luxury tech", "telecom", "aerospace"],
    population: "2.2M",
    techCompanies: ["Dassault Systèmes", "Capgemini", "Atos", "Orange"]
  },
  {
    city: "Dublin",
    country: "Ireland",
    region: "Europe",
    keywords: ["european headquarters", "data centers", "tax optimization", "cloud services"],
    population: "555k",
    techCompanies: ["Google", "Facebook", "Microsoft", "Apple"]
  },
  {
    city: "Zurich",
    country: "Switzerland",
    region: "Europe",
    keywords: ["fintech", "banking technology", "crypto valley", "wealth management tech"],
    population: "435k",
    techCompanies: ["Credit Suisse", "UBS", "IBM", "Google"]
  },
  {
    city: "Barcelona",
    country: "Spain",
    region: "Europe",
    keywords: ["mobile world congress", "gaming", "travel tech", "smart cities"],
    population: "1.6M",
    techCompanies: ["King", "Typeform", "Glovo", "Wallapop"]
  },
  {
    city: "Tel Aviv",
    country: "Israel",
    region: "Europe",
    keywords: ["cybersecurity", "military tech", "startup nation", "innovation hub"],
    population: "460k",
    techCompanies: ["Check Point", "Wix", "Monday.com", "Fiverr"]
  },
  {
    city: "Munich",
    country: "Germany",
    region: "Europe",
    keywords: ["automotive tech", "bmw", "siemens", "engineering", "iot"],
    population: "1.5M",
    techCompanies: ["BMW", "Siemens", "SAP", "Infineon"]
  }
];

export const generateLocalSeoKeywords = (toolName: string, category: string, pricing: string): string[] => {
  const localKeywords: string[] = [];
  
  TECH_HUBS.forEach(hub => {
    const baseTerms = [
      `${toolName} ${hub.city}`,
      `${category} AI tools ${hub.city}`,
      `best AI tools ${hub.city}`,
      `${toolName} in ${hub.city}`,
      `${category} software ${hub.city}`,
    ];
    
    if (hub.state) {
      baseTerms.push(
        `${toolName} ${hub.state}`,
        `${category} AI ${hub.state}`,
        `AI tools ${hub.city} ${hub.state}`
      );
    }
    
    // Add pricing-specific terms
    if (pricing === 'Free') {
      baseTerms.push(`free AI tools ${hub.city}`);
    }
    
    // Add tech hub specific terms
    hub.keywords.forEach(keyword => {
      baseTerms.push(`${toolName} ${keyword}`, `${category} ${keyword}`);
    });
    
    localKeywords.push(...baseTerms);
  });
  
  return localKeywords.slice(0, 100); // Limit to prevent keyword stuffing
};

export const generateLocalSeoDescription = (toolName: string, category: string, baseDescription: string): string => {
  const majorHubs = ["San Francisco", "New York", "London", "Berlin", "Seattle", "Boston"];
  const hubsText = majorHubs.slice(0, 3).join(", ");
  
  return `${baseDescription} Popular among tech professionals in ${hubsText} and other major tech hubs across the USA and Europe. Join thousands of developers, startups, and enterprises using ${toolName} for ${category} solutions in Silicon Valley, NYC, London's fintech district, Berlin's startup ecosystem, and beyond.`;
};

export const getLocalStructuredData = (toolName: string, category: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": toolName,
    "serviceType": `${category} AI Tool`,
    "areaServed": TECH_HUBS.map(hub => ({
      "@type": "Place",
      "name": hub.city,
      "addressCountry": hub.country,
      ...(hub.state && { "addressRegion": hub.state })
    })),
    "provider": {
      "@type": "Organization",
      "name": "AllAITools.tech"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Tech Professionals, Developers, Startups, Enterprises"
    }
  };
};
