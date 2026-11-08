export type TagVariant =
  | "product"
  | "ai"
  | "automation"
  | "payments"
  | "analytics"
  | "design"
  | "conversion"
  | "seo"
  | "next"
  | "performance";

export const tagLabels = {
  product: "Product",
  ai: "AI",
  automation: "Automation",
  payments: "Payments",
  analytics: "Analytics",
  design: "Design Systems",
  conversion: "Conversion",
  seo: "SEO",
  next: "Next.js",
  performance: "Performance",
} as const satisfies Record<TagVariant, string>;
