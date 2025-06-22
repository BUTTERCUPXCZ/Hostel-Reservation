import { Room } from '@/types';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Cozy Single Room',
    type: 'single',
    price: 45,
    capacity: 1,
    amenities: ['Private bathroom', 'Wi-Fi', 'Desk', 'Air conditioning'],
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Perfect for solo travelers seeking privacy and comfort.'
  },
  {
    id: '2',
    name: 'Shared Twin Room',
    type: 'shared',
    price: 35,
    capacity: 2,
    amenities: ['Shared bathroom', 'Wi-Fi', 'Lockers', 'Air conditioning'],
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Great for friends traveling together or meeting new people.'
  },
  {
    id: '3',
    name: '6-Bed Dorm',
    type: 'dorm',
    price: 25,
    capacity: 6,
    amenities: ['Shared bathroom', 'Wi-Fi', 'Lockers', 'Common area'],
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Budget-friendly option with a vibrant social atmosphere.'
  },
  {
    id: '4',
    name: 'Deluxe Single Room',
    type: 'single',
    price: 65,
    capacity: 1,
    amenities: ['Private bathroom', 'Wi-Fi', 'Mini fridge', 'Balcony', 'Air conditioning'],
    image: 'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: false,
    description: 'Premium single room with additional amenities and city view.'
  },
  {
    id: '5',
    name: '4-Bed Female Dorm',
    type: 'dorm',
    price: 30,
    capacity: 4,
    amenities: ['Shared bathroom', 'Wi-Fi', 'Lockers', 'Female only'],
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Safe and comfortable female-only dorm room.'
  },
  {
    id: '6',
    name: 'Premium Shared Room',
    type: 'shared',
    price: 50,
    capacity: 2,
    amenities: ['Private bathroom', 'Wi-Fi', 'Mini fridge', 'Desk', 'Air conditioning'],
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Upgraded shared room with private bathroom and modern amenities.'
  }
];