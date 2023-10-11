"use client";
import { Button, ButtonGroup, Chip, TextField, Tooltip } from "@mui/material";
import PageContainer from "@/app/(pageAll)/components/container/PageContainer";
import DashboardCard from "@/app/(pageAll)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import { companyServices } from "./services";
import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { TableComponenent } from "@/app/(pageAll)/components/table/page";
import { Column, Data } from "./interfaces";
import { styleModal } from "@/app/(pageAll)/components/modal/style";
import ModalPage from "@/app/(pageAll)/components/modal/modalPage";
import { DeleteModal, ModalCompany } from "./modal";

const CompanyPage = () => {
	const [company, setCompany] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [modal, setModal] = useState(false);
	const [titleModal, setTitle] = useState("");
	const handleOpen = () => setModal(true);
	const closeHandle = () => setModal(false);
	const [element, setElement] = useState<JSX.Element | JSX.Element[]>(<></>);
	function createData(
		id: string,
		company_short: string,
		company_long: string,
		status: string
	): Data {
		return { id, company_long, company_short, status };
	}

	const handleEdit = (value: any) => {
		setTitle("Edit Company");
		addCompany(value);
	};
	const handleAdd = () => {
		setTitle("Add Company");
		addCompany();
	};
	const handleDelete = (value: any) => {
		setTitle("");
		deleteCompany(value);
	};

	const columns: readonly Column[] = [
		{ id: "company_long", label: "Company" },
		{ id: "company_short", label: "Short" },
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

	const rows = company.map((value: Data) =>
		createData(value.id, value.company_short, value.company_long, value.status)
	);

	const dataPage = async () => {
		try {
			const value = await companyServices();
			setCompany(value.data);
		} catch (error) {
			setCompany([]);
			location.reload();
		}
	};
	useEffect(() => {
		dataPage();
	}, []);

	const filteredRows = rows.filter((row) => {
		return (
			row.company_long.toLowerCase().includes(searchValue.toLowerCase()) ||
			(typeof row.status === "string" &&
				row.company_short.toLowerCase().includes(searchValue.toLowerCase()))
		);
	});
	const addCompany = (value?: any) => {
		setElement(
			<>
				<ModalCompany
					handleClose={closeHandle}
					dataPage={dataPage}
					idModal={value}
				/>
			</>
		);
		handleOpen();
	};
	const deleteCompany = (value?: any) => {
		setElement(
			<>
				<DeleteModal
					title={"Company"}
					handleClose={closeHandle}
					dataPage={dataPage}
					idModal={value}
				/>
			</>
		);
		handleOpen();
	};
	return (
		<PageContainer title="Company" description="Company page">
			<DashboardCard title="Company List">
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

export default CompanyPage;
