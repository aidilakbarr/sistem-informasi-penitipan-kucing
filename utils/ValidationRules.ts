import { Role } from "@/types/dashboard";

export const isValidRole = (role: string): role is Role => {
  return ["ADMIN", "CUSTOMER", "COURIER", "CARETAKER"].includes(role);
};
