import { checkLogin } from "@/service/loginService";

type MyHandler = () => void;
const authCheck = async (router: any) => {
	try {
		const response = await checkLogin();
		if (response.status) {
			router.push("/");
		}
	} catch (error) {
		localStorage.removeItem("access_token");
	}
};

const logCheck = async (router: any, authOrization?: MyHandler) => {
	try {
		const response = await checkLogin();
		if (!response.status) {
			localStorage.removeItem("access_token");
			router.push("/authentication/login");
		} else {
			authOrization!();
		}
	} catch (error) {
		localStorage.removeItem("access_token");
		router.push("/authentication/login");
	}
};

const setToken = (token: string, router: any) => {
	const accessToken = token;
	const data = {
		token: accessToken,
	};

	localStorage.setItem("access_token", JSON.stringify(data));
	authCheck(router);
};
export { authCheck, setToken, logCheck };
