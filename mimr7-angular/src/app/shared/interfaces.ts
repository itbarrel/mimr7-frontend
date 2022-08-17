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
