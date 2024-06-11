import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactController, getContactByIdController, getContactController, patchContactController } from '../controllers/contacts.js';


const router = Router();


router.get('/', ctrlWrapper(getContactController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactController));

router.patch('/:contactId', ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContact));



export default router;
