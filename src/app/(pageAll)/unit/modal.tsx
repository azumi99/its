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
} from "../components/toast/ToastComponenet";
import { unitInterface } from "./interfaces";
import { unitDelete, unitModal, unitStore, unitUpdate } from "./services";

type UnityModal = {
	handleClose: () => void;
	dataPage: () => void;
	idModal: string;
};
const ModalUnit: React.FC<UnityModal> = ({
	handleClose,
	dataPage,
	idModal,
}) => {
	const [value, setValue] = useState("");
	const [unitValue, setUnit] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setValue(event.target.value as string);
	};
	const handleUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUnit(event.target.value as string);
	};
	const successFunc = (message: string) => {
		showSuccessToast(message);
		handleClose();
	};
	const failFunc = (message: string) => {
		showErrorToast(message);
	};
	const saveUnit = async () => {
		const param: unitInterface = {
			unit: unitValue,
			status: value,
		};
		try {
			await unitStore(param, successFunc, failFunc);
		} catch (error) {
			console.log("error");
		}
	};
	const editUnit = async () => {
		const param: unitInterface = {
			id: idModal,
			unit: unitValue,
			status: value,
		};
		try {
			await unitUpdate(param, successFunc, failFunc);
		} catch (error) {
			console.log("error data unit");
		}
	};
	const dataUnit = async () => {
		try {
			const datas = await unitModal(idModal);
			setUnit(datas.data[0].unit);
			console.log(unitValue);
			setValue(datas.data[0].status);
		} catch (error) {
			console.log("error data unit");
		}
	};
	const handleSaveClick = async () => {
		if (idModal) {
			await editUnit();
		} else {
			await saveUnit();
		}
		dataPage();
	};
	useEffect(() => {
		dataUnit();
	}, []);

	return (
		<>
			<FormControl fullWidth>
				<TextField
					required
					id="unit"
					label="Unit"
					type="search"
					value={unitValue}
					style={{ marginBottom: "20px" }}
					onChange={handleUnit}
					fullWidth
				/>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Status</InputLabel>
				<Select
					required
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={value}
					label="Status"
					onChange={handleChange}
				>
					<MenuItem value={1}>Active</MenuItem>
					<MenuItem value={0}>Inactive</MenuItem>
				</Select>
			</FormControl>
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
			await unitDelete(idModal, successFunc, failFunc);
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
