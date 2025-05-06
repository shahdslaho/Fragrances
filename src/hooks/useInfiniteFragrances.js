// src/hooks/useInfiniteFragrances.js

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFragrancesData } from '../api/fragranceApi';

// ✅ تأكد من تصدير الدالة بهذا الشكل
export const useInfiniteFragrances = () => {
  return useInfiniteQuery({
    queryKey: ['fragrances'],
    queryFn: fetchFragrancesData,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
