import { PATH_DB } from '../constants/contacts.js';
import fs from "node:fs/promises";
export const countContacts = async () => {
    try {
        const allContactsJson = await fs.readFile(PATH_DB, 'utf-8');
        const  allContacts = JSON.parse(allContactsJson);
        const caunt = allContacts.length;
        return caunt

} catch (error) {
console.error(error.message);
        return 0;
}

};

console.log(await countContacts());
