import { fr_SN } from '@faker-js/faker';
import { PATH_DB } from '../constants/contacts.js';
import fs from "node:fs/promises";

export const getAllContacts = async () => {
    try {
     const allContactsJson = await fs.readFile(PATH_DB, 'utf-8');
    const allContacts = JSON.parse(allContactsJson);
    console.log(allContacts);
    } catch (error) {
console.error(error.message);
    }

};

console.log(await getAllContacts());
