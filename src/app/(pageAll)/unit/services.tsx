import instance from "@/config/instance";
import { unitInterface } from "./interfaces";

const unitServices = async () => {
	try {
		const storedData = localStorage.getItem("access_token");
		if (storedData) {
			const token = JSON.parse(storedData);
			const headers = {
				Authorization: `Bearer ${token.token}`,
			};
			const response = await instance.get("/master/unit", { headers });
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

const unitModal = async (id: any) => {
	try {
		const storedData = localStorage.getItem("access_token");
		if (storedData) {
			const token = JSON.parse(storedData);
			const headers = {
				Authorization: `Bearer ${token.token}`,
			};
			const response = await instance.get(`/master/unit/${id}`, { headers });
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

type MyHandler = (message: string) => void;
const unitStore = async (
	param: unitInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		const storedData = localStorage.getItem("access_token");
		if (storedData) {
			const token = JSON.parse(storedData);
			const headers = {
				Authorization: `Bearer ${token.token}`,
			};
			const response = await instance.post("/master/unit/", param, { headers });
			if (response.data.unit || response.data.status) {
				try {
					failFunc(response.data.unit[0]);
					failFunc(response.data.status[0]);
				} catch (error) {}
			} else {
				successFunc(response.data.message);
			}

			console.log("response", response.data);
			return response.data;
		}
	} catch (error) {
		failFunc("error connection");
		throw error;
	}
};

const unitUpdate = async (
	param: unitInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		const storedData = localStorage.getItem("access_token");
		if (storedData) {
			const token = JSON.parse(storedData);
			const headers = {
				Authorization: `Bearer ${token.token}`,
			};
			const response = await instance.put("/master/unit/", param, { headers });
			if (response.data.unit || response.data.status) {
				try {
					failFunc(response.data.unit[0]);
					failFunc(response.data.status[0]);
				} catch (error) {}
			} else {
				successFunc(response.data.message);
			}
			return response.data;
		}
	} catch (error) {
		failFunc("error connection");
		throw error;
	}
};

const unitDelete = async (
	idModal: string,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		const storedData = localStorage.getItem("access_token");
		if (storedData) {
			const token = JSON.parse(storedData);
			const headers = {
				Authorization: `Bearer ${token.token}`,
			};
			console.log("id param", idModal);
			const response = await instance.delete(`/master/unit/${idModal}`, {
				headers,
			});
			successFunc(response.data.message);
			return response.data;
		}
	} catch (error) {
		failFunc("error connection");
		throw error;
	}
};

export { unitServices, unitStore, unitUpdate, unitDelete, unitModal };
