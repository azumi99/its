import {
	FormControl,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	Button,
	SelectChangeEvent,
	Typography,
	Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
	showErrorToast,
	showSuccessToast,
} from "@/app/(pageAll)/components/toast/ToastComponenet";
import { vendorInterface } from "./interfaces";
import {
	vendorDelete,
	vendorModal,
	vendorStore,
	vendorUpdate,
} from "./services";

type Modal = {
	handleClose: () => void;
	dataPage: () => void;
	idModal: string;
};
const ModalUnit: React.FC<Modal> = ({ handleClose, dataPage, idModal }) => {
	const [status, setStatus] = useState("");
	const [vendor, setVendor] = useState("");
	const [field, setField] = useState("");
	const [address, setAddress] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value as string);
	};
	const handleVendor = (event: React.ChangeEvent<HTMLInputElement>) => {
		setVendor(event.target.value.toUpperCase() as string);
	};
	const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(event.target.value.toUpperCase() as string);
	};
	const handleField = (event: React.ChangeEvent<HTMLInputElement>) => {
		setField(event.target.value.toUpperCase() as string);
	};
	const successFunc = (message: string) => {
		showSuccessToast(message);
		handleClose();
	};
	const failFunc = (message: string) => {
		showErrorToast(message);
	};
	const saveVendor = async () => {
		const param: vendorInterface = {
			vendor: vendor,
			status: status,
			vendor_address: address,
			field: field,
		};
		try {
			await vendorStore(param, successFunc, failFunc);
		} catch (error) {
			console.log("error");
		}
	};
	const editVendor = async () => {
		const param: vendorInterface = {
			id: idModal,
			vendor: vendor,
			vendor_address: address,
			field: field,
			status: status,
		};
		try {
			await vendorUpdate(param, successFunc, failFunc);
		} catch (error) {
			console.log("error data unit");
		}
	};
	const dataVendor = async () => {
		try {
			const datas = await vendorModal(idModal);
			setVendor(datas.data[0].vendor);
			setAddress(datas.data[0].vendor_address);
			setField(datas.data[0].field);
			setStatus(datas.data[0].status);
		} catch (error) {
			console.log("error data unit");
		}
	};
	const handleSaveClick = async () => {
		if (idModal) {
			await editVendor();
		} else {
			await saveVendor();
		}
		dataPage();
	};
	useEffect(() => {
		dataVendor();
	}, []);

	return (
		<>
			<div>
				<FormControl fullWidth>
					<TextField
						required
						id="vendor"
						label="Vendor"
						value={vendor}
						style={{ marginBottom: "20px" }}
						onChange={handleVendor}
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						required
						id="vendor_address"
						label="Address"
						value={address}
						style={{ marginBottom: "20px" }}
						onChange={handleAddress}
					/>
				</FormControl>
			</div>
			<div>
				<FormControl fullWidth>
					<TextField
						required
						id="field"
						label="Field"
						value={field}
						style={{ marginBottom: "20px" }}
						onChange={handleField}
					/>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Status</InputLabel>
					<Select
						required
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={status}
						label="Status"
						onChange={handleChange}
					>
						<MenuItem value={1}>Active</MenuItem>
						<MenuItem value={0}>Inactive</MenuItem>
					</Select>
				</FormControl>
			</div>

			<div style={{ marginTop: 20, textAlign: "right" }}>
				<Button
					style={{ margin: 3 }}
					color="warning"
					variant="contained"
					size="small"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					style={{ margin: 3 }}
					variant="contained"
					size="small"
					onClick={handleSaveClick}
				>
					Save
				</Button>
			</div>
		</>
	);
};

type ModalDelete = {
	title: string;
	handleClose: () => void;
	dataPage: () => void;
	idModal: string;
};

const DeleteModal: React.FC<ModalDelete> = ({
	title,
	handleClose,
	dataPage,
	idModal,
}) => {
	const successFunc = (message: string) => {
		showSuccessToast(message);
		handleClose();
	};
	const failFunc = (message: string) => {
		showErrorToast(message);
	};
	const handleClick = async () => {
		try {
			await vendorDelete(idModal, successFunc, failFunc);
		} catch (error) {}
		dataPage();
	};
	return (
		<>
			<Typography
				id="transition-modal-title"
				variant="h6"
				component="h1"
				textAlign={"center"}
			>
				You want delete this {title}
			</Typography>
			<div style={{ marginTop: 30, textAlign: "center" }}>
				<Button
					style={{ margin: 8 }}
					color="warning"
					variant="contained"
					size="small"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					style={{ margin: 8 }}
					color="error"
					variant="contained"
					size="small"
					onClick={handleClick}
				>
					Delete
				</Button>
			</div>
		</>
	);
};

export { ModalUnit, DeleteModal };
