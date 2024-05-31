import { PATH_DB } from '../constants/contacts.js';
import fs from "node:fs/promises";
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
    try {
        const allContactsJson = await fs.readFile(PATH_DB, 'utf-8')
        const allContacts = JSON.parse(allContactsJson)
        const newContact = createFakeContact();
        allContacts.push(newContact);
        await fs.writeFile(PATH_DB,JSON.stringify(allContacts,null,2))
    } catch (error) {
console.error(error.message);
    }
};

await addOneContact();
