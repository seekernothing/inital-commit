/* ============================================================================
   Typed content constants for SignalsHQ. Components map over these arrays so
   copy lives in one place. Every string is a 1:1 port of the prototype.
   ============================================================================ */

/* ---------- Navigation (mega-menu) ---------- */
export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  heading: string;
  muted: boolean;
  links: NavLink[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Platform",
    muted: true,
    links: [
      { label: "Product demo", href: "#demo" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Resources",
    muted: false,
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    heading: "Company",
    muted: true,
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

/* ---------- Receipt ---------- */
export interface ReceiptRow {
  label: string;
  value: string;
  muted?: boolean;
}

export const RECEIPT_ROWS: ReceiptRow[] = [
  { label: "Tax Assist · IRS citations", value: "INCLUDED" },
  { label: "Federal + SALT · 50 states", value: "INCLUDED" },
  { label: "Client Organizer · auto-intake", value: "95%+" },
  { label: "Searchable client archive", value: "YES" },
  { label: "Client Review · workpapers", value: "SOON" },
];

export const RECEIPT_SUBTOTAL: ReceiptRow[] = [
  { label: "SUBTOTAL · HOURS SPENT", value: "1,000+", muted: true },
  { label: "SIGNALSHQ AUTOMATION (−70%)", value: "−700", muted: true },
];

/* ---------- Stats ---------- */
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 95, suffix: "%+", label: "Extraction accuracy" },
  { value: 50, suffix: "", label: "States covered" },
  { value: 70, suffix: "%", label: "Faster prep" },
];

/* ---------- Pricing ---------- */
export interface PricingPlan {
  id: "free" | "solo" | "team";
  name: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    unit: " /mo",
    features: ["25 tax questions / month", "Federal coverage only", "1 seat"],
    cta: "Start free",
  },
  {
    id: "solo",
    name: "Solo",
    price: "$49",
    unit: " /mo",
    features: [
      "Unlimited Tax Assist",
      "Federal + all 50 states",
      "Organizer · 200 docs / mo",
    ],
    cta: "Book a demo",
  },
  {
    id: "team",
    name: "Team",
    price: "$99",
    unit: " /seat",
    features: [
      "Everything in Solo",
      "Client Review early access",
      "SSO + role-based access",
    ],
    cta: "Talk to sales",
  },
];

/** Solo is the default-selected tier in the prototype. */
export const DEFAULT_PLAN_INDEX = 1;

/* ---------- Footer ---------- */
export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Tax Assist", href: "#" },
      { label: "Client Organizer", href: "#" },
      { label: "Client Review", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Security", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "SOC 2", href: "#" },
    ],
  },
];

/* ---------- Shared media / assets ---------- */
/** Public CloudFront clip used by the hero and footer backgrounds. */
export const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

/** Local clip played inside the demo player (same file the prototype used). */
export const DEMO_VIDEO_URL = "/2x378fIygBv140XOirg1Pq8E.mp4";

export const LOGO_SRC = "/image.png";

export const SOUND = {
  navEnter: "/assets/smoothing-exit.webm",
  navExit: "/assets/smoothing-enter.webm",
  shutter: "/assets/mixkit-camera-shutter-click-1133.wav",
} as const;
