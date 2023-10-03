"use client";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LoadingStore } from "./(pageAll)/store/store";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/service/loginService";
import { authCheck, logCheck } from "@/config/authCheck";

const FullWidthSpinner = () => {
	const router = useRouter();
	const { setLoading } = LoadingStore();
	const authOrization = () => {
		setLoading(false);
	};
	useEffect(() => {
		logCheck(router, authOrization);
	}, []);
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<CircularProgress />
		</Box>
	);
};
const SpinnerCheck = () => {
	const router = useRouter();
	const { setLoading } = LoadingStore();
	const authOrization = () => {
		setLoading(false);
	};
	useEffect(() => {
		authCheck(router);
	}, []);
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export { FullWidthSpinner, SpinnerCheck };
