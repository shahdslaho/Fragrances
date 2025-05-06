// src/pages/FragranceList.jsx

import React from 'react';
import { useInfiniteFragrances } from '../hooks/useInfiniteFragrances'; 
import FragranceCard from '../components/FragranceCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import style from "../styles/FragranceList.module.css";

const FragranceList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteFragrances(); // ✅ استخدام الهوك

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // ✅ جمع كل العناصر من كل الصفحات
  const allRecommendations = data.pages.flatMap(page => page.recommendations);

  return (
    <InfiniteScroll
      dataLength={allRecommendations.length} // ✅ طول البيانات الحالية
      next={fetchNextPage} // ✅ جلب الصفحة التالية
      hasMore={!!hasNextPage} // ✅ هل في صفحات إضافية
      loader={<p>Loading more...</p>}
    >
      <div className={style.fragrancelist}>
        {allRecommendations.map((fragrance, index) => (
          <FragranceCard
            key={index}
            fragrance={fragrance}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default FragranceList;
