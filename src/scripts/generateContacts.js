import { fr_SN } from '@faker-js/faker';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import fs from "node:fs/promises";
const generateContacts = async (number) => {
    try {

        const allContactsJson = await fs.readFile(PATH_DB, 'utf-8');
        const allContacts = JSON.parse(allContactsJson);
        for (let i = 0; i < number; i += 1) {

            const newContacts = createFakeContact();
            allContacts.push(newContacts);

        }
        await fs.writeFile(PATH_DB,JSON.stringify(allContacts,null,2))

    } catch (error) {
console.error(error.message);
    }
};

await generateContacts(5);
