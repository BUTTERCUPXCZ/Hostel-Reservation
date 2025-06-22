'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Wifi, Coffee, Car, Users, Shield, Clock } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: '24/7 security and CCTV monitoring for your peace of mind'
    },
    {
      icon: Wifi,
      title: 'Free Wi-Fi',
      description: 'High-speed internet access throughout the property'
    },
    {
      icon: Coffee,
      title: 'Common Areas',
      description: 'Relax and socialize in our comfortable lounge areas'
    },
    {
      icon: Users,
      title: 'Social Environment',
      description: 'Meet fellow travelers and make lasting memories'
    },
    {
      icon: Car,
      title: 'Great Location',
      description: 'Prime location with easy access to public transport'
    },
    {
      icon: Clock,
      title: '24/7 Reception',
      description: 'Round-the-clock assistance for all your needs'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hostel interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Perfect
            <span className="text-blue-400 block">Stay Awaits</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover comfortable, affordable hostel accommodations with modern amenities
            in the heart of the city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Explore Rooms
              </Button>
            </Link>
            <Link href="/reservation">
              <Button size="lg" variant="outline" className="text-black border-white hover:bg-gray-300 hover:text-gray-900 text-lg px-8 py-4">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to HostelHub
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of comfort, affordability, and community.
              Our modern hostel offers everything you need for an unforgettable stay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                More Than Just a Place to Sleep
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Located in the vibrant heart of the city, HostelHub combines the social
                atmosphere of a traditional hostel with modern amenities and comfort.
                Whether you're a solo traveler, backpacker, or group of friends,
                we provide the perfect base for your urban adventure.
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Downtown Location • 5 min walk to metro station</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                <span>4.8/5 rating • 2,000+ happy guests</span>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Hostel common area"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose HostelHub?
            </h2>
            <p className="text-xl text-gray-600">
              We've thought of everything to make your stay comfortable and memorable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your stay today and join thousands of travelers who've made HostelHub their home away from home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                View Available Rooms
              </Button>
            </Link>
            <Link href="/reservation">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                Make a Reservation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">HostelHub</span>
              </div>
              <p className="text-gray-400">
                Your perfect stay awaits at the most comfortable and affordable hostel in the city.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📍 123 Downtown Street</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ info@hostelhub.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/rooms" className="block text-gray-400 hover:text-white transition-colors">
                  Available Rooms
                </Link>
                <Link href="/reservation" className="block text-gray-400 hover:text-white transition-colors">
                  Make Reservation
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HostelHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}