import { book } from "../book.model.js";
import { person } from "../person.model.js";

export type DetailedPerson = person & {book: book[]}