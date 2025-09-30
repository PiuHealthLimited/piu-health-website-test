import axios from 'axios';
import appConfiguration from '@/config/config';

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  timezone: string;
}

export const submitContactForm = async (payload: ContactFormPayload) => {
  return axios.post(appConfiguration.contactFormUrl, JSON.stringify(payload));
};
