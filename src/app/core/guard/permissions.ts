interface Permission {
  default: string;
  routes: string[];
  role: string;
}

export const SUPERADMIN: Permission = {
  default: 'accounts',
  role: 'superadmin',
  routes: ['accounts'],
};

export const ADMIN: Permission = {
  default: 'dashboard/students',
  role: 'superadmin',
  routes: ['students', 'organizations', 'classes', 'contents', 'locations'],
};
