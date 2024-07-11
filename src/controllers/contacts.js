import createHttpError from 'http-errors';
import { changeContact, createContact, deleteContact, getAllContacts, getContactsById } from '../services/contacts.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;  // Додано визначення userId
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const contact = await getContactsById(contactId, userId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const contact = await createContact({ ...req.body, userId });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  {
		  fieldname: 'photo',
		  originalname: 'download.jpeg',
		  encoding: '7bit',
		  mimetype: 'image/jpeg',
		  destination: '/Users/borysmeshkov/Projects/goit-study/students-app/temp',
		  filename: '1710709919677_download.jpeg',
		  path: '/Users/borysmeshkov/Projects/goit-study/students-app/temp/1710709919677_download.jpeg',
		  size: 7
	  }
  const userId = req.user._id;
  try {
    const result = await changeContact(contactId, req.body, userId);
    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const contact = await deleteContact(contactId, userId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
