import specialCharacters from "./specialCharacters.js";
import config from "config";

export class BookService{
    bookRepo;
    fileParser;
    constructor(fileParser, bookRepo){
        this.fileParser = fileParser;
        this.bookRepo = bookRepo;
    }

    async getTopWords(){
        const text = await this.bookRepo.getBookText();
        const words = this.fileParser.getWords(text);
        const wordCounts = await this.#countWords(words);

        return this.#sortMap(wordCounts).splice(0, config.get('topWordCount'));
    }

    async #countWords(words) {


        const excludedWords = config.get("excluded").map(word => word.toLowerCase());

        const hash = new Map();
        for (let word of words) {
            let cleanWord = this.#removeSuffix(word).toLowerCase();

            if (excludedWords.includes(cleanWord)) {
                continue;
            }


            if (hash.has(cleanWord)) {
                hash.set(cleanWord, hash.get(cleanWord) + 1);
            } else {
                hash.set(cleanWord, 1);
            }
        }

        return hash;
    }

    #sortMap(map){
        return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    }

    #removeSuffix(word){
        for (const specialCharactersKey in specialCharacters) {
            if(word.indexOf(specialCharacters[specialCharactersKey]) !== -1){
                return word.substring(0, word.indexOf(specialCharacters[specialCharactersKey]));
            }
        }
        return word;
    }
}

