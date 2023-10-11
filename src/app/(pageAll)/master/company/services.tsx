import { instance, headers, storedData } from "@/config/instance";
import { companyInterface } from "./interfaces";

type MyHandler = (message: string) => void;
const myHeaders = headers();

const handleValidation = (
	response: any,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	if (response.data) {
		successFunc(response.message);
	} else {
		const errorMessages = [
			response.company_long?.[0],
			response.company_short?.[0],
			response.status?.[0],
		].filter(Boolean);

		errorMessages.forEach((message) => failFunc(message));
	}
};

const companyServices = async () => {
	try {
		if (storedData) {
			const response = await instance.get("/master/company", {
				headers: myHeaders,
			});
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

const companyModal = async (id: any) => {
	try {
		if (storedData) {
			const response = await instance.get(`/master/company/${id}`, {
				headers: myHeaders,
			});
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

const companyStore = async (
	param: companyInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.post("/master/company/", param, {
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

const companyUpdate = async (
	param: companyInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.put("/master/company/", param, {
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

const companyDelete = async (
	idModal: string,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.delete(`/master/company/${idModal}`, {
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
	companyServices,
	companyStore,
	companyUpdate,
	companyDelete,
	companyModal,
};
