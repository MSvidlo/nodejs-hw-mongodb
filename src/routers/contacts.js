import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactController, deleteContactController, getContactByIdController, getContactController, patchContactController } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactShema } from '../validation/contatcs.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getContactController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/',
    validateBody(createContactShema),
    ctrlWrapper(createContactController),
    upload.single('photo'));

router.patch('/:contactId',
    validateBody(createContactShema),
    ctrlWrapper(patchContactController),
    upload.single('photo'));

router.delete('/:contactId', ctrlWrapper(deleteContactController));




export default router;
