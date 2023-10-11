export interface companyInterface {
	id?: string;
	company_short: string;
	company_long: string;
	status: string;
	timestamps?: string;
	action?: JSX.Element | JSX.Element[];
}
export interface Column {
	id: "id" | "company_short" | "company_long" | "status" | "action";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
	render?: (value: any) => JSX.Element;
}

export interface Data {
	id: string;
	company_short: string;
	company_long: string;
	status: string;
	action?: JSX.Element;
}
