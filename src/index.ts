import './init';

import * as Readline from 'readline';
import Game from './game';
import Database from './database/logic/word.logic';
import Printer from './utility/printer';
import Colors, { setDefaultColors } from './utility/colors';

const env = process.env.NODE_ENV || "add";

const database = new Database();
const game = new Game(database);
const printer = new Printer('Game', [Colors.yellow, Colors.cyan]);
const badColors: [Colors, Colors] = [Colors.yellow, Colors.red];

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const add = () => {
    readline.question('Введите слово для заполнения моего буквенного запаса: ', async (answer: string) => {
        const word = answer.toLowerCase();
        
        if(word === 'прекратить')
            return readline.close();

        database.setWords([word]);

        add();
    });
};

const promt = () => {
    const text = setDefaultColors('Game', 'Введите свое слово: ', [Colors.yellow, Colors.cyan]);

    readline.question(text, async (answer: string) => {
        const word = answer.toLowerCase().replace('ё', 'е');

        if(word === 'прекратить')
        {
            return readline.close();
        };

        if(word.includes(' '))
        {
            printer.print(['Введите слово без пробелов'], badColors);
            return promt();
        };

        if(!word)
        {
            printer.print(['Введите определенное значение'], badColors);
            return promt();
        };

        if(game.lastLetter !== word[0] && game.lastLetter !== ' ')
        {
            printer.print(['Вы написали слово не на ту букву, будьте внимательней'], badColors)
        };

        if(game.usedWords.includes(word))
        {
            printer.print(['Данное слово уже было'], badColors);
        }
        else
        {
            game.setWord(word);
            console.log(game.getNotUsedWord(word));
        };

        promt();
    });
};

setTimeout(() => {
    if(env === "add") add();
    else promt();
}, 2000);