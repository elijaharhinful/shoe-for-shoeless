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
    instagram: 'https://www.instagram.com/shoe_4_the_shoeless',
    linkedin: 'https://www.linkedin.com/in/edna-frimpong',
    founderSite: 'https://ednafrimpong.com',
  },
} as const;

// Live counters (instruction.txt). Keep these honest: update after each distribution.
export const stats = [
  { value: 530, prefix: '', suffix: '', label: 'pairs delivered' },
  { value: 7, prefix: '', suffix: '', label: 'schools reached' },
  { value: 10, prefix: '$', suffix: '', label: 'cost per pair' },
] as const;

export const pairGoal = 1000;

// Donation form presets, in Ghana cedis (Paystack charges in GHS).
export const donation = {
  currency: 'GHS',
  presets: [50, 100, 200, 500, 1000],
  defaultAmount: 200,
  min: 10,
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

export const communities = [
  { name: 'Asikabew', region: 'Eastern', pairs: 47 },
  { name: 'Bentum', region: 'Central', pairs: 50 },
  { name: 'Ateyedo', region: 'Central', pairs: 30 },
  { name: 'Sankpala', region: 'Northern', pairs: 30 },
  { name: 'Accra', region: 'Greater Accra', pairs: 26 },
] as const;

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
    'Ghana 40 Under 40 awardee in shoemaking',
    'Named youngest Iconic Female Shoemaker by WestlionCo',
    'Author of “The Shoemaker Gurl” and co-founder of Ahofade',
  ],
  quote: 'This is the Lord’s project. I’m just a steward, entrusted with his work.',
} as const;

// Partner logo wall: add logos to /public/partners as partnerships grow.
export const partners = [
  { name: 'Ahofade Cosmo Cosmetics' },
  { name: 'Evolve.You' },
  { name: 'The Adelaide Vera' },
] as const;

export const nav = [
  { label: 'The problem', href: '#problem' },
  { label: 'Our work', href: '#our-work' },
  { label: 'Impact', href: '#impact' },
  { label: 'Our story', href: '#story' },
  { label: 'Get involved', href: '#get-involved' },
] as const;
