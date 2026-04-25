export const getDashboardByRole = (role?: string | null) => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "COURIER":
      return "/courier/dashboard";
    case "CARETAKER":
      return "/caretaker/dashboard";
    case "CUSTOMER":
      return "/dashboard";
    default:
      return "/dashboard";
  }
};
