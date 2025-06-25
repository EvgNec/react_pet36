import axios from "axios";
const API_KEY ='pub_66dea5ab460c4fcca8cf65daeb42159b';
export const getNews = async  (value) => {
    const response = await axios.get('https://newsdata.io/api/1/latest', {
        params: {
          apikey: API_KEY,
          q: value,
          language: 'uk', 
        },
      });
      return response.data.results;
}

export default getNews
