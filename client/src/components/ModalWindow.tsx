import {
	Alert,
	type AlertColor,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Modal,
	Snackbar,
	Stack,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { generatePassword } from "../services/generatePassword";
import type { Format, Formats } from "../types/Format";

export const ModalWindow = ({
	open,
	close,
}: {
	open: boolean;
	close: () => void;
}) => {
	const [number, setNumber] = useState<boolean>(false);
	const [letter, setLetter] = useState<boolean>(false);
	const [symbol, setSymbol] = useState<boolean>(false);
	const [lower, setLower] = useState<boolean>(false);
	const [upper, setUpper] = useState<boolean>(false);
	const [chars, setChars] = useState<string>("");
	const [example, setExample] = useState<boolean>(false);
	const [service, setService] = useState<string>("");
	const [lenght, setLength] = useState<string>("");
	const [random, setRandom] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [textAlert, setTextAlert] = useState<string>("");
	const [alertType, setAlertType] = useState<AlertColor>("success");
	const [loading, setLoading] = useState<boolean>(false);

	const handleExampleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		setExample(checked);
		if (checked) {
			setLetter(false);
			setNumber(false);
			setSymbol(false);
			setLower(false);
			setUpper(false);
			setRandom(false);
		}
	};

	const handleRandomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		setRandom(checked);
		if (checked) {
			setLower(false);
			setUpper(false);
		}
	};

	const handleLowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		setLower(checked);
		if (checked) {
			setUpper(false);
			setRandom(false);
		}
	};

	const handleUpperChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		setUpper(checked);
		if (checked) {
			setLower(false);
			setRandom(false);
		}
	};

	const handleLetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		setLetter(checked);
		if (!checked) {
			setLower(false);
			setUpper(false);
			setRandom(false);
		}
	};

	const handleCreatePassword = () => {
		const finalOptions = {
			numbers: number,
			letters: letter,
			symbols: symbol,
			UpRegister: upper,
			LowRegister: lower,
			RandomRegister: random,
			long: Number(lenght),
			chars: chars,
			example: example,
		};
		try {
			const password = generatePassword(finalOptions);
			setPassword(password || "");
			setAlertType("success");
			setTextAlert("Пароль успешно сгенерирован!");
			setOpenAlert(true);
		} catch (error) {
			setPassword("");
			setAlertType("error");
			if (error instanceof Error) {
				setTextAlert(error.message);
			}
			setOpenAlert(true);
		}
	};

	const handlerUploadPassword = () => {
		setLoading(true);
		const random = Math.floor(Math.random() * 2) + 1;
		if (random === 1) {
			setTimeout(() => {
				const saved = localStorage.getItem("passwords");
				const passwords: Formats = saved ? JSON.parse(saved) : [];
				const newRecord: Format = {
					service: service,
					password: password,
				};
				passwords.push(newRecord);
				localStorage.setItem("passwords", JSON.stringify(passwords));

				setTextAlert("Пароль успешно сохранен!");
				setAlertType("success");
				setOpenAlert(true);
				setLoading(false);
				setService("");
				setPassword("");
				setChars("");
				setLength("");
				setNumber(false);
				setLetter(false);
				setSymbol(false);
				setLower(false);
				setUpper(false);
				setRandom(false);
			}, 5000);
		} else {
			setTimeout(() => {
				setTextAlert("Ошибка");
				setAlertType("error");
				setOpenAlert(true);
				setLoading(false);
			}, 5000);
		}
	};

	return (
		<>
			<Modal
				open={open}
				onClose={close}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						backgroundColor: "#556B90",
						justifyContent: "center",
						alignItems: "center",
						width: "70%",
						height: "70%",
						border: 5,
						borderRadius: 5,
					}}
				>
					<Stack
						spacing={4}
						sx={{
							width: "100%",
							alignItems: "center",
						}}
					>
						<TextField
							id="outlined-basic"
							label="Введите название сервиса"
							variant="outlined"
							value={service}
							onChange={(event) => setService(event.target.value)}
							sx={{
								backgroundColor: "white",
								borderRadius: 1,
								height: 55,
								width: 300,
							}}
						/>
						<TextField
							id="outlined-basic"
							label="Введите набор символов"
							variant="outlined"
							value={chars}
							onChange={(event) => setChars(event.target.value)}
							disabled={!example}
							sx={{
								backgroundColor: "white",
								borderRadius: 1,
								height: 55,
								width: 300,
							}}
						/>
						<TextField
							label="Сгенерированный пароль"
							variant="outlined"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							disabled
							sx={{
								backgroundColor: "white",
								borderRadius: 1,
								height: 55,
								width: 300,
							}}
						/>
						<Button
							variant="contained"
							disabled={
								!lenght ||
								!service ||
								(!letter &&
									!number &&
									!symbol &&
									!upper &&
									!lower &&
									!random &&
									!example)
							}
							onClick={handleCreatePassword}
						>
							Сгенерировать
						</Button>

						<Stack direction="row" spacing={3}>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={letter}
											onChange={handleLetterChange}
											disabled={example}
										/>
									}
									label="Использовать ли буквы во время генерации пароля"
								/>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={number}
											onChange={(event) => setNumber(event.target.checked)}
											disabled={example}
										/>
									}
									label="Использовать ли цифры во время генерации пароля"
								/>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={symbol}
											onChange={(event) => setSymbol(event.target.checked)}
											disabled={example}
										/>
									}
									label="Использовать ли спецсимволы во время генерации пароля"
								/>
							</FormGroup>

							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={lower}
											onChange={handleLowerChange}
											disabled={!letter || example || random || upper}
										/>
									}
									label="Использовать нижний регистр"
								/>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={upper}
											onChange={handleUpperChange}
											disabled={!letter || example || random || lower}
										/>
									}
									label="Использовать верхний регистр"
								/>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={random}
											onChange={handleRandomChange}
											disabled={!letter || example || lower || upper}
										/>
									}
									label="Использовать случайный регистр"
								/>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={example}
											onChange={handleExampleChange}
										/>
									}
									label="Использовать свой набор символов"
								/>
							</FormGroup>

							<TextField
								id="outlined-basic"
								label="Длина"
								variant="outlined"
								value={lenght}
								onChange={(event) => setLength(event.target.value)}
								sx={{
									backgroundColor: "white",
									borderRadius: 1,
									height: 55,
									width: 100,
								}}
							/>
							<Button
								variant="contained"
								disabled={!service || !password || !lenght || loading}
								onClick={handlerUploadPassword}
								sx={{ width: 130 }}
							>
								{loading ? "Сохранение..." : "Сохранить"}
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Modal>
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
		</>
	);
};
