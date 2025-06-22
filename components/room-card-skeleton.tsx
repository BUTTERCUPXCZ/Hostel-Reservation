import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RoomCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="h-48 w-full" />
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-6 w-32" />
          <div className="text-right">
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
        
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        
        <Skeleton className="h-4 w-24 mb-4" />
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}