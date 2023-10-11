import { instance, headers, storedData } from "@/config/instance";
import { categoryInterface } from "./interfaces";

type MyHandler = (message: string) => void;
const myHeaders = headers();

const handleValidation = (
	response: categoryInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	if (response.data) {
		successFunc(response.message as string);
	} else {
		const errorMessages = [response.category?.[0], response.status?.[0]].filter(
			Boolean
		);

		errorMessages.forEach((message) => failFunc(message));
	}
};

const categoryServices = async () => {
	try {
		if (storedData) {
			const response = await instance.get("/master/category/", {
				headers: myHeaders,
			});
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};
const categoryModal = async (id: any) => {
	try {
		if (storedData) {
			const response = await instance.get(`/master/category/${id}`, {
				headers: myHeaders,
			});
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

const categoryStore = async (
	param: categoryInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.post("/master/category/", param, {
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
const categoryUpdate = async (
	param: categoryInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.put("/master/category/", param, {
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

const categoryDelete = async (
	idModal: string,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			console.log("id param", idModal);
			const response = await instance.delete(`/master/category/${idModal}`, {
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

export {
	categoryServices,
	categoryStore,
	categoryUpdate,
	categoryDelete,
	categoryModal,
};
