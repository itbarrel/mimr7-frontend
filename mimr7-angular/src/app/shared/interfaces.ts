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
}
export interface Highlight {
  id?: string;
  order?: number;
  content: string;
  AccountId?: string;
  ContentId?:string;
  CollectionId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Location {
  id?:string;
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
  name: string;
  hint: string;
  solution: string;
  AccountId?: string;
  CollectionId?: string;
  HighlightId?: string;
  number: number;
  offset: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface HighlightLibrary{
  id?: string;
  parentType?: string;
  active?: boolean;
  title: string;
  AccountId?:string;
  parentId:string;
  updatedAt?:string;
  createdAt?:string;
  description:string;
  link?:string;
  filename?:string;
  url?: string;
  type?: string;
  mimetype?: string;
  tags?: string;
  deletedAt?: string;
}

export interface CollectionLibrary{
  id?: string;
  parentType?: string;
  active?: boolean;
  title: string;
  AccountId?:string;
  parentId:string;
  updatedAt?:string;
  createdAt?:string;
  description:string;
  link?:string;
  filename?:string;
  url?: string;
  type?: string;
  mimetype?: string;
  tags?: string;
  deletedAt?: string;
}
// "highlight": {
//   "id": "d1005ae2-07a4-4d28-8508-45ee6ed8e757",
//   "order": 0,
//   "content": "highlight",
//   "AccountId": "a5c835f5-d8c3-4e2e-9452-16eb756257aa",
//   "CollectionId": "421ff778-1818-42a2-b119-760bd2b5c1fd",
//   "updatedAt": "2022-09-26T11:38:56.135Z",
//   "createdAt": "2022-09-26T11:38:56.135Z",
//   "description": null,
//   "deletedAt": null
// }
// }
