// Single source for site copy, stats and contact details.
// Sources: Edna/instruction.txt (home copy + live counters), Concept Note, Sponsorship Proposal,
// 2025 Wrap-up. Update numbers here only; components read from this file.

export const site = {
  name: 'Shoe for the Shoeless',
  domain: 'shoefortheshoeless.org',
  url: 'https://shoefortheshoeless.org',
  tagline:
    'Making affordable, durable shoes the norm for every African child, so no child ever has to walk to school barefoot.',
  contact: {
    email: 'shoefortheshoeless@gmail.com',
    phoneDisplay: '053 916 0861',
    phoneIntl: '+233539160861',
    momo: { number: '053 916 0861', name: 'Edna Frimpong' },
  },
  social: {
    instagram: 'https://www.instagram.com/shoe_4_the_shoeless_official/',
    instagramHandle: '@shoe_4_the_shoeless_official',
    linkedin: 'https://www.linkedin.com/company/linkedgh/',
    founderSite: 'https://ednafrimpong.com',
  },
} as const;

// Live counters. Keep these honest: update after each distribution (see `communities`).
export const stats = [
  { value: 530, prefix: '', suffix: '', label: 'pairs delivered' },
  { value: 10, prefix: '', suffix: '', label: 'communities reached' },
  { value: 10, prefix: '$', suffix: '', label: 'cost per pair' },
] as const;

// Project 1 Million: Edna's mission is one million pairs. The progress bar tracks the next
// milestone so it stays readable while the count is small.
export const project = {
  name: 'Project 1 Million',
  goal: 1_000_000,
  nextMilestone: 1000,
} as const;

// Donation form presets in US dollars ($10 = one pair). The server converts to cedis at the
// live rate (src/lib/fx.ts) and Paystack charges GHS, so card, Mobile Money and bank all work.
export const donation = {
  currency: 'USD',
  costPerPair: 10,
  presets: [10, 25, 50, 100, 250],
  defaultAmount: 50,
  min: 5,
} as const;

export const problem = {
  eyebrow: 'The problem',
  title: 'Sore feet keep children out of class.',
  body:
    'A child without shoes risks cuts, infections, and long, painful walks to school. Some stay home altogether. Families want their children in shoes, but a reliable, affordable, repeatable way to provide them doesn’t exist at scale. We’re building one.',
  facts: [
    { figure: '300M', text: 'children worldwide go barefoot every day.' },
    { figure: '40%', text: 'of people on earth walk barefoot daily.' },
  ],
} as const;

export const bigIdea = {
  eyebrow: 'The big idea',
  title: 'A pair of shoes is a small thing. Getting it to every child is a system.',
  body:
    'We design a simple blueprint for sourcing, fitting, and delivering durable footwear at the lowest possible cost per pair, then prove it school by school.',
  steps: [
    {
      title: 'Made in Ghana',
      body: 'Handcrafted by a team of 10 local shoemakers, with soles cut from recycled tyres and materials sourced in Ghana. Durable, affordable, and fair-wage.',
    },
    {
      title: 'Fitted in person',
      body: 'We work with community leaders and schools to find the children most in need, then fit every pair by hand on distribution day.',
    },
    {
      title: 'More than shoes',
      body: 'Mentorship talks, exercise books, water bottles and school supplies travel with every pair. The shoes stand for wider support.',
    },
  ],
} as const;

// Distribution so far (updated list from Edna). Must add up to stats[0].
export const communities = [
  { name: 'Asikabew', pairs: 87 },
  { name: 'Afienya', pairs: 144 },
  { name: 'Oti', pairs: 51 },
  { name: 'Kwabenya', pairs: 10 },
  { name: 'Accra', pairs: 38 },
  { name: 'Otukwadwokrom', pairs: 60 },
  { name: 'Osubonpanyin', pairs: 30 },
  { name: 'Sankpala', pairs: 30 },
  { name: 'Bentum', pairs: 50 },
  { name: 'Ateyedo', pairs: 30 },
] as const;

// UN Sustainable Development Goals the work is built on (copy from Edna).
// `tone` picks the campaign color for each card.
export const sdgs = {
  eyebrow: 'Aligned with the UN Sustainable Development Goals',
  title: 'Healthy feet. Children in class. Local work. Stronger partnerships.',
  body: 'Shoe for the Shoeless is built on four of the UN’s Sustainable Development Goals.',
  goals: [
    {
      number: 3,
      name: 'Good Health and Well-being',
      body: 'Shoes protect children’s feet from cuts, infections, and injury on the road to school.',
      tone: 'leaf',
    },
    {
      number: 4,
      name: 'Quality Education',
      body: 'A child with proper shoes can reach school comfortably and stay in class.',
      tone: 'flame',
    },
    {
      number: 8,
      name: 'Decent Work and Economic Growth',
      body: 'We source and produce locally wherever we can, so every pair of shoes also supports local work. Every pair is handmade in Ghana by a team of 10 local shoemakers, with materials sourced in Ghana, which keeps money in the community.',
      tone: 'plum',
    },
    {
      number: 17,
      name: 'Partnerships for the Goals',
      body: 'We work with schools, suppliers, sponsors, and communities, because no one can put shoes on every child alone.',
      tone: 'sea',
    },
  ],
} as const;

export const inspiration = {
  verse:
    'Every place that the sole of your foot shall tread upon, that have I given unto you.',
  reference: 'Joshua 1:3',
  body:
    'Every child’s steps lead somewhere. We want them to take those steps well, in school and in places that look impossible to them.',
} as const;

export const founder = {
  name: 'Edna Frimpong',
  alias: 'The ShoemakerGurl',
  intro:
    'Edna is a shoemaker and social advocate with eight years in social work. She started Shoe for the Shoeless to put durable, locally made shoes on the feet of children who walk to school barefoot, and trains local workmen in the craft so they can build their own futures.',
  honours: [
    'Ghana Grow Young Innovators Award 2024, Mastercard Foundation & Springboard Roadshow Foundation',
    'One of Ghana’s 40 Under 40 awardees in shoemaking',
    'Youngest Iconic Female Shoemaker, named by WestlionCo',
    'One of WestlionCo’s 35 Under 35 promising female entrepreneurs',
    'Ghana’s LinkedIn Top Voice, by Favikon',
    'Author of “The Shoemaker Gurl” and co-founder of Ahofade',
  ],
  quote: 'This is the Lord’s project. I’m just a steward, entrusted with his work.',
} as const;

// Partner wall. Logos live in /public/partners (trimmed, on white). No logo -> name tile.
type Partner = { name: string; url?: string; logo?: { src: string; w: number; h: number } };
export const partners: readonly Partner[] = [
  {
    name: 'Triple A Foundation',
    url: 'https://tripleafoundationgh.org/',
    logo: { src: '/partners/triple-a-foundation.png', w: 592, h: 285 },
  },
  { name: 'Ahofade', url: 'https://www.ahofade.com/', logo: { src: '/partners/ahofade.png', w: 296, h: 112 } },
  { name: 'Cosmo Cosmetics', logo: { src: '/partners/cosmo-cosmetics.png', w: 628, h: 274 } },
  { name: 'Emerald Chain Hub' },
  { name: 'Evolve.You' },
  { name: 'The Adelaide Vera' },
];

export const nav = [
  { label: 'The problem', href: '#problem' },
  { label: 'Our work', href: '#our-work' },
  { label: 'Impact', href: '#impact' },
  { label: 'Our story', href: '#story' },
  { label: 'Get involved', href: '#get-involved' },
] as const;
