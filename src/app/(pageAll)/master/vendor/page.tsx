"use client";
import { Button, ButtonGroup, Chip, TextField, Tooltip } from "@mui/material";
import PageContainer from "@/app/(pageAll)/components/container/PageContainer";
import DashboardCard from "@/app/(pageAll)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { vendorServices } from "./services";
import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { TableComponenent } from "@/app/(pageAll)/components/table/page";
import { Column, Data } from "./interfaces";
import { styleModal } from "@/app/(pageAll)/components/modal/style";
import ModalPage from "@/app/(pageAll)/components/modal/modalPage";
import { DeleteModal, ModalUnit } from "./modal";

const VendorPage = () => {
	const [vendor, setVendor] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [modal, setModal] = useState(false);
	const [titleModal, setTitle] = useState("");
	const handleOpen = () => setModal(true);
	const closeHandle = () => setModal(false);
	const [element, setElement] = useState<JSX.Element | JSX.Element[]>(<></>);
	function createData(
		id: string,
		vendor: string,
		vendor_address: string,
		field: string,
		status: string
	): Data {
		return { id, vendor, vendor_address, field, status };
	}

	const handleEdit = (value: any) => {
		setTitle("Edit Vendor");
		addModal(value);
	};
	const handleAdd = () => {
		setTitle("Add Vendor");
		addModal();
	};
	const handleDelete = (value: any) => {
		setTitle("");
		deleteCategory(value);
	};

	const columns: readonly Column[] = [
		{ id: "vendor", label: "Vendor" },
		{ id: "vendor_address", label: "Address" },
		{ id: "field", label: "Field" },
		{
			id: "status",
			label: "Status",
			render: (value: any) => (
				<Chip
					size="small"
					label={value === 1 ? "active" : "inactive"}
					color={value === 1 ? "success" : "warning"}
				/>
			),
		},
		{
			id: "id",
			label: "Action",
			render: (value: any) => (
				<>
					<ButtonGroup
						disableElevation
						variant="contained"
						aria-label="Disabled elevation buttons"
						size="small"
						color="inherit"
					>
						<Tooltip title="Edit">
							<Button
								id={value + "edit"}
								onClick={() => handleEdit(value)}
								color="warning"
							>
								<IconPencil size={20} />
							</Button>
						</Tooltip>
						<Tooltip title="Delete">
							<Button
								id={value + "delete"}
								onClick={() => handleDelete(value)}
								color="error"
							>
								<IconTrash size={20} />
							</Button>
						</Tooltip>
					</ButtonGroup>
				</>
			),
		},
	];

	const rows = vendor.map((value: Data) =>
		createData(
			value.id,
			value.vendor,
			value.vendor_address,
			value.field,
			value.status
		)
	);

	const dataPage = async () => {
		try {
			const value = await vendorServices();
			setVendor(value.data);
		} catch (error) {
			setVendor([]);
			location.reload();
		}
	};
	useEffect(() => {
		dataPage();
	}, []);

	const filteredRows = rows.filter((row) => {
		return (
			row.vendor.toLowerCase().includes(searchValue.toLowerCase()) ||
			row.field.toLowerCase().includes(searchValue.toLowerCase()) ||
			row.vendor_address.toLowerCase().includes(searchValue.toLowerCase())
		);
	});
	const addModal = (value?: any) => {
		setElement(
			<>
				<ModalUnit
					handleClose={closeHandle}
					dataPage={dataPage}
					idModal={value}
				/>
			</>
		);
		handleOpen();
	};
	const deleteCategory = (value?: any) => {
		setElement(
			<>
				<DeleteModal
					title={"Unit"}
					handleClose={closeHandle}
					dataPage={dataPage}
					idModal={value}
				/>
			</>
		);
		handleOpen();
	};
	return (
		<PageContainer title="Vendor" description="Vendor page">
			<DashboardCard title="Vendor List">
				<ModalPage
					handleClose={closeHandle}
					modalElement={element}
					open={modal}
					style={styleModal}
					title={titleModal}
					sizeModal={400}
				/>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Button variant="contained" size="small" onClick={handleAdd}>
						add
					</Button>
					<TextField
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						label="Search"
						id="outlined-size-small"
						size="small"
					/>
				</div>
				<TableComponenent
					columns={[...columns]}
					filteredRows={[...filteredRows]}
					rows={[...rows]}
				></TableComponenent>
			</DashboardCard>
		</PageContainer>
	);
};

export default VendorPage;
