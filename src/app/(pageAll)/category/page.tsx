"use client";
import {
	Autocomplete,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import PageContainer from "@/app/(pageAll)/components/container/PageContainer";
import DashboardCard from "@/app/(pageAll)/components/shared/DashboardCard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { categoryServices } from "./services";
import { categoryInterface } from "./interfaces";
import ModalPage from "../components/modal/modalPage";
import { ModalCategory } from "./modal";
import Snackbar from "@mui/material/Snackbar";
import { IconTag } from "@tabler/icons-react";
import { styleModal } from "@/app/(pageAll)/components/modal/style";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CategoryPage = () => {
	const [searchValue, setSearchValue] = useState("");
	const [unit, setUnit] = useState([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [element, setElement] = useState<JSX.Element | JSX.Element[]>(<></>);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", flex: 1 },
		{ field: "category", headerName: "Category Name", flex: 1 },
		{ field: "status", headerName: "Status", flex: 1 },
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			renderCell: (params) => (
				<div>
					<Button
						variant="contained"
						color="primary"
						style={{ marginRight: "8px", borderRadius: 50 }}
					>
						<IconTag size={24} color="red" />
					</Button>
					<Button variant="contained" color="secondary">
						Delete
					</Button>
				</div>
			),
		},
	];
	const dataPage = async () => {
		try {
			const value = await categoryServices();
			setUnit(value.data);
		} catch (error) {
			setUnit([]);
		}
	};
	const handleSearchChange = (event: any) => {
		setSearchValue(event.target.value);
	};
	const filteredRows = unit.filter((row: categoryInterface) => {
		return (
			row.id?.toString().includes(searchValue) ||
			row.category.toLowerCase().includes(searchValue.toLowerCase()) ||
			row.status.toString().includes(searchValue.toLowerCase())
		);
	});

	const addCategory = () => {
		setElement(
			<>
				<ModalCategory handleClose={handleClose} />
			</>
		);
		handleOpen();
	};

	useEffect(() => {
		dataPage();
	}, []);
	return (
		<PageContainer title="Category" description="Category page">
			<DashboardCard title="Catgeory List">
				<ModalPage
					handleClose={handleClose}
					modalElement={element}
					open={open}
					style={styleModal}
					title="Add Category"
				/>
				<Button variant="contained" size="small" onClick={addCategory}>
					add
				</Button>
				<TextField
					id="filled-search"
					label="Search field"
					type="search"
					variant="standard"
					value={searchValue}
					onChange={handleSearchChange}
					fullWidth
				/>
				<DataGrid
					rows={filteredRows}
					columns={columns}
					pagination
					disableRowSelectionOnClick
					initialState={{
						pagination: { paginationModel: { pageSize: 10 } },
					}}
					pageSizeOptions={[10, 25, 100]}
				/>
			</DashboardCard>
		</PageContainer>
	);
};

export default CategoryPage;
