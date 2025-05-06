// نفس الوظيفة كدالة عادية لجلب البيانات
const BASE_URL = "https://fragrancefinder-api.p.rapidapi.com/dupes/66c70dee71fb63515fcfa1bf";

export const fetchFragrancesData = async ({pageParam=1}) => {
  const response = await fetch(`${BASE_URL}?page=${pageParam}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1f87d7af14mshaa94745935b2fbcp19a7a3jsn29f9e92e6ad2',
      'X-RapidAPI-Host': 'fragrancefinder-api.p.rapidapi.com'
    }
  });

  if (!response.ok) {
    throw new Error("Error fetching fragrance data.");
  }

  const data = await response.json();
  const filteredRecommendations = data.recommendations?.filter(item => item.image);

  return {
    perfume: data.perfume,
    recommendations: filteredRecommendations,
    nextPage: filteredRecommendations?.length > 0 ? pageParam + 1 : undefined 

  };
};
