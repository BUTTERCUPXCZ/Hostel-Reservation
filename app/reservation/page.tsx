'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';
import { rooms } from '@/lib/data';
import { Room, GuestDetails } from '@/types';

export default function ReservationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams?.get('roomId');

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      if (roomId) {
        const room = rooms.find(r => r.id === roomId);
        if (room) {
          setSelectedRoom(room);
          setGuests(1);
        }
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [roomId]);

  const calculateNights = useCallback(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [checkIn, checkOut]);

  const calculateTotal = useCallback(() => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  }, [selectedRoom, calculateNights]);

  const handleRoomChange = useCallback((value: string) => {
    startTransition(() => {
      const room = rooms.find(r => r.id === value);
      if (room) {
        setSelectedRoom(room);
        setGuests(1);
      }
    });
  }, []);

  const handleGuestDetailsChange = useCallback((field: keyof GuestDetails, value: string) => {
    setGuestDetails(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom || !checkIn || !checkOut || !guestDetails.firstName || !guestDetails.lastName || !guestDetails.email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const reservationData = {
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        roomType: selectedRoom.type,
        checkIn,
        checkOut,
        nights: calculateNights(),
        guests,
        totalAmount: calculateTotal(),
        guestDetails
      };

      // Store reservation data for confirmation page
      localStorage.setItem('reservationData', JSON.stringify(reservationData));
      router.push('/confirmation');
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('There was an error processing your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Reservation</h1>
          <p className="text-xl text-gray-600">Complete your booking in just a few steps</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Select Room</span>
                    {isPending && <LoadingSpinner size="sm" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={selectedRoom?.id || ''} 
                    onValueChange={handleRoomChange}
                    disabled={isPending}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.filter(room => room.available).map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{room.name}</span>
                            <span className="ml-4 font-semibold">${room.price}/night</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedRoom && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedRoom.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{selectedRoom.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Up to {selectedRoom.capacity} guests</span>
                            <Badge className="bg-blue-100 text-blue-800">
                              {selectedRoom.type.charAt(0).toUpperCase() + selectedRoom.type.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">${selectedRoom.price}</div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Dates and Guests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Dates & Guests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkin">Check-in Date *</Label>
                      <Input
                        id="checkin"
                        type="date"
                        value={checkIn}
                        min={today}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkout">Check-out Date *</Label>
                      <Input
                        id="checkout"
                        type="date"
                        value={checkOut}
                        min={checkIn || tomorrow}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedRoom && Array.from({ length: selectedRoom.capacity }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Guest Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={guestDetails.firstName}
                        onChange={(e) => handleGuestDetailsChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={guestDetails.lastName}
                        onChange={(e) => handleGuestDetailsChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestDetails.email}
                      onChange={(e) => handleGuestDetailsChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={guestDetails.phone}
                      onChange={(e) => handleGuestDetailsChange('phone', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="requests">Special Requests</Label>
                    <Textarea
                      id="requests"
                      placeholder="Any special requests or requirements..."
                      value={guestDetails.specialRequests}
                      onChange={(e) => handleGuestDetailsChange('specialRequests', e.target.value)}
                      className="h-20"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting || isPending}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Processing Reservation...</span>
                  </div>
                ) : (
                  'Continue to Confirmation'
                )}
              </Button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedRoom ? (
                  <>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedRoom.name}</h3>
                      <Badge className="mt-1 bg-blue-100 text-blue-800">
                        {selectedRoom.type.charAt(0).toUpperCase() + selectedRoom.type.slice(1)}
                      </Badge>
                    </div>
                    
                    {checkIn && checkOut && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-in:</span>
                          <span className="font-medium">{new Date(checkIn).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-out:</span>
                          <span className="font-medium">{new Date(checkOut).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nights:</span>
                          <span className="font-medium">{calculateNights()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guests:</span>
                          <span className="font-medium">{guests}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Room rate:</span>
                        <span>${selectedRoom.price}/night</span>
                      </div>
                      {calculateNights() > 0 && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal ({calculateNights()} nights):</span>
                            <span>${calculateTotal()}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t">
                            <span>Total:</span>
                            <span className="text-blue-600">${calculateTotal()}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Select a room to see booking details
                  </p>
                )}

                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">HostelHub</p>
                      <p>123 Downtown Street</p>
                      <p>Free cancellation up to 24 hours before check-in</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}