import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactsController, deleteContactController, getContactByIdController, getContactController, patchContactController } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contatcs.js';


const router = Router();


router.get('/', ctrlWrapper(getContactController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/',
    validateBody(createContactSchema),
    ctrlWrapper(createContactsController));

router.patch('/:contactId',
    validateBody(createContactSchema),
    ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));



export default router;
