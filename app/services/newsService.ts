// services/newsService.ts
import axios from 'axios';

const API_BASE_URL = 'https://berita-indo-api.vercel.app/v1/cnn-news';

export const getLifestyleNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gaya-hidup`);
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching lifestyle news:', error);
    throw error; 
  }
};
