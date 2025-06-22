'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Room } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Users, Wifi, Car, Coffee } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'shared': return 'bg-green-100 text-green-800';
      case 'dorm': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge className={getTypeColor(room.type)}>
              {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
            </Badge>
          </div>
          {!room.available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive" className="text-white">Unavailable</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">${room.price}</div>
            <div className="text-sm text-gray-500">per night</div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{room.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Users className="h-4 w-4 mr-1" />
          <span>Up to {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{room.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Link href={`/reservation?roomId=${room.id}`} className="w-full">
          <Button 
            className="w-full" 
            disabled={!room.available}
            variant={room.available ? "default" : "secondary"}
          >
            {room.available ? 'Book Now' : 'Unavailable'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}