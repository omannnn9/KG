// All page copy in English (source of truth, from the business card and brochure) and French.
// The French is a translation of the English for Ketan to review; it adds no new claims.

export type Lang = 'en' | 'fr';

type Stage = { title: string; summary: string; items: string[] };

export type Copy = {
  htmlLang: string;
  langName: string;
  role: string;
  skip: string;
  nav: { primary: string; about: string; services: string; contact: string; call: string; strap: string };
  langToggle: { label: string };
  hero: {
    title: string;
    headlineBefore: string;
    headlineAccent: string;
    lede: string;
    explore: string;
    portraitAlt: string;
  };
  actions: {
    whatsapp: string;
    whatsappOpening: string;
    whatsappSr: string;
    call: string;
    save: string;
    saved: string;
  };
  whatsappMessage: string;
  emailSubject: string;
  instagram: { label: string; follow: string; newTab: string };
  about: {
    eyebrow: string;
    title: string;
    p1: (business: string, owner: string) => string;
    p2: string;
    principles: { title: string; text: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    stages: Stage[];
    count: (n: number) => string;
    additionalTitle: string;
    additional: string[];
    note: string;
  };
  interlude: { label: string; quote: string; alt: string };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    cardLabel: string;
    phoneLabel: string;
    emailLabel: string;
    instagramLabel: string;
    share: string;
    shareCopied: string;
    shareText: string;
  };
  floating: { long: string; short: string; sr: string };
};

