import { instance } from "@/config/instance";
import { loginInterface } from "@/interface/interfaces";

type MyHandler = (message: string) => void;
const loginService = async (
	param: loginInterface,
	errorFunc?: MyHandler
): Promise<loginInterface> => {
	try {
		const response = await instance.post("/auth/login", param);
		return response.data;
	} catch (error) {
		errorFunc!("error connection");
		throw error;
	}
};

const checkLogin = async () => {
	try {
		const storedData = localStorage.getItem("access_token");
		if (storedData) {
			const token = JSON.parse(storedData);
			const headers = {
				Authorization: `Bearer ${token.token}`,
			};
			const response = await instance.post("/auth/check", {}, { headers });
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

export { loginService, checkLogin };
