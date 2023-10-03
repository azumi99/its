import instance from "@/config/instance";
import { categoryInterface } from "./interfaces";

const categoryServices = async () => {
  try {
      const storedData = localStorage.getItem('access_token');
      if (storedData) {
          const token = JSON.parse(storedData);
          const headers = {
              Authorization: `Bearer ${token.token}`
          };
          const response = await instance.get('/master/category/', { headers });
          return response.data;
      }
  } catch (error) {
    window.alert('error connection');
    throw error;
  }
};
type MyHandler = (message: string) => void;
const categoryStore = async (
  param: categoryInterface, 
  successFunc: MyHandler,
  failFunc: MyHandler,
) => {
  try {
      const storedData = localStorage.getItem('access_token');
      if (storedData) {
          const token = JSON.parse(storedData);
          const headers = {
              Authorization: `Bearer ${token.token}`
          };
          successFunc("success");
          const response = await instance.post('/master/category/', param, { headers });
          return response.data;
      }
  } catch (error) {
    failFunc('error connection');
    throw error;
  }
};

export {categoryServices, categoryStore};