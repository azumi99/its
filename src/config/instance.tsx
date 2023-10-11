import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
	baseURL: "http://127.0.0.1:8000/api", // Replace with your API base URL
});
const storedData = localStorage.getItem("access_token");
const headers = () => {
	const storedData = localStorage.getItem("access_token");
	if (storedData) {
		const token = JSON.parse(storedData);
		const header = {
			Authorization: `Bearer ${token.token}`,
		};
		return header;
	} else {
		const header = {};
		return header;
	}
};
export { instance, headers, storedData };
