export interface Organization {
  slug: string;
  name: string;
  category: string;
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