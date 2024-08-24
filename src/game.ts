import Database from "./database/logic/word.logic";
import { Random } from 'random-js';

import Colors, { setDefaultColors } from "./utility/colors";
import Printer from "./utility/printer";

const data = new Database();
const random = new Random();
const printer = new Printer('GameBot', [Colors.red, Colors.green]);

class Game {
    private _notUsedWords: string[] = [];
    private _usedWords: string[] = [];
    private _allWords: string[] = [];
    private _exceptions: string[] = [ 'ь', 'ъ', 'ы' ];
    private _data?: Database;
    private _lastLetter: string = ' ';

    constructor(database?: Database) {
        this._data = database;

        this.init();
    };

    private init = async () => {
        if(!this._data)
            this._data = data;

        this._allWords = await this._data.getWords();
        this._notUsedWords = await this._data.getWords();
    };

    private setUsedWords = (words: string[]) => {
        this._usedWords = [ ...this._usedWords, ...words ];
    };

    private setNotUsedWord = (word: string) => {
        this._notUsedWords = this._notUsedWords.filter(value => value != word);
    };

    private getLastLetter = (word: string): string => {
        const lastIndex = word.length-1;
        const lastLetter = word[lastIndex];

        for(const exception of this._exceptions)
        {
            if(lastLetter === exception)
            {
                const wordArray = word.split('');
                wordArray.pop();

                return this.getLastLetter(wordArray.join(''));
            };
        };

        return lastLetter;
    };

    public setWord = (word: string) => {
        if(word.length <= 1)
            return;

        this.setNotUsedWord(word);
        this.setUsedWords([word]);
        
        data.setWords([word]);
    };

    public getNotUsedWord = (word: string): string => {
        const lastIndex = word.length-1;
        const lastLetter = word[lastIndex];

        const words = this._notUsedWords.filter((value: string) =>
            value[0] === lastLetter);

        if(words.length === 0)
        {
            const nextLetter = word[lastIndex-1];
            
            if(!this._exceptions.filter(ex => ex === lastLetter).includes(lastLetter))
            {
                printer.print([`Ой, не могу найти слово на "${lastLetter}" перехожу на другую букву (${nextLetter ? nextLetter : 'Кончились буквы'})`]);
                
                if(word.length <= 1)
                {
                    printer.print(['Конец игры, я не смог найти слова... Ты победил']);
                    process.exit();
                };
            };

            const wordArray = word.split('');
            wordArray.pop();

            return this.getNotUsedWord(wordArray.join(''));
        }
        else
        {
            const randomIndex = random.integer(0, words.length-1);
            const randomWord = random.shuffle(words)[randomIndex];
    
            this.setWord(randomWord);

            const randomWordArray = randomWord.split('');
            randomWordArray[0] = randomWordArray[0].toUpperCase();

            const lastLetter = this.getLastLetter(randomWord);
            this._lastLetter = lastLetter;

            return setDefaultColors('GameBot', `${randomWordArray.join('')}, тебе на "${lastLetter}"`, [Colors.red, Colors.green]);
        };
    };

    get lastLetter(): string {
        return this._lastLetter;
    };

    get usedWords(): string[] {
        return this._usedWords;
    };

    get allWords(): string[] {
        return this._allWords;
    };
};

export default Game;