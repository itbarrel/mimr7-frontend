export const PERMISSION = [
  {
    role: 'SuperAdmin',
    sites: ['accounts'],
    default: 'accounts',
    navigation: [{ title: 'Accounts', path: 'accounts', icon: 'nc-bank',class:'' }],
  },
  {
    role: 'Admin',
    sites: ['organizations','collections','contents','highlights','locations','collectionslibrary','highlightslibrary','home'],
    default: 'home',
    navigation: [
      { title: 'Organizations', path: 'organizations', icon: 'nc-bank', class:'' },
      { title: 'Collections', path: 'collections', icon: 'nc-single-copy-04', class:'' },
      { title: 'Collections Library', path: 'collectionslibrary', icon: 'nc-book-bookmark', class:'' },
      { title: 'Highlights', path: 'highlights', icon: 'nc-bulb-63', class:'' },
      { title: 'Highlights Library', path: 'highlightslibrary', icon: 'nc-briefcase-24', class:'' },
      { title: 'Locations', path: 'locations', icon: 'nc-pin-3', class:'' },
    ],
  },
];
