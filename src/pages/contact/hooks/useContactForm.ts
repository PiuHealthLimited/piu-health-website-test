import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { InferType } from 'yup';
import { ValidationError, object, string } from 'yup';
import { submitContactForm } from '@/services/contactService';

const contactFormSchema = object({
  name: string().trim().required('Name is required'),
  email: string().trim().email('Please enter a valid email address').required('Email is required'),
  phone: string()
    .trim()
    .optional()
    .test(
      'phone-format',
      'Please enter a valid phone number',
      (value: string | undefined) => !value || /^[0-9+()\s-]{7,}$/.test(value),
    ),
  message: string().trim().required('Message is required'),
});

export type ContactFormState = InferType<typeof contactFormSchema>;

export type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

export type ContactFormStatus = 'success' | 'error' | '';

const INITIAL_STATE: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export const useContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusType, setStatusType] = useState<ContactFormStatus>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const timezone = useMemo(() => {
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat !== 'function') {
      return 'UTC';
    }

    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC';
    } catch (error) {
      console.warn('Unable to determine browser timezone. Falling back to UTC.', error);

      return 'UTC';
    }
  }, []);

  const validateField = useCallback(
    async (fieldName: keyof ContactFormState, values: ContactFormState) => {
      try {
        await contactFormSchema.validateAt(fieldName as string, values);
        setFormErrors((prev) => {
          const next = { ...prev };
          delete next[fieldName];
          return next;
        });
      } catch (error) {
        const validationError = error as ValidationError;
        setFormErrors((prev) => ({ ...prev, [fieldName]: validationError.message }));
      }
    },
    [],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      const fieldName = name as keyof ContactFormState;

      setFormState((prevState: ContactFormState) => {
        const nextState = { ...prevState, [fieldName]: value } as ContactFormState;
        void validateField(fieldName, nextState);
        return nextState;
      });
    },
    [validateField],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatusMessage('');
      setStatusType('');
      setIsSubmitting(true);

      let validatedData: ContactFormState;

      try {
        validatedData = await contactFormSchema.validate(formState, {
          abortEarly: false,
          stripUnknown: true,
        });

        setFormErrors({});
      } catch (error) {
        const validationError = error as ValidationError;

        const validationErrors: ContactFormErrors = {};

        if (validationError.inner.length > 0) {
          validationError.inner.forEach((fieldError: ValidationError) => {
            if (fieldError.path) {
              validationErrors[fieldError.path as keyof ContactFormState] = fieldError.message;
            }
          });
        } else if (validationError.path) {
          validationErrors[validationError.path as keyof ContactFormState] =
            validationError.message;
        }

        setFormErrors(validationErrors);

        setStatusType('error');

        setStatusMessage('Please correct the errors highlighted below.');

        setIsSubmitting(false);

        return;
      }

      try {
        const submissionResult = await submitContactForm({
          ...validatedData,
          phone: validatedData.phone?.trim() || '',
          timezone,
        });

        if (!submissionResult.data.ok) {
          throw new Error(submissionResult.data.error ?? 'Unknown submission error');
        }

        setStatusType('success');

        setStatusMessage(
          submissionResult.data.ok
            ? 'Form was successfully submitted.'
            : 'Form submitted successfully, but we were unable to verify the response due to network restrictions.',
        );

        setFormState(INITIAL_STATE);
      } catch (submissionError) {
        console.error('Contact form submission failed', submissionError);
        setStatusType('error');
        setStatusMessage('There was an issue submitting the form. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, timezone],
  );

  return {
    formState,
    formErrors,
    statusMessage,
    statusType,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};
