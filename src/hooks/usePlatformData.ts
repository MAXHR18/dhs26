import { useQuery } from '@tanstack/react-query';
import { PlatformData } from '@/types/platform';

export const usePlatformData = () => {
  return useQuery<PlatformData>({
    queryKey: ['platformData'],
    queryFn: async () => {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch platform data');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};