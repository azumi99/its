import { instance, headers, storedData } from "@/config/instance";
import { unitInterface } from "./interfaces";

type MyHandler = (message: string) => void;
const myHeaders = headers();

const handleValidation = (
	response: unitInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	if (response.data) {
		successFunc(response.message as string);
	} else {
		const errorMessages = [response.unit?.[0], response.status?.[0]].filter(
			Boolean
		);

		errorMessages.forEach((message) => failFunc(message));
	}
};

const unitServices = async () => {
	try {
		if (storedData) {
			const response = await instance.get("/master/unit", {
				headers: myHeaders,
			});
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

const unitModal = async (id: any) => {
	try {
		if (storedData) {
			const response = await instance.get(`/master/unit/${id}`, {
				headers: myHeaders,
			});
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

const unitStore = async (
	param: unitInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.post("/master/unit/", param, {
				headers: myHeaders,
			});
			handleValidation(response.data, successFunc, failFunc);

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
		if (storedData) {
			const response = await instance.put("/master/unit/", param, {
				headers: myHeaders,
			});
			handleValidation(response.data, successFunc, failFunc);
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
		if (storedData) {
			const response = await instance.delete(`/master/unit/${idModal}`, {
				headers: myHeaders,
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
