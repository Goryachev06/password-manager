import {
	Box,
	Button,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordFrame } from "../components/PasswordFrame";
import type { Formats } from "../types/Format";

export const CheckPasswordPage = () => {
	const navigate = useNavigate();
	const [passwords, setPasswords] = useState<Formats>([]);
	const [searchService, setSearchService] = useState("");
	const [filterPasswords, setFilterPasswords] = useState<Formats>([]);

	const loadPasswords = () => {
		const items: Formats = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key) {
				items.push({
					service: key,
					password: localStorage.getItem(key),
				});
			}
		}
		setPasswords(items);
		setFilterPasswords(items);
	};

	const handleSearchService = (value: string) => {
		setSearchService(value);
		if (value === "") {
			setFilterPasswords(passwords);
		} else {
			const filter = passwords.filter(
				(item) => item.service.toLowerCase() === value.toLocaleLowerCase(),
			);
			setFilterPasswords(filter);
		}
	};

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
							<PasswordFrame key={onePassword.service} info={onePassword} />
						))
					)}
				</Stack>
			</Box>
		</Box>
	);
};
