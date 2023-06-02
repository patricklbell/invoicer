import mailer from '@sendgrid/mail';
import env from '#utils/env.js';

let keyed = false;
export const getMailer = () => {
  if (!keyed) {
    mailer.setApiKey(env.SENDGRID_API_KEY);
  }

  return mailer;
};
