'use client';

import { useState, useMemo, useCallback, useTransition } from 'react';
import { RoomCard } from '@/components/room-card';
import { RoomCardSkeleton } from '@/components/room-card-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { rooms } from '@/lib/data';
import { Search, Filter, MapPin } from 'lucide-react';

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [priceSort, setPriceSort] = useState('none');
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filteredAndSortedRooms = useMemo(() => {
    let filtered = rooms.filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || room.type === typeFilter;
      const matchesAvailability = availabilityFilter === 'all' || 
                                (availabilityFilter === 'available' && room.available) ||
                                (availabilityFilter === 'unavailable' && !room.available);
      
      return matchesSearch && matchesType && matchesAvailability;
    });

    if (priceSort !== 'none') {
      filtered.sort((a, b) => {
        return priceSort === 'low-to-high' ? a.price - b.price : b.price - a.price;
      });
    }

    return filtered;
  }, [searchTerm, typeFilter, availabilityFilter, priceSort]);

  const handleFilterChange = useCallback((filterType: string, value: string) => {
    startTransition(() => {
      switch (filterType) {
        case 'search':
          setSearchTerm(value);
          break;
        case 'type':
          setTypeFilter(value);
          break;
        case 'availability':
          setAvailabilityFilter(value);
          break;
        case 'price':
          setPriceSort(value);
          break;
      }
    });
  }, []);

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setSearchTerm('');
      setTypeFilter('all');
      setAvailabilityFilter('all');
      setPriceSort('none');
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Room
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              From private singles to social dorms - find the accommodation that suits your style
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Downtown Location • All rooms include free Wi-Fi</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {isPending && <LoadingSpinner size="sm" />}
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={(value) => handleFilterChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="shared">Shared</SelectItem>
                  <SelectItem value="dorm">Dorm</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={(value) => handleFilterChange('availability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceSort} onValueChange={(value) => handleFilterChange('price', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Sorting</SelectItem>
                  <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" onClick={clearFilters} disabled={isPending}>
              Clear All
            </Button>
          </div>

          {/* Active Filters */}
          {(searchTerm || typeFilter !== 'all' || availabilityFilter !== 'all' || priceSort !== 'none') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {typeFilter !== 'all' && (
                <Badge variant="secondary">
                  Type: {typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                </Badge>
              )}
              {availabilityFilter !== 'all' && (
                <Badge variant="secondary">
                  {availabilityFilter.charAt(0).toUpperCase() + availabilityFilter.slice(1)}
                </Badge>
              )}
              {priceSort !== 'none' && (
                <Badge variant="secondary">
                  {priceSort === 'low-to-high' ? 'Price: Low to High' : 'Price: High to Low'}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {isPending ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Filtering rooms...
              </span>
            ) : (
              `Showing ${filteredAndSortedRooms.length} of ${rooms.length} rooms`
            )}
          </p>
        </div>

        {/* Rooms Grid */}
        {isPending ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <RoomCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredAndSortedRooms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more options
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}