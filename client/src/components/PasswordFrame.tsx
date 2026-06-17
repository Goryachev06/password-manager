import {
	Alert,
	Box,
	Button,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import type { Format } from "../types/Format";

export const PasswordFrame = ({ info }: { info: Format }) => {
	const password = info.password;

	const [openAlert, setOpenAlert] = useState(false);
	const [textAlert, setTextAlert] = useState("");

	const handleDeletePassword = () => {
		localStorage.removeItem(info.service);
		window.location.reload();
		setTextAlert("Пароль удален!");
		setOpenAlert(true);
	};
	const handleCopyPassword = () => {
		navigator.clipboard.writeText(info.password);
		setTextAlert("Пароль скопирован!");
		setOpenAlert(true);
	};
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#556B90",
				minHeight: "10%",
				minWidth: "50%",
				border: 2,
				borderRadius: 5,
				flexDirection: "column",
				p: 2,
				gap: 2,
			}}
		>
			<Stack spacing={20} direction={"row"}>
				<Typography sx={{ color: "white", fontSize: 30 }}>
					{info.service}
				</Typography>
				<TextField
					id="outlined-basic"
					variant="outlined"
					value={password}
					disabled={true}
					sx={{
						backgroundColor: "white",
						border: 1,
						borderRadius: 2,
					}}
				/>
			</Stack>
			<Stack spacing={2} direction={"row"}>
				<Button
					variant="contained"
					onClick={handleDeletePassword}
					sx={{
						backgroundColor: "red",
					}}
				>
					Удалить
				</Button>
				<Button variant="contained" onClick={handleCopyPassword}>
					Копировать пароль
				</Button>
			</Stack>
			<Snackbar
				open={openAlert}
				autoHideDuration={3000}
				onClose={() => setOpenAlert(false)}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity={"success"} onClose={() => setOpenAlert(false)}>
					{textAlert}{" "}
				</Alert>
			</Snackbar>
		</Box>
	);
};
