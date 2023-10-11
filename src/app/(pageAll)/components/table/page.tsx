import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TablePagination,
} from "@mui/material";
import { useState } from "react";
// import { Column, Data } from "../../unit/interfaces";

type Props = {
	columns: any;
	filteredRows: any;
	rows: any;
};
const TableComponenent: React.FC<Props> = ({ columns, filteredRows, rows }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	return (
		<Paper
			elevation={0}
			sx={{ width: "100%", overflow: "hidden", borderRadius: 3 }}
		>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column: any) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth, fontWeight: "bold" }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredRows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row: any) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										{columns.map((column: any) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.render
														? column.render(value)
														: column.format && typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export { TableComponenent };
