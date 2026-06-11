import { Box, Modal, Stack, TextField, Button, FormGroup, FormControlLabel, Checkbox} from "@mui/material"


export const ModalWindow = ({open, close}) => {
    return(
        <Modal open={open} onClose={close} sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Box sx={{
                display:"flex",
                backgroundColor:"#556B90",
                justifyContent:"center",
                alignItems: "center",
                width:"70%",
                height:"70%",
                border: 5,
                borderRadius:5,
            }}>
                <Stack spacing={4} sx={{
                    width: "100%",
                    alignItems: "center",
                }}>
                    <TextField id="outlined-basic" label="Введите название сервиса" variant="outlined"  sx={{
                        backgroundColor: "white",
                        borderRadius:1,
                        height:55,
                        width:300,
                    }}/>
                    <TextField id="outlined-basic" label="Пароль" variant="outlined" sx={{
                        backgroundColor:"white",
                        borderRadius:1,
                        height:55,
                        width:300,
                    }}/>
                    <Button variant="contained">Сгенерировать</Button>
                    
                    <Stack direction="row" spacing={3}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Использование букв" />
                            <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Использование цифр" />
                            <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Использование спецсимволов" />
                        </FormGroup>

                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Нижний регистер" />
                            <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Верхний регистер" />
                            <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Случайный регистер" />
                        </FormGroup>

                        <TextField id="outlined-basic" label="Длина" variant="outlined" sx={{
                            backgroundColor:"white",
                            borderRadius:1,
                            height:55,
                            width:100,
                        }}/>
                        <Button variant="contained" sx={{width:130}}>Сохранить</Button>
                    </Stack>
                </Stack>

            </Box>
        </Modal>
    )
}