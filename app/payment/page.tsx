'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, Shield, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Reservation, PaymentDetails } from '@/types';

export default function PaymentPage() {
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('confirmationData');
    if (storedData) {
      try {
        const reservationData = JSON.parse(storedData);
        setReservation(reservationData);
      } catch (error) {
        console.error('Error parsing confirmation data:', error);
        router.push('/reservation');
      }
    } else {
      router.push('/reservation');
    }
  }, [router]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: keyof PaymentDetails, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 3);
    }

    setPaymentDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validatePaymentDetails = () => {
    const cardNumber = paymentDetails.cardNumber.replace(/\s/g, '');
    const expiryParts = paymentDetails.expiryDate.split('/');
    
    // Basic validation
    if (!paymentDetails.cardholderName.trim()) return false;
    if (cardNumber.length < 13 || cardNumber.length > 19) return false;
    if (paymentDetails.cvv.length < 3) return false;
    if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2) return false;
    
    // Check if expiry date is in the future
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    const expiryMonth = parseInt(expiryParts[0]);
    const expiryYear = parseInt(expiryParts[1]);
    
    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      return false;
    }
    
    return true;
  };

  const simulatePayment = async (): Promise<'success' | 'error'> => {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Validate payment details first
    if (!validatePaymentDetails()) {
      return 'error';
    }
    
    const cardNumber = paymentDetails.cardNumber.replace(/\s/g, '');
    
    // Special test card numbers for demo
    const testCards = {
      '4242424242424242': 'success', // Visa success
      '4000000000000002': 'error',   // Visa declined
      '5555555555554444': 'success', // Mastercard success
      '2223003122003222': 'success', // Mastercard success
    };
    
    // Check if it's a known test card
    if (testCards[cardNumber as keyof typeof testCards]) {
      return testCards[cardNumber as keyof typeof testCards] as 'success' | 'error';
    }
    
    // For other cards, use a more generous success rate (80% success)
    // Based on card number checksum for consistency
    const checksum = cardNumber.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    return checksum % 5 !== 0 ? 'success' : 'error'; // 80% success rate
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reservation) return;

    // Basic form validation
    if (!paymentDetails.cardholderName.trim() || 
        !paymentDetails.cardNumber.trim() || 
        !paymentDetails.expiryDate.trim() || 
        !paymentDetails.cvv.trim()) {
      alert('Please fill in all payment fields');
      return;
    }

    setIsProcessing(true);
    
    try {
      const result = await simulatePayment();
      setPaymentResult(result);
      
      if (result === 'success') {
        // Clear stored data
        localStorage.removeItem('reservationData');
        localStorage.removeItem('confirmationData');
        
        // In a real app, you would send this to your backend
        console.log('Payment successful for reservation:', reservation.id);
        
        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push('/payment-success');
        }, 2000);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentResult('error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Secure Payment</h1>
          <p className="text-xl text-gray-600">Complete your booking with our secure payment system</p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <Shield className="h-4 w-4 mr-2" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {paymentResult ? (
                  <div className="text-center py-8">
                    {paymentResult === 'success' ? (
                      <div className="text-center">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-4">
                          Your reservation has been confirmed. You will receive a confirmation email shortly.
                        </p>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Confirmation ID:</strong> {reservation.id}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-4">
                          Please check your payment details and try again. Make sure your card information is correct and the card is not expired.
                        </p>
                        <Button onClick={() => setPaymentResult(null)} variant="outline">
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name *</Label>
                      <Input
                        id="cardholderName"
                        value={paymentDetails.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        required
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        💡 Test cards: 4242 4242 4242 4242 (success), 4000 0000 0000 0002 (declined)
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={paymentDetails.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Lock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium">This is a demo payment system</p>
                          <p>No real charges will be made. Use test card numbers above for guaranteed results.</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Processing Payment...</span>
                        </div>
                      ) : (
                        `Pay $${reservation.totalAmount}`
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{reservation.roomName}</h3>
                  <Badge className="mt-1 bg-blue-100 text-blue-800">
                    {reservation.roomType.charAt(0).toUpperCase() + reservation.roomType.slice(1)}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span>{new Date(reservation.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span>{new Date(reservation.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nights:</span>
                    <span>{reservation.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span>{reservation.guests}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${reservation.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & fees:</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-blue-600">${reservation.totalAmount}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/confirmation">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Confirmation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}