import {
	FormControl,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	Button,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
	showErrorToast,
	showSuccessToast,
} from "@/app/(pageAll)/components/toast/ToastComponenet";
import { companyInterface } from "./interfaces";
import {
	companyDelete,
	companyModal,
	companyStore,
	companyUpdate,
} from "./services";

type CompanyModal = {
	handleClose: () => void;
	dataPage: () => void;
	idModal: string;
};
const ModalCompany: React.FC<CompanyModal> = ({
	handleClose,
	dataPage,
	idModal,
}) => {
	const [status, setStatus] = useState("");
	const [companylong, setCompanylong] = useState("");
	const [companyshort, setCompanyshort] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value as string);
	};
	const handleLong = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompanylong(event.target.value.toUpperCase() as string);
	};
	const handleShort = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyshort(event.target.value.toUpperCase() as string);
	};
	const successFunc = (message: string) => {
		showSuccessToast(message);
		handleClose();
	};
	const failFunc = (message: string) => {
		showErrorToast(message);
	};
	const saveCompany = async () => {
		const param: companyInterface = {
			company_long: companylong,
			company_short: companyshort,
			status: status,
		};
		try {
			await companyStore(param, successFunc, failFunc);
		} catch (error) {
			console.log("error");
		}
	};
	const editCompany = async () => {
		const param: companyInterface = {
			id: idModal,
			company_long: companylong,
			company_short: companyshort,
			status: status,
		};
		try {
			await companyUpdate(param, successFunc, failFunc);
		} catch (error) {
			console.log(error);
		}
	};
	const dataCompany = async () => {
		try {
			const datas = await companyModal(idModal);
			setCompanylong(datas.data[0].company_long);
			setCompanyshort(datas.data[0].company_short);
			setStatus(datas.data[0].status);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSaveClick = async () => {
		if (idModal) {
			await editCompany();
		} else {
			await saveCompany();
		}
		dataPage();
	};
	useEffect(() => {
		dataCompany();
	}, []);

	return (
		<>
			<div>
				<FormControl fullWidth>
					<TextField
						required
						id="company_long"
						label="Detail Company"
						value={companylong}
						style={{ marginBottom: "20px" }}
						onChange={handleLong}
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						required
						id="company_long"
						label="Short Company"
						value={companyshort}
						style={{ marginBottom: "20px" }}
						onChange={handleShort}
					/>
				</FormControl>
			</div>
			<div>
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
			await companyDelete(idModal, successFunc, failFunc);
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

export { ModalCompany, DeleteModal };
