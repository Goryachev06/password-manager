import type { PasswordOptions } from "../types/Options"


const numbers: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

const symbols: string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", ",", ".", "<", ">", "/", "?"]


export const generatePassword = (options:PasswordOptions) => {
    let arrayHZ: string[] =[]
    
    if (options.numbers) {
        arrayHZ.push(...numbers)
    }

    if (options.letters) {
        arrayHZ.push(...letters)
    }

    if (options.symbols) {
        arrayHZ.push(...symbols)
    }

    if (options.LowRegister){
        let characters: string = options.example.toLowerCase()
        arrayHZ.push(...characters.split(''))

    }

    if (options.UpRegister){
        let characters: string = options.example.toUpperCase()
        arrayHZ.push(...characters.split(''))
    }

    if (options.RandomRegister){
        let lowCharacters: string = options.example.toLowerCase()
        arrayHZ.push(...lowCharacters.split(''))
        let upCharacters: string = options.example.toUpperCase()
        arrayHZ.push(...upCharacters.split(''))
    }

    let password = ''

    for (let count = 0; count<options.long; count++){
        const random = Math.floor(Math.random() * arrayHZ.length)
        password= password + arrayHZ[random]
    }

    return password
}
