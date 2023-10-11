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
import { categoryInterface } from "./interfaces";
import {
	categoryDelete,
	categoryModal,
	categoryStore,
	categoryUpdate,
} from "./services";

type Modal = {
	handleClose: () => void;
	dataPage: () => void;
	idModal: string;
};
const ModalUnit: React.FC<Modal> = ({ handleClose, dataPage, idModal }) => {
	const [status, setStatus] = useState("");
	const [category, setCategory] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value as string);
	};
	const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(event.target.value.toUpperCase() as string);
	};
	const successFunc = (message: string) => {
		showSuccessToast(message);
		handleClose();
	};
	const failFunc = (message: string) => {
		showErrorToast(message);
	};
	const saveCategory = async () => {
		const param: categoryInterface = {
			category: category,
			status: status,
		};
		try {
			await categoryStore(param, successFunc, failFunc);
		} catch (error) {
			console.log("error");
		}
	};
	const editCategory = async () => {
		const param: categoryInterface = {
			id: idModal,
			category: category,
			status: status,
		};
		try {
			await categoryUpdate(param, successFunc, failFunc);
		} catch (error) {
			console.log("error data unit");
		}
	};
	const dataCategory = async () => {
		try {
			const datas = await categoryModal(idModal);
			setCategory(datas.data[0].category);
			setStatus(datas.data[0].status);
		} catch (error) {
			console.log("error data unit");
		}
	};
	const handleSaveClick = async () => {
		if (idModal) {
			await editCategory();
		} else {
			await saveCategory();
		}
		dataPage();
	};
	useEffect(() => {
		dataCategory();
	}, []);

	return (
		<>
			<div>
				<FormControl fullWidth>
					<TextField
						required
						id="category"
						label="Category"
						value={category}
						style={{ marginBottom: "20px" }}
						onChange={handleCategory}
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
			await categoryDelete(idModal, successFunc, failFunc);
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
