import Colors from "./colors";

class Printer {
    private _name: string;
    private _colors: [Colors, Colors];

    constructor(name: string, colors: [Colors, Colors]) {
        this._name = name;
        this._colors = colors;
    };

    public print = (data: any[], colors?: [Colors, Colors]) => {
        const c = colors || this._colors;

        console.log(
            c[0] + `${this._name}:` + Colors.reset +
            c[1], ...data, Colors.reset
        );
    };
};

export default Printer;