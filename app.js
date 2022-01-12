import {BookRepo} from './bookRepo.js'
import {FileParser} from "./fileParser.js";
import {BookService} from "./bookService.js";

async function run(){
    const repo = new BookRepo();
    const fileParser = new FileParser();

    const bookService = new BookService(fileParser, repo);

    const wordCounts = await bookService.getTopWords();

    console.log('wordCounts', wordCounts);


}


run();