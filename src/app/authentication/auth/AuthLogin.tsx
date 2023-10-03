import React, { useState } from "react";
import {
	Box,
	Typography,
	FormGroup,
	FormControlLabel,
	Button,
	Stack,
	Checkbox,
	InputAdornment,
	IconButton,
	Alert,
	Snackbar,
} from "@mui/material";
import Link from "next/link";
import { loginService } from "@/service/loginService";
import CustomTextField from "@/app/(pageAll)/components/forms/theme-elements/CustomTextField";
import { loginInterface } from "@/interface/interfaces";
import { setToken } from "@/config/authCheck";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { showErrorToast } from "@/app/(pageAll)/components/toast/ToastComponenet";
import { SnackbarComponent } from "@/app/(pageAll)/components/snackbar/page";
import { OpenStore } from "@/app/(pageAll)/store/store";

interface loginType {
	title?: string;
	routeUse?: any;
	subtitle?: JSX.Element | JSX.Element[];
	subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext, routeUse }: loginType) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [valid, setValid] = useState<loginInterface>();
	const [showPassword, setShowPassword] = React.useState(false);
	const { setOpen } = OpenStore();

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const param: loginInterface = {
			email: email,
			password: password,
		};
		const errorFunc = () => {
			setOpen(true);
		};
		try {
			const response = await loginService(param, errorFunc);
			if (response.access_token) {
				setToken(response.access_token, routeUse);
			}
			setValid(response);
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<>
			{title ? (
				<Typography fontWeight="700" variant="h2" mb={1}>
					{title}
				</Typography>
			) : null}
			{subtext}
			<form onSubmit={handleSubmit}>
				<Stack>
					<Box>
						<Typography
							variant="subtitle1"
							fontWeight={600}
							component="label"
							htmlFor="username"
							mb="5px"
						>
							Username
						</Typography>
						<CustomTextField
							error={valid?.email || valid?.error ? true : false}
							variant="outlined"
							fullWidth
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
							helperText={valid?.error ? valid?.error : valid?.email}
						/>
					</Box>
					<Box mt="25px">
						<Typography
							variant="subtitle1"
							fontWeight={600}
							component="label"
							htmlFor="password"
							mb="5px"
						>
							Password
						</Typography>
						<CustomTextField
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							error={valid?.password || valid?.error ? true : false}
							type={showPassword ? "text" : "password"}
							variant="outlined"
							fullWidth
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
							helperText={valid?.error ? valid?.error : valid?.password}
						/>
					</Box>
					<Stack
						justifyContent="space-between"
						direction="row"
						alignItems="center"
						my={2}
					>
						<FormGroup>
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label="Remember this Device"
							/>
						</FormGroup>
						<Typography
							component={Link}
							href="/"
							fontWeight="500"
							sx={{
								textDecoration: "none",
								color: "primary.main",
							}}
						>
							Forgot Password ?
						</Typography>
					</Stack>
				</Stack>
				<Box>
					<Button
						color="primary"
						variant="contained"
						size="large"
						fullWidth
						type="submit"
					>
						Sign In
					</Button>
				</Box>
			</form>
			{subtitle}
		</>
	);
};

export default AuthLogin;
