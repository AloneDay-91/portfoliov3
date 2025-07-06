export interface NavigationLink {
  id?: string;
  title: string;
  url: string;
  icon?: string;
  description?: string;
  section: "mes-outils" | "a-propos" | "contact" | "autre";
  order: number;
  active: boolean;
  showBadge?: boolean;
  badgeText?: string;
  badgeDuration?: number; // en jours
  createdAt?: string;
  updatedAt?: string;
}

export interface NavigationSection {
  id: "mes-outils" | "a-propos";
  title: string;
  links: NavigationLink[];
}

export interface ReorderUpdate {
  id: string;
  order: number;
}
