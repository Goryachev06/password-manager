import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Format } from "../types/Format";

export const PasswordFrame = ({ info }: { info: Format }) => {
	const password = info.password;

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
		</Box>
	);
};
