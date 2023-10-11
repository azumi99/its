import { instance, headers, storedData } from "@/config/instance";
import { vendorInterface } from "./interfaces";

type MyHandler = (message: string) => void;
const myHeaders = headers();

const handleValidation = (
	response: vendorInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	if (response.data) {
		successFunc(response.message as string);
	} else {
		const errorMessages = [
			response.vendor?.[0],
			response.field?.[0],
			response.vendor_address?.[0],
			response.status?.[0],
		].filter(Boolean);

		errorMessages.forEach((message) => failFunc(message));
	}
};

const vendorServices = async () => {
	try {
		if (storedData) {
			const response = await instance.get("/master/vendor", {
				headers: myHeaders,
			});
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

const vendorModal = async (id: any) => {
	try {
		if (storedData) {
			const response = await instance.get(`/master/vendor/${id}`, {
				headers: myHeaders,
			});
			return response.data;
		}
	} catch (error) {
		throw error;
	}
};

const vendorStore = async (
	param: vendorInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.post("/master/vendor/", param, {
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

const vendorUpdate = async (
	param: vendorInterface,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.put("/master/vendor/", param, {
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

const vendorDelete = async (
	idModal: string,
	successFunc: MyHandler,
	failFunc: MyHandler
) => {
	try {
		if (storedData) {
			const response = await instance.delete(`/master/vendor/${idModal}`, {
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

export { vendorServices, vendorStore, vendorUpdate, vendorDelete, vendorModal };
