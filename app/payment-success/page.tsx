'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, Mail, Phone } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-8" />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing HostelHub. Your reservation has been successfully processed.
          </p>

          <Card className="text-left mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Confirmation Email</p>
                    <p className="text-sm text-gray-600">
                      You'll receive a detailed confirmation email within the next few minutes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Check-in Instructions</p>
                    <p className="text-sm text-gray-600">
                      Detailed check-in instructions will be included in your confirmation email
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">24/7 Support</p>
                    <p className="text-sm text-gray-600">
                      Contact us at +1 (555) 123-4567 if you have any questions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full sm:w-auto" size="lg">
                <Home className="h-4 w-4 mr-2" />
                Return to Homepage
              </Button>
            </Link>
            
            <div className="text-center">
              <Link href="/rooms" className="text-blue-600 hover:text-blue-700 underline">
                Book Another Room
              </Link>
            </div>
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Follow Us</h3>
              <p className="text-sm text-blue-800 mb-4">
                Stay connected for travel tips and special offers
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <span className="text-blue-700">📘 Facebook</span>
                <span className="text-blue-700">📷 Instagram</span>
                <span className="text-blue-700">🐦 Twitter</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}