'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Calendar, Users, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import { Reservation } from '@/types';

export default function ConfirmationPage() {
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedData = localStorage.getItem('reservationData');
      if (storedData) {
        try {
          const reservationData = JSON.parse(storedData);
          setReservation({
            id: `HST-${Date.now()}`,
            ...reservationData,
            status: 'pending'
          });
        } catch (error) {
          console.error('Error parsing reservation data:', error);
          router.push('/reservation');
        }
      } else {
        router.push('/reservation');
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [router]);

  const handleProceedToPayment = async () => {
    if (reservation) {
      setIsProcessingPayment(true);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.setItem('confirmationData', JSON.stringify(reservation));
      router.push('/payment');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading reservation details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reservation Confirmed!</h1>
          <p className="text-xl text-gray-600">Please review your booking details and proceed to payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reservation Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Booking Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Room Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Room:</span> {reservation.roomName}</p>
                      <p><span className="text-gray-600">Type:</span> 
                        <Badge className="ml-2 bg-blue-100 text-blue-800">
                          {reservation.roomType.charAt(0).toUpperCase() + reservation.roomType.slice(1)}
                        </Badge>
                      </p>
                      <p><span className="text-gray-600">Guests:</span> {reservation.guests}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Stay Duration</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Check-in:</span> {new Date(reservation.checkIn).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                      <p><span className="text-gray-600">Check-out:</span> {new Date(reservation.checkOut).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                      <p><span className="text-gray-600">Total nights:</span> {reservation.nights}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Guest Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Primary Guest</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Name:</span> {reservation.guestDetails.firstName} {reservation.guestDetails.lastName}</p>
                      <p><span className="text-gray-600">Email:</span> {reservation.guestDetails.email}</p>
                      {reservation.guestDetails.phone && (
                        <p><span className="text-gray-600">Phone:</span> {reservation.guestDetails.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  {reservation.guestDetails.specialRequests && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Special Requests</h3>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {reservation.guestDetails.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p><strong>Free Cancellation:</strong> Cancel up to 24 hours before check-in for a full refund</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p><strong>Check-in Time:</strong> 3:00 PM - 11:00 PM</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p><strong>Check-out Time:</strong> 11:00 AM</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p><strong>ID Required:</strong> Please bring a valid photo ID for check-in</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Reservation ID</div>
                  <div className="text-lg font-mono bg-gray-100 p-2 rounded text-center">
                    {reservation.id}
                  </div>
                </div>

                <div className="space-y-2 text-sm border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room rate per night:</span>
                    <span>${(reservation.totalAmount / reservation.nights).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of nights:</span>
                    <span>{reservation.nights}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">${reservation.totalAmount}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleProceedToPayment} 
                    className="w-full" 
                    size="lg"
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <div className="flex items-center space-x-2">
                        <LoadingSpinner size="sm" />
                        <span>Preparing Payment...</span>
                      </div>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                  
                  <Link href="/reservation">
                    <Button variant="outline" className="w-full" disabled={isProcessingPayment}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Modify Reservation
                    </Button>
                  </Link>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">HostelHub</p>
                      <p>123 Downtown Street</p>
                      <p>Phone: +1 (555) 123-4567</p>
                      <p>Email: info@hostelhub.com</p>
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