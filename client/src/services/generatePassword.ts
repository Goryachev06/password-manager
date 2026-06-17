import type { PasswordOptions } from "../types/Options";

const numbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const lowLetters: string[] = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

const upLetters: string[] = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

const symbols: string[] = [
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"-",
	"_",
	"=",
	"+",
	"[",
	"]",
	"{",
	"}",
	";",
	":",
	",",
	".",
	"<",
	">",
	"/",
	"?",
];

export const generatePassword = (options: PasswordOptions) => {
	const addChars: string[] = [];

	if (typeof options.long !== "number") {
		throw new Error("Длина пароля должна быть целым числом");
	}
	if (options.long % 1 !== 0) {
		throw new Error("Длина пароля должна быть целым числом");
	}

	if (options.long < 1) {
		throw new Error("Длина пароля должна быть больше 0");
	}

	if (options.long > 35) {
		throw new Error("Длина пароля не может превышать 35");
	}

	let password = "";
	if (options.long >= 1) {
		if (options.letters) {
			if (
				!options.LowRegister &&
				!options.UpRegister &&
				!options.RandomRegister
			) {
				throw new Error("Выберите один регистр для букв");
			}
			if (options.LowRegister) {
				addChars.push(...lowLetters);
			}
			if (options.UpRegister) {
				addChars.push(...upLetters);
			}
			if (options.RandomRegister) {
				addChars.push(...lowLetters);
				addChars.push(...upLetters);
			}
		}

		if (options.numbers) {
			addChars.push(...numbers);
		}
		if (options.symbols) {
			addChars.push(...symbols);
		}
		if (options.example) {
			if (options.chars.length == 0) {
				throw new Error("Введите символы для генерации");
			}
			if (options.chars.length > 0) {
				const exampleChars = options.chars.split("");
				addChars.push(...exampleChars);
			}
		}
		for (let i = 0; i < options.long; i++) {
			const char = addChars[Math.floor(Math.random() * addChars.length)];
			password = password + char;
		}
		return password;
	}
};
