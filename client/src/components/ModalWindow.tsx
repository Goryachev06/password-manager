import { Box, Modal, Stack, TextField, Button, FormGroup, FormControlLabel, Checkbox, Snackbar, Alert, type AlertColor} from "@mui/material"
import { useState } from "react"
import { generatePassword } from "../services/generatePassword"

export const ModalWindow = ({open, close}) => {
    const [number, setNumber] = useState(false)
    const [letter, setLetter] = useState(false)
    const [symbol, setSymbol] = useState(false)
    const [lower, setLower] = useState(false)
    const [upper, setUpper] = useState(false)
    const [example, setExample] = useState('')
    const [service, setService] = useState('')
    const [lenght, setLenght] = useState('')
    const [random, setRandom] = useState(false)
    const [password, setPassword] = useState('')
    const [openAlert,setOpenAlert]=useState(false)
    const [textAlert, setTextAlert]=useState('')
    const [alertType, setAlertType] = useState<AlertColor>('success')

    const handleRandomChange = (event) => {
        const checked = event.target.checked
        setRandom(checked)
        if (checked) {
            setLetter(false)
            setNumber(false)
            setSymbol(false)
        }
    }

    const handleLowerChange = (event) => {
        const checked = event.target.checked
        setLower(checked)
        if (checked) {
            setLetter(false)
            setNumber(false)
            setSymbol(false)
        }
    }

    const handleUpperChange = (event) => {
        const checked = event.target.checked
        setUpper(checked)
        if (checked) {
            setLetter(false)
            setNumber(false)
            setSymbol(false)
        }
    }
    
    const handleCreatePassword =() =>{
        const finalOptions={
            numbers: number,
            letters: letter,
            symbols: symbol,
            UpRegister: upper,
            LowRegister: lower,
            RandomRegister:random,
            long: Number(lenght),
            example: example,
        }
        const password = generatePassword(finalOptions)
        setPassword(password)
    }

    const handlerUploadPassword = () => {
        const random = Math.floor(Math.random() * 2)+1
        if (random===1) {
            setTimeout(() => {
                localStorage.setItem(service, password)
                setTextAlert('Пароль успешно сохранен!')
                setAlertType('success')
                setOpenAlert(true)
            },5000)     
        }else{
            setTimeout(() => {
                setTextAlert('Ошибка')
                setAlertType('error')
                setOpenAlert(true)
            },5000)  
        }
    }

    return(
        <>
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
                        <TextField id="outlined-basic" label="Введите название сервиса" variant="outlined" value={service} onChange={(event) => setService(event.target.value)} sx={{
                            backgroundColor: "white",
                            borderRadius:1,
                            height:55,
                            width:300,
                        }}/>
                        <TextField id="outlined-basic" label="Введите набор символов" variant="outlined" value={example} onChange={(event) => setExample(event.target.value)} disabled={!upper && !lower && !random} sx={{
                            backgroundColor:"white",
                            borderRadius:1,
                            height:55,
                            width:300,
                        }}/>
                        <TextField label="Сгенерированный пароль" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} disabled sx={{
                                backgroundColor:"white",
                                borderRadius:1,
                                height:55,
                                width:300,
                            }}
                        />
                        <Button variant="contained" disabled={!lenght || !service || (!letter && !number && !symbol && !upper && !lower && !random)} onClick={handleCreatePassword}>Сгенерировать</Button>
                        
                        <Stack direction="row" spacing={3}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked color="default" checked={letter} onChange={(event) => setLetter(event.target.checked)} disabled={upper || lower || random}/>} label="Использование букв" />
                                <FormControlLabel control={<Checkbox defaultChecked color="default" checked={number} onChange={(event) => setNumber(event.target.checked)} disabled={upper || lower || random}/>} label="Использование цифр" />
                                <FormControlLabel control={<Checkbox defaultChecked color="default" checked={symbol} onChange={(event) => setSymbol(event.target.checked)} disabled={upper || lower || random}/>} label="Использование спецсимволов" />
                            </FormGroup>

                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked color="default" checked={lower} onChange={handleLowerChange} disabled={upper || random}/>} label="Нижний регистер" />
                                <FormControlLabel control={<Checkbox defaultChecked color="default" checked={upper} onChange={handleUpperChange} disabled={lower || random}/>} label="Верхний регистер" />
                                <FormControlLabel control={<Checkbox defaultChecked color="default" checked={random} onChange={handleRandomChange} disabled={upper || lower}/>} label="Случайный регистер" />
                            </FormGroup>

                            <TextField id="outlined-basic" label="Длина" variant="outlined" value={lenght} onChange={(event) => setLenght(event.target.value)} sx={{
                                backgroundColor:"white",
                                borderRadius:1,
                                height:55,
                                width:100,
                            }}/>
                            <Button variant="contained" disabled={!service || !password || !lenght} onClick = {handlerUploadPassword} sx={{width:130}}>Сохранить</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity={alertType} onClose={() => setOpenAlert(false)}>{textAlert} </Alert>
            </Snackbar>
        </>
    )
}