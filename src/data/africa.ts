export const AFRICA = {
  eyebrow: 'Presence',
  title: 'On the ground',
  lead: 'Africa, Asia, Europe and — soon — South America. One desk. Documented metal.',
  photo: '/sourcing/responsible-sourcing.jpg',
  photoAlt: 'AULM on site at an African mine',
  regions: [
    {
      id: 'africa',
      name: 'Africa',
      status: null,
      body: 'Mine interests, collection warehouses and artisanal gold from inspected, state-approved mines. We are working toward our own export licence so locally won gold can move in a closed loop.',
    },
    {
      id: 'asia',
      name: 'Asia',
      status: null,
      body: 'Corridors into Dubai for documented intake. Same OECD screen, same chain of custody — no informal melt, no arbitrary agents.',
    },
    {
      id: 'europe',
      name: 'Europe / Switzerland',
      status: null,
      body: 'Trading of refined bars only — 99.999%. No doré, no scrap, no artisanal intake in Europe. The Swiss and European leg is allocated, refined metal.',
    },
    {
      id: 'south-america',
      name: 'South America',
      status: 'Coming soon',
      body: 'We are not originating in South America yet. When the corridor is documented end to end, it will sit here.',
    },
  ],
  intro: [
    'Arbitrary agents extract the margin and leave the mine with the risk. Local and artisanal operators get more value and more security when they sell to a documented desk — fair terms, OECD due diligence, and a path into Dubai that does not depend on whoever shows up with cash.',
  ],
  sections: [
    {
      title: 'Mine interests',
      body: [
        'In Africa we hold and develop interests in local mining projects — not a one-lot fly-in. Presence means stakes, people on site, and a counterparty the mine can call again. West, Central, North and East Africa included.',
      ],
    },
    {
      title: 'Collection warehouses',
      body: [
        'We run collection warehouses for artisanal gold from inspected, state-approved mines. Lots are received, checked and held under documented chain of custody before they move — not aggregated by whoever is cheapest this week.',
      ],
    },
    {
      title: 'Artisanal gold, state-approved mines',
      body: [
        'Artisanal and small-scale output is part of African gold. We only take metal from mines that are inspected and accepted by the competent authority. KYC/KYB, origin and assay sit on every lot. Undocumented melt does not enter the warehouse.',
      ],
    },
    {
      title: 'Export licence — closed loop',
      body: [
        'We are working toward our own export licence so gold won locally can be processed in a closed loop: origin, warehouse, assay, export and Dubai intake under one responsible counterparty.',
        'The licence is not granted yet. Until it is, every lot still moves under existing permits, OECD due diligence and bank-to-bank settlement.',
      ],
    },
  ],
} as const
