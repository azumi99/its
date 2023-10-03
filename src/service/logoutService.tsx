import instance from "@/config/instance";

const logoutService = async () => {
    try {
        const storedData = localStorage.getItem('access_token');
        if (storedData) {
            const token = JSON.parse(storedData);
            const headers = {
                Authorization: `Bearer ${token.token}`
            };
            const response = await instance.post('/auth/logout', {}, { headers });
            return response.data;
        }
    } catch (error) {
      throw error;
    }
};

export {logoutService};