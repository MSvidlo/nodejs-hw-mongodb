import contactsCollection  from "../db/models/contacts.js";


export const getAllContacts = async () => {
    const contacts = await contactsCollection.find();
    return contacts;
};

export const getContactsById = async (contactId) => contactsCollection.findById(contactId);

export const createContact =(contactData) => contactsCollection.create(contactData);

export const changeContact = async (contactId, contactData) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: contactId },
        contactData,
        {
            new: true,
            includeResultMetadata: true,
        }
);
  if (!rawResult || !rawResult.value) return null;
 return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
}

export const deleteContact = (contactId) =>contactsCollection.findByIdAndDelete(contactId);
