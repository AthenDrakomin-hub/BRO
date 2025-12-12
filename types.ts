export enum ProjectCategory {
  ConflictZone = 'Conflict Zone',
  NaturalDisaster = 'Natural Disaster',
  DiseaseOutbreak = 'Disease Outbreak',
  MalnutritionCrisis = 'Malnutrition Crisis',
}

interface ProjectTranslation {
  title: string;
  description: string;
  longDescription: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  translations: {
    [key: string]: {
      title: string;
      content: string;
    }
  };
  imageUrl?: string;
}

export interface NeededItem {
  id: string;
  category: 'Medical' | 'Logistics' | 'Personnel';
  priority: 'High' | 'Medium' | 'Low';
  translations: {
    [key: string]: {
      name: string;
    }
  };
  quantityNeeded: number;
  quantityFulfilled: number;
}

export interface Project {
  id:string;
  category: ProjectCategory;
  translations: {
    [key: string]: ProjectTranslation;
  };
  goal: number;
  raised: number;
  imageUrl: string;
  location: string;
  urgency?: 'High' | 'Medium' | 'Low';
  updates?: ProjectUpdate[];
  needs?: NeededItem[];
}

export interface Donation {
  id: string;
  amount: number;
  status: 'Succeeded' | 'Pending' | 'Failed';
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}