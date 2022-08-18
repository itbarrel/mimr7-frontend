export interface AddOrganization {
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
export interface Organization {
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
