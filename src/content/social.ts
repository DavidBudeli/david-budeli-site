export const social = [
  {
    url: "https://wa.me/5541999360874?text=Ol%C3%A1%2C%20David!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.",
    name: "whatsapp",
  },
  { url: "https://github.com/DavidBudeli", name: "github" },
  { url: "https://www.instagram.com/davidbudeli/", name: "instagram" },
  { url: "mailto:consultoria@davidbudeli.com", name: "mail" },
] as const satisfies { url: string; name: "whatsapp" | "mail" | "github" | "instagram" }[];
