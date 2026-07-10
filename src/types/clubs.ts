export interface Organization {
  slug: string;
  name: string;
  abbreviation: string;
  school: string;
  logo: string;
  description: string;
  moderator: {
    name: string;
    image: string;
  };
  contact: {
    email: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  gallery: string[];
}