import database from "../schema/words.schema";

class Database {
    private _words: string[] = [];
    
    constructor() {
        this.init();
    };

    private init = async () => {
        let data = (await database.find({ name: "standart" }))[0];
        
        if(!data)
            data = await database.create({ name: "standart", words: [] });

        this._words = data.words;
    };

    public setWords = async(words: string[]) => {
        let data = (await database.find({ name: "standart" }))[0];
        
        if(!data)
            data = await database.create({ name: "standart", words: [] });

        for(const word of words) {
            if(this._words.includes(word))
                continue;

            this._words.push(word);
        };

        return await database.updateOne({name: "standart"}, {
            words: this._words
        });
    };

    public getWords = async () => {
        let data = (await database.find({ name: "standart" }))[0];
        
        if(!data)
            data = await database.create({ name: "standart", words: [] });

        return this._words;
    };
};

export default Database;