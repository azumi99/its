export interface categoryInterface {
	id?: string;
	category: string;
	status: string;
	timestamps?: string;
	message?: string;
	data?: [];
	action?: JSX.Element | JSX.Element[];
}
export interface Column {
	id: "id" | "category" | "status" | "action";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
	render?: (value: any) => JSX.Element;
}

export interface Data {
	id: string;
	category: string;
	status: string;
	action?: JSX.Element;
}
