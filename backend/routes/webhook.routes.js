import {Router} from 'express';

import * as c from '../controllers/webhook.controller.js';

const r=Router();r.post('/razorpay',c.razorpayWebhook);export default r;
