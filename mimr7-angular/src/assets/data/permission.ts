export const PERMISSION = [
  {
    role: 'SuperAdmin',
    sites: ['accounts'],
    default: 'accounts',
    navigation: [{ title: 'Accounts', path: 'accounts', icon: 'nc-bank',class:'' }],
  },
  {
    role: 'Admin',
    sites: ['organizations','collections'],
    default: 'organizations',
    navigation: [
      { title: 'Organizations', path: 'organizations', icon: 'nc-bank', class:'' },
      { title: 'Collections', path: 'collections', icon: 'nc-single-copy-04', class:'' },
    ],
  },
];
