import type { PasswordOptions } from "../types/Options";

const numbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const letters: string[] = [
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
	const addChars: string[] =[]
	if (options.long > 0) {
		if (options.letters) {
			addChars.push(...letters)
		}
		if (options.numbers) {
			addChars.push(...numbers)
		}
		if (options.symbols) {
			addChars.push(...symbols)
		}
		if (options.UpRegister) {
			if (letters in addChars)
		}
	} 
};
