import { PATH_DB } from '../constants/contacts.js';
import fs from "node:fs/promises";

export const thanos = async () => {
    try
    {
    const allContactsJson = await fs.readFile(PATH_DB, 'utf-8');
    const allContacts = JSON.parse(allContactsJson);
    const filteredContacts = allContacts.filter(() => Math.random() >= 0.5);
        await fs.writeFile(PATH_DB, JSON.stringify(filteredContacts, null, 2));
         console.log('Thanos has completed his task.');

    } catch (error) {
        console.error(error.message);

}

};

await thanos();
