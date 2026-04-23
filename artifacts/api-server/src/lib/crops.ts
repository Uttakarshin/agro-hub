export type CropDef = {
  id: string;
  name: string;
  scientificName: string;
  emoji: string;
  description: string;
  commonDiseases: string[];
};

export const CROPS: CropDef[] = [
  {
    id: "tomato",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    emoji: "🍅",
    description: "Warm-season fruit crop, susceptible to leaf blight and mosaic viruses.",
    commonDiseases: ["Early Blight", "Late Blight", "Leaf Mold", "Septoria Leaf Spot", "Mosaic Virus"],
  },
  {
    id: "potato",
    name: "Potato",
    scientificName: "Solanum tuberosum",
    emoji: "🥔",
    description: "Cool-season tuber crop, prone to early and late blight.",
    commonDiseases: ["Early Blight", "Late Blight", "Black Scurf"],
  },
  {
    id: "corn",
    name: "Corn (Maize)",
    scientificName: "Zea mays",
    emoji: "🌽",
    description: "Staple cereal grain affected by rust and leaf spot fungi.",
    commonDiseases: ["Common Rust", "Northern Leaf Blight", "Gray Leaf Spot"],
  },
  {
    id: "rice",
    name: "Rice",
    scientificName: "Oryza sativa",
    emoji: "🌾",
    description: "Staple grain affected by blast and bacterial blight.",
    commonDiseases: ["Rice Blast", "Bacterial Leaf Blight", "Brown Spot"],
  },
  {
    id: "wheat",
    name: "Wheat",
    scientificName: "Triticum aestivum",
    emoji: "🌾",
    description: "Cereal crop affected by rusts and powdery mildew.",
    commonDiseases: ["Stripe Rust", "Leaf Rust", "Powdery Mildew", "Septoria"],
  },
  {
    id: "apple",
    name: "Apple",
    scientificName: "Malus domestica",
    emoji: "🍎",
    description: "Pome fruit tree affected by scab, rust, and fire blight.",
    commonDiseases: ["Apple Scab", "Cedar Apple Rust", "Fire Blight"],
  },
  {
    id: "grape",
    name: "Grape",
    scientificName: "Vitis vinifera",
    emoji: "🍇",
    description: "Vine fruit affected by powdery mildew and black rot.",
    commonDiseases: ["Powdery Mildew", "Black Rot", "Downy Mildew", "Esca"],
  },
  {
    id: "pepper",
    name: "Bell Pepper",
    scientificName: "Capsicum annuum",
    emoji: "🫑",
    description: "Capsicum affected by bacterial spot and anthracnose.",
    commonDiseases: ["Bacterial Spot", "Anthracnose", "Powdery Mildew"],
  },
  {
    id: "soybean",
    name: "Soybean",
    scientificName: "Glycine max",
    emoji: "🫘",
    description: "Legume crop affected by rust and frogeye leaf spot.",
    commonDiseases: ["Soybean Rust", "Frogeye Leaf Spot", "Septoria Brown Spot"],
  },
  {
    id: "cotton",
    name: "Cotton",
    scientificName: "Gossypium hirsutum",
    emoji: "🌱",
    description: "Fiber crop affected by leaf curl and bacterial blight.",
    commonDiseases: ["Leaf Curl", "Bacterial Blight", "Alternaria Leaf Spot"],
  },
];

export function findCrop(id: string): CropDef | undefined {
  return CROPS.find((c) => c.id === id);
}
