import apostrophes from "./specialCharacters.js";
import config from 'config';

export class FileParser{
    getWords(text){
        const stopIndex = text.indexOf(config.get('stopText'));
        if(stopIndex > -1)
            text = text.substring(0, stopIndex);

        let array = [];
        let word = '';
        for(let i = 0; i < text.length; i++){
            let currentLetter = text[i];
            if(isValidCharacter(currentLetter)){
                word += currentLetter;
            } else {
                if (word.length <= 0) {
                    continue;
                }
                array.push(word);
                word = '';
            }
        }

        if(word.length > 0)
            array.push(word);
        return array;
    }
}

function isValidCharacter(character){
    return (isLetter(character) || isAllowedSpecialCharacter(character));
}

function isAllowedSpecialCharacter(character){
    return apostrophes.has(character);
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}