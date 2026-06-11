import { Box, Button, Stack, Typography } from "@mui/material"
import { ModalWindow } from "../components/ModelWindow"
import { useState } from "react"

export const BasePage = () =>{
    const [modalOpen, setModalOpen] = useState(false)
    const handleCreatePassword = () =>{
        setModalOpen(true)
    }
    return(
        <Box>
            <Box sx={{
                display:"flex",
                height:'1vh',
                justifyContent:"center",
            }}>
                <Typography sx={{
                    fontSize: 50,
                }}> Менеджер паролей </Typography>
            </Box>
            <Box sx={{
            display: "flex",
            width:"100%",
            height:"100vh",
            justifyContent:'center',
            alignItems:'center',
            }}>
                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width: "50%",
                    height: "70%",
                    backgroundColor: "#556B90",
                    borderRadius: 10,
                }}>
                    <Stack spacing={10}>
                        <Button variant="contained" sx={{
                            color: "black",
                            backgroundColor: "#D1D7E0",
                            width: 250,
                            height: 100,
                        }} onClick={handleCreatePassword}>Создать пароль</Button>

                        <Button variant="contained" sx={{
                            color: "black",
                            backgroundColor: "#D1D7E0",
                            width: 250,
                            height:100,
                        }}>Посмотреть пароли</Button>
                    </Stack>
                </Box>
            </Box>
            <ModalWindow open={modalOpen} close={() => setModalOpen(false)} />
        </Box>
    )
}

