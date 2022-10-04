export interface AddAccount {
  name: String;
  description: String;
  organization: {
    name: String;
    city: String;
  };
  admin: {
    userName: String;
    firstName: String;
    lastName?: String;
    email: String;
    password: String;
    mobilePhone?: String;
  };
}
export interface Account {
  id: String;
  name: String;
  description: String;
  apikey: String;
  organizationName?: String;
  avatar?: String;
  type?: String;
  category_header?: String;
  messages_font_size?: String;
  messages_font_family?: String;
  status: boolean;
  public: boolean;
  active: boolean;
  createdAt: String;
  updatedAt: String;
  deletedAt?: String;
}

export interface Organization {
  id?: String;
  name: String;
  city: String;
  active?: boolean;
  AccountId?: String;
  createdAt?: String;
  updatedAt?: String;
  deletedAt?: String;
  region?: String;
  state?: String;
  status?: boolean;
}

export interface Collection {
  id?: String;
  AccountId?: String;
  UserId?: String;
  title: String;
  text?: String;
  type?: String;
  kind?: String;
  private?: boolean;
  saleable?: boolean;
  createdAt?: String;
  updatedAt?: String;
  deletedAt?: String;
  description?: String;
}

export interface Highlight{
  id?: String;
  order?:number;
  content: String;
  AccountId?: String;
  CollectionId?: String;
  description?: String;
  createdAt?: String;
  updatedAt?: String;
  deletedAt?: String;
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
