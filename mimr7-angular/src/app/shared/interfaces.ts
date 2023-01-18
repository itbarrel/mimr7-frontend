export interface AddAccount {
  name: string;
  description: string;
  organization: {
    name: string;
    city: string;
  };
  admin: {
    userName: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    mobilePhone?: string;
  };
}
export interface Account {
  id: string;
  name: string;
  description: string;
  apikey: string;
  organizationName?: string;
  avatar?: string;
  type?: string;
  category_header?: string;
  messages_font_size?: string;
  messages_font_family?: string;
  status: boolean;
  public: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Organization {
  id?: string;
  name: string;
  city: string;
  active?: boolean;
  AccountId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  region?: string;
  state?: string;
  status?: boolean;
}

export interface Collection {
  id?: string;
  AccountId?: string;
  UserId?: string;
  title: string;
  text?: string;
  type?: string;
  kind?: string;
  private?: boolean;
  saleable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  description?: string;
}
export interface Content {
  id?: string;
  AccountId?: string;
  UserId?: string;
  title: string;
  text?: string;
  type?: string;
  kind?: string;
  private?: boolean;
  saleable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  description?: string;
  checked?: boolean;
}
export interface Highlight {
  id?: string;
  order?: number;
  content: string;
  AccountId?: string;
  ContentId?: string;
  CollectionId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Location {
  id?: string;
  address1: string;
  address2: string;
  address3: string;
  mobilePhone: string;
  officePhone: string;
  country: string;
  state: string;
  city: string;
  AccountId?: string;
  type: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
export interface Message {
  id?: string;
  name: string;
  hint: string;
  solution: string;
  AccountId?: string;
  ContentId?: string;
  HighlightId?: string;
  number?: number;
  offset?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface HighlightLibrary {
  id?: string;
  parentType?: string;
  active?: boolean;
  title: string;
  AccountId?: string;
  parentId: string;
  updatedAt?: string;
  createdAt?: string;
  description: string;
  link?: string;
  filename?: string;
  url?: string;
  type?: string;
  mimetype?: string;
  tags?: string;
  deletedAt?: string;
}

export interface CollectionLibrary {
  id?: string;
  parentType?: string;
  active?: boolean;
  title: string;
  AccountId?: string;
  parentId: string;
  updatedAt?: string;
  createdAt?: string;
  description: string;
  link?: string;
  filename?: string;
  url?: string;
  type?: string;
  mimetype?: string;
  tags?: string;
  deletedAt?: string;
}

export interface Student {
  id?: string;
  name: string;
  email: string;
  mobilePhone: string;
  AccountId?: string;
  OrganizationId?: string;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: any;
  checked?: boolean;
}

export interface ClassList {
  id?: string;
  name: string;
  description: string;
  AccountId?: string;
  OrganizationId?: string;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: any;
}
