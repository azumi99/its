export interface vendorInterface {
	id?: string;
	vendor: string;
	vendor_address: string;
	field: string;
	status: string;
	timestamps?: string;
	message?: string;
	data?: [];
	action?: JSX.Element | JSX.Element[];
}
export interface Column {
	id: "id" | "vendor" | "vendor_address" | "field" | "status" | "action";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
	render?: (value: any) => JSX.Element;
}

export interface Data {
	id: string;
	vendor: string;
	vendor_address: string;
	field: string;
	status: string;
	action?: JSX.Element;
}
