import {
	Alert,
	type AlertColor,
	Box,
	Button,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordFrame } from "../components/PasswordFrame";
import type { Formats } from "../types/Format";

export const CheckPasswordPage = () => {
	const navigate = useNavigate();
	const [passwords, setPasswords] = useState<Formats>([]);
	const [searchService, setSearchService] = useState<string>("");

	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [textAlert, setTextAlert] = useState<string>("");
	const [alertType, setAlertType] = useState<AlertColor>("success");

	const loadPasswords = () => {
		const saved = localStorage.getItem("passwords");
		const items: Formats = saved ? JSON.parse(saved) : [];
		setPasswords(items);
	};

	const handleDeletePassword = (service: string) => {
		const items = [...passwords];
		const index = items.findIndex((p) => p.service === service);
		items.splice(index, 1);
		localStorage.setItem("passwords", JSON.stringify(items));
		setAlertType("success");
		setTextAlert("Пароль удален");
		setOpenAlert(true);

		setPasswords(items);
	};

	const handleCopyPassword = (password: string) => {
		navigator.clipboard.writeText(password);
		setAlertType("success");
		setTextAlert("Пароль скопирован");
		setOpenAlert(true);
	};

	const handleSearchService = (value: string) => {
		setSearchService(value);
	};

	const filterPasswords = useMemo(() => {
		if (searchService === "") {
			return passwords;
		}
		return passwords.filter(
			(item) => item.service.toLowerCase() === searchService.toLowerCase(),
		);
	}, [passwords, searchService]);

	useEffect(() => {
		loadPasswords();
	}, []);

	return (
		<Box
			sx={{
				gap: 2,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<TextField
					id="outlined-basic"
					label="Введите сервис"
					variant="outlined"
					value={searchService}
					onChange={(event) => handleSearchService(event.target.value)}
					sx={{
						backgroundColor: "white",
						borderRadius: 2,
						border: 4,
					}}
				/>
			</Box>
			<Button
				variant="contained"
				onClick={() => navigate("/")}
				sx={{
					width: 100,
					position: "fixed",
					top: 10,
				}}
			>
				Назад
			</Button>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					pt: 3,
				}}
			>
				<Stack spacing={3}>
					{filterPasswords.length === 0 ? (
						<Typography>Нету паролей</Typography>
					) : (
						filterPasswords.map((onePassword) => (
							<Box key={onePassword.service}>
								<PasswordFrame info={onePassword} />
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Button
										variant="contained"
										sx={{
											borderRadius: 2,
											backgroundColor: "red",
										}}
										onClick={() => handleDeletePassword(onePassword.service)}
									>
										Удалить
									</Button>
									<Button
										variant="contained"
										sx={{
											borderRadius: 2,
										}}
										onClick={() => handleCopyPassword(onePassword.password)}
									>
										Копировать
									</Button>
								</Box>
							</Box>
						))
					)}
				</Stack>
			</Box>
			<Snackbar
				open={openAlert}
				autoHideDuration={3000}
				onClose={() => setOpenAlert(false)}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity={alertType} onClose={() => setOpenAlert(false)}>
					{textAlert}{" "}
				</Alert>
			</Snackbar>
		</Box>
	);
};
