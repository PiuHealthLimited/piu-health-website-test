import type { ChangeEvent, FormEvent } from 'react';
import type {
  ContactFormErrors,
  ContactFormState,
  ContactFormStatus,
} from '../hooks/useContactForm';

interface ContactFormProps {
  formState: ContactFormState;
  formErrors: ContactFormErrors;
  statusMessage: string;
  statusType: ContactFormStatus;
  isSubmitting: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ContactForm({
  formState,
  formErrors,
  statusMessage,
  statusType,
  isSubmitting,
  onChange,
  onSubmit,
}: ContactFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="title-box">
        <h2 className="title text-dark">Get in Touch with PiuHealth</h2>
        <p className="mt-2">
          Share a little about yourself—whether you&apos;re an individual, partner, or
          organization—and we&apos;ll connect you with the right information.
        </p>
      </div>

      <div className="contact-form mt-4">
        <div className="row">
          <div className="col-lg-6 col-sm-12 mb-3">
            <div className="form-group">
              <label className="mb-2" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                value={formState.name}
                onChange={onChange}
                required
                aria-invalid={formErrors.name ? 'true' : 'false'}
              />
              {formErrors.name ? (
                <p className="text-danger small mt-1" role="alert">
                  {formErrors.name}
                </p>
              ) : null}
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 mb-3">
            <div className="form-group">
              <label className="mb-2" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                value={formState.email}
                onChange={onChange}
                required
                aria-invalid={formErrors.email ? 'true' : 'false'}
              />
              {formErrors.email ? (
                <p className="text-danger small mt-1" role="alert">
                  {formErrors.email}
                </p>
              ) : null}
            </div>
          </div>
          <div className="col-lg-12 col-sm-12 mb-3">
            <div className="form-group">
              <label className="mb-2" htmlFor="contact-phone">
                Phone <span className="text-muted">(optional)</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Your Phone Number"
                value={formState.phone}
                onChange={onChange}
                aria-invalid={formErrors.phone ? 'true' : 'false'}
              />
              {formErrors.phone ? (
                <p className="text-danger small mt-1" role="alert">
                  {formErrors.phone}
                </p>
              ) : null}
            </div>
          </div>
          <div className="col-lg-12 col-sm-12 mb-3">
            <div
              className="form-group section-field textarea wow fadeInUp"
              data-wow-duration="2.5s"
            >
              <label className="mb-2" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className="input-message w-100"
                name="message"
                placeholder="Type Your Message Here"
                rows={5}
                value={formState.message}
                onChange={onChange}
                required
                aria-invalid={formErrors.message ? 'true' : 'false'}
              />
              {formErrors.message ? (
                <p className="text-danger small mt-1" role="alert">
                  {formErrors.message}
                </p>
              ) : null}
            </div>
            <button
              id="submit"
              name="submit"
              type="submit"
              value="Send"
              className="button pull-right wow fadeInUp mt-3"
              data-wow-duration="1.0s"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>
      {statusMessage ? (
        <p className={`mt-3 ${statusType === 'success' ? 'text-success' : 'text-danger'}`}>
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
