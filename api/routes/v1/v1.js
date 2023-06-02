import express from 'express';

import invoice from './invoice.js';
import invoices from './invoices.js';
import user from './user.js';
import users from './users.js';

const router = express.Router();

router.use('/invoice', invoice);
router.use('/invoices', invoices);
router.use('/user', user);
router.use('/users', users);

router.get('/ping', (req, res) => {
  res.status(200).send();
});

export default router;
