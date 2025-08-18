import { useQuery } from '@tanstack/react-query';
import { PlatformData } from '@/types/platform';

export const usePlatformData = () => {
  return useQuery<PlatformData>({
    queryKey: ['platformData'],
    queryFn: async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          console.error('HTTP Error:', response.status, response.statusText);
          throw new Error(`HTTP ${response.status}: Failed to fetch platform data`);
        }
        const data = await response.json();
        console.log('Data loaded successfully:', data);
        return data;
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};