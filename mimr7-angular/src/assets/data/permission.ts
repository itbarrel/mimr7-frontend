export const PERMISSION = [
  {
    role: 'SuperAdmin',
    sites: ['accounts'],
    default: 'accounts',
    navigation: [{ name: 'Accounts', url: 'accounts', icon: 'corporate_fare' }],
  },
  {
    role: 'Admin',
    sites: ['organizations'],
    default: 'organizations',
    navigation: [
      { name: 'Organizations', url: 'organizations', icon: 'corporate_fare' },
    ],
  },
];
