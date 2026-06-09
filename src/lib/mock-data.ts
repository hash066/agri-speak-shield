export const supportedCrops = [
  { name: "Tomato", emoji: "🍅" },
  { name: "Wheat", emoji: "🌾" },
  { name: "Rice", emoji: "🌾" },
  { name: "Grape", emoji: "🍇" },
  { name: "Potato", emoji: "🥔" },
  { name: "Corn", emoji: "🌽" },
  { name: "Cotton", emoji: "🌿" },
  { name: "Chili", emoji: "🌶️" },
];

export const diseaseResult = {
  name: "Late Blight",
  scientific: "Phytophthora infestans",
  confidence: 92,
  severity: "Moderate" as const,
  crop: "Tomato",
  summary:
    "Early-to-mid stage fungal infection detected on the leaf surface. Spread risk is elevated due to recent humidity.",
  alternatives: [
    { name: "Early Blight", confidence: 6 },
    { name: "Septoria Leaf Spot", confidence: 2 },
  ],
  reasons: [
    "Dark water-soaked lesions on leaf margins",
    "White fungal growth on the underside",
    "Pattern consistent with Phytophthora",
  ],
  actions: [
    "Remove and destroy affected leaves immediately",
    "Apply copper-based fungicide within 24 hours",
    "Improve airflow between plants",
    "Avoid overhead watering for 7 days",
  ],
};

export const weatherRisk = {
  score: 72,
  level: "High" as const,
  humidity: 84,
  temperature: 26,
  rainfall: 12,
  wind: 9,
  trend: [
    { day: "Mon", risk: 35 },
    { day: "Tue", risk: 42 },
    { day: "Wed", risk: 50 },
    { day: "Thu", risk: 58 },
    { day: "Fri", risk: 65 },
    { day: "Sat", risk: 70 },
    { day: "Sun", risk: 72 },
  ],
  likelyDiseases: [
    { name: "Late Blight", probability: 68 },
    { name: "Powdery Mildew", probability: 41 },
    { name: "Downy Mildew", probability: 33 },
  ],
};

export const reports = [
  { id: "R-1042", date: "2026-06-08", crop: "Tomato", disease: "Late Blight", severity: "Moderate", confidence: 92, action: "Sprayed copper fungicide" },
  { id: "R-1041", date: "2026-06-05", crop: "Grape", disease: "Powdery Mildew", severity: "Mild", confidence: 88, action: "Sulfur dust applied" },
  { id: "R-1038", date: "2026-06-01", crop: "Wheat", disease: "Rust", severity: "Severe", confidence: 95, action: "Tebuconazole spray" },
  { id: "R-1035", date: "2026-05-28", crop: "Rice", disease: "Healthy", severity: "Healthy", confidence: 97, action: "Routine monitoring" },
  { id: "R-1030", date: "2026-05-22", crop: "Potato", disease: "Early Blight", severity: "Moderate", confidence: 84, action: "Mancozeb spray" },
];

export const adminStats = {
  users: 12480,
  scans: 48230,
  conversations: 21890,
  alerts: 142,
  diseaseDistribution: [
    { name: "Late Blight", value: 32 },
    { name: "Powdery Mildew", value: 24 },
    { name: "Rust", value: 18 },
    { name: "Downy Mildew", value: 14 },
    { name: "Other", value: 12 },
  ],
  languageUsage: [
    { language: "Kannada", value: 42 },
    { language: "Hindi", value: 35 },
    { language: "English", value: 23 },
  ],
  popularCrops: [
    { crop: "Tomato", scans: 9200 },
    { crop: "Wheat", scans: 7800 },
    { crop: "Grape", scans: 6100 },
    { crop: "Rice", scans: 5400 },
    { crop: "Potato", scans: 4900 },
  ],
};

export const testimonials = [
  { name: "Ramesh K.", role: "Farmer, Mysuru", quote: "AgriShield detected blight a week before I noticed it. Saved my crop." },
  { name: "Anita S.", role: "Agronomist", quote: "The Kannada voice assistant is a game changer for rural outreach." },
  { name: "Vijay P.", role: "Student, UAS", quote: "Treatment advice is precise and easy to follow." },
];
