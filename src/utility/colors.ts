export enum Colors {
    reset = "\u001B[0m",

    bold = "\u001b[1m",
    italic = "\u001b[3m",
    underline = "\u001b[4m",
    reversed = "\u001b[7m",

    black = "\u001b[30m",
    blue = "\u001b[34m",
    cyan = "\u001b[36m",
    green = "\u001b[32m",
    magenta = "\u001b[35m",
    red = "\u001b[31m",
    yellow = "\u001b[33m",
    white = "\u001B[0m",
    
    brightBlack = "\u001b[30;1m",
    brightBlue = "\u001b[34;1m",
    brightGreen = "\u001b[32;1m",
    brightMagenta = "\u001b[35;1m",
    brightRed = "\u001b[31;1m",
    brightCyan = "\u001b[37m",
    brightWhite = "\u001b[37;1m",
    brightYellow = "\u001b[33;1m",

    bgBlack = "\u001b[40m",
    bgBlue = "\u001b[44m",
    bgCyan = "\u001b[46m",
    bgGreen = "\u001b[42m",
    bgMagenta = "\u001b[45m",
    bgRed = "\u001b[41m",
    bgWhite = "\u001b[47m",
    bgYellow = "\u001b[43m",
    bgBrightBlack = "\u001b[40;1m",
    bgBrightBlue = "\u001b[44;1m",
    bgBrightCyan = "\u001b[46;1m",
    bgBrightGreen = "\u001b[42;1m",
    bgBrightMagenta = "\u001b[45;1m",
    bgBrightRed = "\u001b[41;1m",
    bgBrightWhite = "\u001b[47;1m",
    bgBrightYellow = "\u001b[43;1m",
};

const setDefaultColors = (name: string, text: string, colors: [Colors, Colors]) => {
    return colors[0] + `${name}: ` + Colors.reset +
        colors[1] + text + Colors.reset;
};

export {
    setDefaultColors
};

export default Colors;