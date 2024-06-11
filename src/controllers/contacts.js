import createHttpError from 'http-errors';
import {changeContact, createContact, deleteContact, getAllContacts, getContactsById} from '../services/contacts.js'

export const getContactController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
    })
}


export const getContactByIdController = async (req, res, next) => {
    const { contatctId } = req.params;
    const contact = await getContactsById(contatctId);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
         data:contact,
    })
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
         data:contact,
    })
}

export const patchContactController = async (req, res,next ) => {

    const { contactId } = req.params;
    const result = await changeContact(contactId,req.body);

   if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

    res.json({
        status: 200,
        message: `Successfully created a contact!`,
         data:result.contact,
    })
}

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
     next(createHttpError(404, 'not found'));
        return;
    };
     res.status(204).send();
}





