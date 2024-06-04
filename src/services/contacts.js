import Contacts from "../db/models/contacts";


export const getAllContacts = async () => {
    const contacts = await Contacts.find();
    return contacts;
};

export const getContactsById = async (contactId) => {
    const contacts = await Contacts.findById(contactId);
    return contacts;
}
