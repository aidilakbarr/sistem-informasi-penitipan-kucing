// ─── Enums ────────────────────────────────────────────────────────────────────

export type Role = "ADMIN" | "CARETAKER" | "CUSTOMER" | "COURIER";

export type BookingStatus =
  | "PENDING"
  | "APPROVED"
  | "CHECKED_IN"
  | "ONGOING"
  | "READY_PICKUP"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus =
  | "UNPAID"
  | "PENDING_VERIFICATION"
  | "PAID"
  | "FAILED";

export type CageStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";

export type ServiceType = "REGULAR" | "VIP" | "GROOMING" | "ANTAR_JEMPUT";

export type DeliveryStatus =
  | "MENUJU_LOKASI"
  | "KUCING_DIJEMPUT"
  | "DALAM_PERJALANAN"
  | "SAMPAI_TUJUAN";

export type ActivityLevel = "AKTIF" | "LEMAS" | "NORMAL";

// ─── Entities ─────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Cat {
  id: string;
  ownerId: string;
  name: string;
  ras: string;
  age: number;
  weight: number;
  photo?: string;
  medicalHistory: string;
  vaccinationStatus: boolean;
  vaccineExpirationDate?: string;
  specialNote?: string;
}

export interface Cage {
  id: string;
  name: string;
  type: "REGULAR" | "VIP";
  status: CageStatus;
  capacity: number;
  currentOccupant?: string;
  notes?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerId: string;
  customerName: string;
  catId: string;
  catName: string;
  cageId?: string;
  cageName?: string;
  caretakerId?: string;
  caretakerName?: string;
  courierId?: string;
  courierName?: string;
  services: ServiceType[];
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  notes?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  bookingCode: string;
  customerName: string;
  amount: number;
  status: PaymentStatus;
  proofUrl?: string;
  verifiedAt?: string;
  createdAt: string;
}

export interface DailyReport {
  id: string;
  bookingId: string;
  catName: string;
  caretakerId: string;
  caretakerName: string;
  date: string;
  isEating: boolean;
  isDrinking: boolean;
  isDefecating: boolean;
  isUrinating: boolean;
  activity: ActivityLevel;
  temperature?: number;
  notes?: string;
  photos: string[];
  isEmergency?: boolean;
}

export interface DeliveryTask {
  id: string;
  bookingId: string;
  bookingCode: string;
  courierId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  catName: string;
  type: "PICKUP" | "DELIVERY";
  scheduledAt: string;
  status: DeliveryStatus;
  proofPhoto?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  message: string;
  sentAt: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  customerId: string;
  customerName: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

// ─── Dashboard Stats ───────────────────────────────────────────────────────────

export interface AdminStats {
  totalActiveBookings: number;
  totalCatsBoarded: number;
  cageOccupancyRate: number;
  todayRevenue: number;
  monthRevenue: number;
  pendingBookings: number;
  pendingPayments: number;
  totalUsers: number;
}

export interface CaretakerStats {
  assignedBookings: number;
  todayReports: number;
  pendingReports: number;
  emergencyAlerts: number;
}

export interface CustomerStats {
  activeBookings: number;
  totalCats: number;
  totalBookings: number;
  pendingPayments: number;
}

export interface CourierStats {
  todayTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalCompleted: number;
}