export const content: Record<Lang, Copy> = {
  en: {
    htmlLang: 'en-GB',
    langName: 'English',
    role: 'Director',
    skip: 'Skip to content',
    nav: {
      primary: 'Primary',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      call: 'Call Ketan Gungah on',
      strap: 'Rentals & Property Management',
    },
    langToggle: { label: 'Language' },
    hero: {
      title: 'Director, KG Rentals',
      headlineBefore: 'Refined property management, delivered with ',
      headlineAccent: 'precision.',
      lede: 'A tailored, hands-on service for property owners who value discretion — from finding the right tenant to rent, maintenance and reporting.',
      explore: 'Explore',
      portraitAlt: 'Ketan Gungah, Director of KG Rentals & Property Management, in a dark three-piece suit and red tie',
    },
    actions: {
      whatsapp: 'Message on WhatsApp',
      whatsappOpening: 'Opening WhatsApp…',
      whatsappSr: ' to Ketan Gungah (opens WhatsApp)',
      call: 'Call',
      save: 'Save contact',
      saved: 'Contact card ready',
    },
    whatsappMessage:
      'Hello Ketan, I found the KG Rentals page and would like to enquire about your property management services.',
    emailSubject: 'Property management enquiry',
    instagram: { label: 'Instagram', follow: 'Follow on Instagram', newTab: '(opens in a new tab)' },
    about: {
      eyebrow: 'About KG Rentals',
      title: 'Your property is a valuable asset — and it is treated accordingly.',
      p1: (business, owner) =>
        `${business} is led by its director, ${owner}. The firm offers a discreet, professional and high-standard management service, designed to protect long-term value and optimise returns.`,
      p2: 'Its hands-on approach means attentive oversight, timely execution and consistently high standards across every property it manages.',
      principles: [
        {
          title: 'Meticulous tenant selection',
          text: 'Tenants are sourced and screened with care, because the right tenant protects the value of the property.',
        },
        {
          title: 'Proactive maintenance',
          text: 'Upkeep is coordinated before small issues grow, keeping the property well-maintained, compliant and attractive in the market.',
        },
        {
          title: 'Clear communication',
          text: 'Owners stay informed through direct contact and owner reporting, with every operational detail handled with precision.',
        },
        {
          title: 'A trusted network',
          text: 'Established collaborations with partners across the real estate and property services sector mean seamless coordination.',
        },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'What KG takes care of',
      intro: 'One point of contact for the full life of a rental — so the owner never has to manage the details alone.',
      stages: [
        {
          title: 'Before the tenancy',
          summary: 'Getting the property ready to let and finding the right people to live in it.',
          items: ['Property set-up', 'Tenant sourcing & screening'],
        },
        {
          title: 'During the tenancy',
          summary: 'The lease and the tenant relationship, handled from the first day to the last.',
          items: ['Lease management', 'Check-in and check-out handling', 'Tenant support'],
        },
        {
          title: 'Day-to-day care',
          summary: 'The running of the property, including the periods when it stands empty.',
          items: [
            'Rent collection',
            'Utilities & charges management',
            'Maintenance coordination',
            'Property inspections',
            'Vacant property supervision',
          ],
        },
        {
          title: 'Keeping owners informed',
          summary: 'A clear picture of how the property is being looked after.',
          items: ['Owner reporting'],
        },
      ],
      count: n => `${n} ${n === 1 ? 'service' : 'services'}`,
      additionalTitle: 'Additional services',
      additional: [
        'Licensing and permits',
        'Property photo shoot',
        'Company set-up',
        'Accounting services',
        'Expatriation*',
      ],
      note: '*Ask Ketan for details on expatriation services.',
    },
    interlude: {
      label: 'KG Rentals approach',
      quote:
        '“Our hands-on approach allows owners to enjoy peace of mind while we handle every operational detail with precision and care.”',
      alt: 'A quiet beach with palm trees leaning over clear, shallow water.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Speak with Ketan directly.',
      lede: 'Whether you own a property that needs managing or have a question about a rental, a short WhatsApp message is the quickest way to start.',
      cardLabel: 'Business card',
      phoneLabel: 'Phone & WhatsApp',
      emailLabel: 'Email',
      instagramLabel: 'Instagram',
      share: 'Share this card',
      shareCopied: 'Link copied',
      shareText: 'Ketan Gungah, Director of KG Rentals & Property Management',
    },
    floating: { long: 'Message Ketan on WhatsApp', short: 'WhatsApp', sr: '(opens WhatsApp)' },
  },

  fr: {
    htmlLang: 'fr',
    langName: 'Français',
    role: 'Directeur',
    skip: 'Aller au contenu',
    nav: {
      primary: 'Principale',
      about: 'À propos',
      services: 'Services',
      contact: 'Contact',
      call: 'Appeler Ketan Gungah au',
      strap: 'Location & Gestion immobilière',
    },
    langToggle: { label: 'Langue' },
    hero: {
      title: 'Directeur, KG Rentals',
      headlineBefore: 'Une gestion immobilière raffinée, menée avec ',
      headlineAccent: 'précision.',
      lede: 'Un service sur mesure et attentif pour les propriétaires qui tiennent à la discrétion — de la recherche du bon locataire aux loyers, à l’entretien et au suivi.',
      explore: 'Découvrir',
      portraitAlt:
        'Ketan Gungah, directeur de KG Rentals & Property Management, en costume trois pièces sombre et cravate rouge',
    },
    actions: {
      whatsapp: 'Écrire sur WhatsApp',
      whatsappOpening: 'Ouverture de WhatsApp…',
      whatsappSr: ' à Ketan Gungah (ouvre WhatsApp)',
      call: 'Appeler le',
      save: 'Enregistrer le contact',
      saved: 'Fiche contact prête',
    },
    whatsappMessage:
      'Bonjour Ketan, j’ai découvert la page de KG Rentals et je souhaiterais en savoir plus sur vos services de gestion immobilière.',
    emailSubject: 'Demande de gestion immobilière',
    instagram: { label: 'Instagram', follow: 'Suivre sur Instagram', newTab: '(s’ouvre dans un nouvel onglet)' },
    about: {
      eyebrow: 'À propos de KG Rentals',
      title: 'Votre bien est un actif précieux — il est traité comme tel.',
      p1: (business, owner) =>
        `${business} est dirigée par son directeur, ${owner}. L’entreprise propose une gestion discrète, professionnelle et exigeante, pensée pour préserver la valeur du bien sur le long terme et en optimiser le rendement.`,
      p2: 'Son approche de terrain garantit un suivi attentif, une exécution dans les délais et un niveau d’exigence constant pour chaque bien géré.',
      principles: [
        {
          title: 'Une sélection rigoureuse des locataires',
          text: 'Les locataires sont recherchés et sélectionnés avec soin, car le bon locataire protège la valeur du bien.',
        },
        {
          title: 'Un entretien proactif',
          text: 'L’entretien est coordonné avant que les petits problèmes ne s’aggravent, pour un bien bien tenu, conforme et attractif sur le marché.',
        },
        {
          title: 'Une communication claire',
          text: 'Les propriétaires restent informés grâce à un contact direct et aux rapports aux propriétaires, chaque détail étant traité avec précision.',
        },
        {
          title: 'Un réseau de confiance',
          text: 'Des collaborations établies avec des partenaires de l’immobilier et des services aux biens assurent une coordination fluide.',
        },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Ce dont KG s’occupe',
      intro:
        'Un seul interlocuteur pour toute la vie d’une location — le propriétaire n’a jamais à gérer les détails seul.',
      stages: [
        {
          title: 'Avant la location',
          summary: 'Préparer le bien à la location et trouver les bonnes personnes pour l’occuper.',
          items: ['Mise en place du bien', 'Recherche et sélection des locataires'],
        },
        {
          title: 'Pendant la location',
          summary: 'Le bail et la relation avec le locataire, gérés du premier au dernier jour.',
          items: ['Gestion du bail', 'Gestion des entrées et sorties', 'Accompagnement des locataires'],
        },
        {
          title: 'Au quotidien',
          summary: 'Le fonctionnement du bien, y compris lorsqu’il est inoccupé.',
          items: [
            'Encaissement des loyers',
            'Gestion des charges et abonnements',
            'Coordination de l’entretien',
            'Inspections du bien',
            'Surveillance des biens vacants',
          ],
        },
        {
          title: 'Informer les propriétaires',
          summary: 'Une vision claire de la façon dont le bien est entretenu.',
          items: ['Rapports aux propriétaires'],
        },
      ],
      count: n => `${n} ${n === 1 ? 'service' : 'services'}`,
      additionalTitle: 'Services complémentaires',
      additional: [
        'Licences et permis',
        'Séance photo du bien',
        'Création de société',
        'Services comptables',
        'Expatriation*',
      ],
      note: '*Renseignez-vous auprès de Ketan sur les services d’expatriation.',
    },
    interlude: {
      label: 'L’approche de KG Rentals',
      quote:
        '« Notre approche de terrain permet aux propriétaires d’avoir l’esprit tranquille pendant que nous gérons chaque détail opérationnel avec précision et soin. »',
      alt: 'Une plage paisible, des palmiers penchés au-dessus d’une eau claire et peu profonde.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Parlez directement à Ketan.',
      lede: 'Que vous possédiez un bien à faire gérer ou que vous ayez une question sur une location, un court message WhatsApp est le moyen le plus rapide de commencer.',
      cardLabel: 'Carte de visite',
      phoneLabel: 'Téléphone & WhatsApp',
      emailLabel: 'E-mail',
      instagramLabel: 'Instagram',
      share: 'Partager cette carte',
      shareCopied: 'Lien copié',
      shareText: 'Ketan Gungah, directeur de KG Rentals & Property Management',
    },
    floating: { long: 'Écrire à Ketan sur WhatsApp', short: 'WhatsApp', sr: '(ouvre WhatsApp)' },
  },
};
