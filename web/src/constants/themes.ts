export const THEMES = {
  heritage: {
    id: 'heritage',
    name: "Héritage & Luxe",
    bg: "bg-heritage-black",
    text: "text-heritage-text",
    accent: "text-heritage-gold",
    accentBg: "bg-heritage-gold",
    accentHover: "hover:bg-heritage-goldHover",
    border: "border-heritage-gold/30",
    cardBg: "bg-heritage-dark",
    buttonText: "text-black",
    buttonBg: "bg-heritage-gold",
  },
  atelier: {
    id: 'atelier',
    name: "Atelier Moderne",
    bg: "bg-[#fdfdfd]",
    text: "text-[#1a1a1a]",
    accent: "text-[#333]",
    accentBg: "bg-[#333]",
    accentHover: "hover:bg-[#000]",
    border: "border-gray-200",
    cardBg: "bg-white",
    buttonText: "text-white",
    buttonBg: "bg-[#333]",
  },
  performance: {
    id: 'performance',
    name: "Passion & Performance",
    bg: "bg-[#111111]",
    text: "text-white",
    accent: "text-[#E10600]",
    accentBg: "bg-[#E10600]",
    accentHover: "hover:bg-[#B20500]",
    border: "border-[#E10600]/30",
    cardBg: "bg-[#1c1c1c]",
    buttonText: "text-white",
    buttonBg: "bg-[#E10600]",
  }
};

export type ThemeId = keyof typeof THEMES;
