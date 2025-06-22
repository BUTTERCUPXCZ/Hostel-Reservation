export interface Room {
  id: string;
  name: string;
  type: 'single' | 'shared' | 'dorm';
  price: number;
  capacity: number;
  amenities: string[];
  image: string;
  available: boolean;
  description: string;
}

export interface Reservation {
  id: string;
  roomId: string;
  roomName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
  guestDetails: GuestDetails;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}