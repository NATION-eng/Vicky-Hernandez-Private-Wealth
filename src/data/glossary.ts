export interface GlossaryTerm {
  term: string;
  category: 'Allocation' | 'Performance' | 'Safety & Fiduciary' | 'General';
  definition: string;
  seniorExample: string;
}

export const FINANCIAL_GLOSSARY: GlossaryTerm[] = [
  {
    term: "Asset Allocation",
    category: "Allocation",
    definition: "Dividing your total wealth among different types of investments—such as stocks, bonds, and cash—to balance risk and potential growth.",
    seniorExample: "Like not putting all your eggs in one basket: keeping some money safe in government bonds and cash while having another portion in companies that can grow over time."
  },
  {
    term: "Proposed Allocation",
    category: "Allocation",
    definition: "A recommended strategic framework formulated by your wealth management team. It is not an executed trade, and no capital is deployed until formal authorization is provided.",
    seniorExample: "A disciplined strategy designed to triple invested capital (300% target portfolio value / +200% profit) over time through gradual, progressive compounding."
  },
  {
    term: "Platform Reliability Target (99.9%)",
    category: "Safety & Fiduciary",
    definition: "Our platform-stated operational and reconciliation reliability objective across Northern Trust custody settlement channels.",
    seniorExample: "The target execution standard for daily book-entry custodial accuracy and reconciliation without error."
  },
  {
    term: "Actual Allocation",
    category: "Allocation",
    definition: "The exact distribution of your money right now based on verified records from your custodian bank.",
    seniorExample: "What you currently own as confirmed by your bank statement as of today's date."
  },
  {
    term: "Unrealized Gain / Loss",
    category: "Performance",
    definition: "The change in value of investments you still own today. Because you have not sold them, the gain or loss is on paper only.",
    seniorExample: "If a bond you bought for $10,000 is valued at $10,400 today, you have a paper gain of $400. That value can fluctuate daily until redeemed."
  },
  {
    term: "Net of Fees",
    category: "Performance",
    definition: "Investment returns shown after advisory fees, fund management costs, and custody charges have already been subtracted.",
    seniorExample: "What you truly keep in your pocket, with no hidden costs deducted later."
  },
  {
    term: "Data Source & Provenance",
    category: "Safety & Fiduciary",
    definition: "The verified financial institution or custodian where your actual assets are held and from which our system securely receives daily balance feeds.",
    seniorExample: "We state the exact bank name and timestamp for every single dollar shown on this portal."
  },
  {
    term: "Fixed Income (Bonds)",
    category: "Allocation",
    definition: "Loans made by you to stable governments or high-credit corporations that pay you regular, scheduled interest and return your principal at maturity.",
    seniorExample: "Treasury notes or high-quality corporate bonds designed to provide dependable, predictable income."
  },
  {
    term: "Capital Preservation",
    category: "Safety & Fiduciary",
    definition: "An investment strategy prioritizing the protection of your wealth against loss and inflation over taking risks for aggressive growth.",
    seniorExample: "Protecting what you have worked hard to build so it is there safely for your lifestyle and legacy."
  }
];
