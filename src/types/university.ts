// src/types/university.ts

export type UniversityType = 'PUBLIC' | 'PRIVATE' | 'INTERNATIONAL';

export interface IUniversity {
  id: string;
  name: string;
  code: string;
  location: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  websiteUrl?: string;
  applicationFee?: number;
  type: UniversityType;
  isActive: boolean;
  createdAt: string; // or Date
  updatedAt: string; // or Date
}
