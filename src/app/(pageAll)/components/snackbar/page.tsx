import { Alert, Snackbar } from "@mui/material";
import { OpenStore } from "@/app/(pageAll)/store/store";
type Props = {
	message?: string;
	severity?: "error" | "warning" | "info" | "success";
	vertical?: "top" | "bottom";
	horizontal?: "left" | "center" | "right";
};
const SnackbarComponent: React.FC<Props> = ({
	message,
	severity,
	vertical = "top",
	horizontal = "right",
}) => {
	const { open, setOpen } = OpenStore();
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{
				vertical: vertical,
				horizontal: horizontal,
			}}
		>
			<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
};
export { SnackbarComponent };
