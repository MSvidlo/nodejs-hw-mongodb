import { fr_SN } from '@faker-js/faker';
import { PATH_DB } from '../constants/contacts.js';
import fs from "node:fs/promises";


export const removeAllContacts = async () => {
    try {
        const allContacts = await fs.readFile(PATH_DB, 'utf-8');
        const allContactsJson = JSON.parse(allContacts);
        const emptyArray = [];
        await fs.writeFile(PATH_DB, JSON.stringify(emptyArray, null, 2));

    } catch (error) {
console.error(error.message);
    }
};

await removeAllContacts();
