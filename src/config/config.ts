import { get } from 'lodash';
import { ObjectSchema, ValidationError, object, string } from 'yup';
import type { IConfiguration, IEnvVars } from './config.interfaces';

// Define the schema for the environment variables using Yup
const envVarsSchema: ObjectSchema<IEnvVars> = object({
  VITE_CONTACT_FORM_URL: string()
    .required('Contact form URL is required')
    .label('Contact form URL'),
});

// Validate and extract environment variables
const validateEnvVars = (): { envVars: IEnvVars; error: string | null } => {
  try {
    const envVars = envVarsSchema.validateSync(import.meta.env, { abortEarly: false }) as IEnvVars;

    return { envVars, error: null };
  } catch (error) {
    const errorMessage: string = (error as ValidationError).errors.join(', ');

    return { envVars: {} as IEnvVars, error: `Config validation error: ${errorMessage}` };
  }
};

const { envVars, error } = validateEnvVars();

if (error) {
  throw new Error(error);
}

const appConfiguration: IConfiguration = {
  contactFormUrl: get(envVars, 'VITE_CONTACT_FORM_URL'),
};

export default appConfiguration;
