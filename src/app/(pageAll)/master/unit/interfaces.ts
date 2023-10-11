export interface unitInterface {
	id?: string;
	unit: string;
	status: string;
	timestamps?: string;
	message?: string;
	data?: [];
	action?: JSX.Element | JSX.Element[];
}
export interface Column {
	id: "id" | "unit" | "status" | "action";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
	render?: (value: any) => JSX.Element;
}

export interface Data {
	id: string;
	unit: string;
	status: string;
	action?: JSX.Element;
}
