export type Cat = {
  id: string;
  ownerId: string;
  name: string;
  ras: string;
  age: number;
  weight: number;
  medicalHistory: string;
  specialNote?: string;
  vaccinationStatus: "vaccinated" | "not_vaccinated";
  vaccineExpirationDate?: string;
};

export type CatPayload = {
  name: string;
  ras: string;
  age: number;
  weight: number;
  medicalHistory: string;
  specialNote: string;
  vaccinationStatus: "vaccinated" | "not_vaccinated";
  vaccineExpirationDate?: string;
};
