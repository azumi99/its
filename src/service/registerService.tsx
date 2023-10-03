import instance from "@/config/instance";
import { registerinterface } from "@/interface/interfaces";

const registerService = async (param: registerinterface): Promise<registerinterface> => {
    try {
      const response = await instance.post('/auth/register', param);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export {registerService};