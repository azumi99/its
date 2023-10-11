"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "@/app/(pageAll)/layout/header/Header";
import Sidebar from "@/app/(pageAll)/layout/sidebar/Sidebar";
import { logCheck } from "@/config/authCheck";
import { useRouter } from "next/navigation";
import { FullWidthSpinner } from "../Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingStore } from "@/app/(pageAll)/store/store";

const MainWrapper = styled("div")(() => ({
	display: "flex",
	minHeight: "100vh",
	width: "100%",
}));

const PageWrapper = styled("div")(() => ({
	display: "flex",
	flexGrow: 1,
	paddingBottom: "60px",
	flexDirection: "column",
	zIndex: 5,
	backgroundColor: "transparent",
}));

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const [size, setSize] = useState(1200);
	const { loading } = LoadingStore();
	useEffect(() => {
		const handleResize = () => {
			setSize(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		setSize(window.innerWidth);
	}, [loading]);

	return (
		<>
			{loading ? (
				<FullWidthSpinner />
			) : (
				<>
					<ToastContainer />
					<MainWrapper className="mainwrapper">
						{/* ------------------------------------------- */}
						{/* Sidebar */}
						{/* ------------------------------------------- */}
						<Sidebar
							isSidebarOpen={isSidebarOpen}
							isMobileSidebarOpen={isMobileSidebarOpen}
							onSidebarClose={() => setMobileSidebarOpen(false)}
						/>
						{/* ------------------------------------------- */}
						{/* Main Wrapper */}
						{/* ------------------------------------------- */}
						<PageWrapper className="page-wrapper">
							{/* ------------------------------------------- */}
							{/* Header */}
							{/* ------------------------------------------- */}
							<Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
							{/* ------------------------------------------- */}
							{/* PageContent */}
							{/* ------------------------------------------- */}
							<Container
								sx={{
									paddingTop: "20px",
									maxWidth: size,
								}}
							>
								{/* ------------------------------------------- */}
								{/* Page Route */}
								{/* ------------------------------------------- */}
								<Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
								{/* ------------------------------------------- */}
								{/* End Page */}
								{/* ------------------------------------------- */}
							</Container>
						</PageWrapper>
					</MainWrapper>
				</>
			)}
		</>
	);
}
