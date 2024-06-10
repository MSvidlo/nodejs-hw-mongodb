import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {getAllContacts} from '../services/contacts.js'


const router = Router();


router.get('/', ctrlWrapper(getAllContacts));






export default router;
