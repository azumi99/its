"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(pageAll)/components/container/PageContainer";
import Logo from "@/app/(pageAll)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authCheck } from "@/config/authCheck";
import { SnackbarComponent } from "@/app/(pageAll)/components/snackbar/page";

const Login2 = () => {
	const router = useRouter();
	useEffect(() => {
		authCheck(router);
	}, [router]);
	return (
		<PageContainer title="Login" description="this is Login page">
			<SnackbarComponent
				message={"Network failed, check your network"}
				severity="error"
			/>
			<Box
				sx={{
					position: "relative",
					"&:before": {
						content: '""',
						background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
						backgroundSize: "400% 400%",
						animation: "gradient 15s ease infinite",
						position: "absolute",
						height: "100%",
						width: "100%",
						opacity: "0.3",
					},
				}}
			>
				<Grid
					container
					spacing={0}
					justifyContent="center"
					sx={{ height: "100vh" }}
				>
					<Grid
						item
						xs={12}
						sm={12}
						lg={4}
						xl={3}
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Card
							elevation={9}
							sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
						>
							<Box display="flex" alignItems="center" justifyContent="center">
								<Logo />
							</Box>
							<AuthLogin
								routeUse={useRouter()}
								subtext={
									<Typography
										variant="subtitle1"
										textAlign="center"
										color="textSecondary"
										mb={1}
									>
										Support IT System
									</Typography>
								}
								subtitle={
									<Stack
										direction="row"
										spacing={1}
										justifyContent="center"
										mt={3}
									>
										<Typography
											color="textSecondary"
											variant="h6"
											fontWeight="500"
										>
											New to Modernize?
										</Typography>
										<Typography
											component={Link}
											href="/authentication/register"
											fontWeight="500"
											sx={{
												textDecoration: "none",
												color: "primary.main",
											}}
										>
											Create an account
										</Typography>
									</Stack>
								}
							/>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</PageContainer>
	);
};
export default Login2;
