import { useEffect, useRef, useState, type FormEvent } from 'react'
import { FormField } from '../../components/FormField'
import { contactFields, validateContactField } from './contactFields'
import { contactAvailable, submitContact } from './submitContact'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const firstInvalid = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  useEffect(() => {
    firstInvalid.current?.focus()
    firstInvalid.current = null
  }, [errors])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors: Record<string, string> = {}
    for (const field of contactFields) {
      const error = validateContactField(field, String(data.get(field.name) ?? ''))
      if (error) nextErrors[field.name] = error
    }
    const invalidName = Object.keys(nextErrors)[0]
    if (invalidName) firstInvalid.current = form.querySelector(`[name="${invalidName}"]`)
    setErrors(nextErrors)
    if (invalidName || !contactAvailable) return
    setStatus('sending')
    try {
      await submitContact(data)
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit} onInput={(event) => {
      if (status === 'success' || status === 'error') setStatus('idle')
      const target = event.target
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return
      const field = contactFields.find(({ name }) => name === target.name)
      if (field && errors[field.name]) {
        const error = validateContactField(field, target.value)
        setErrors((current) => ({ ...current, [field.name]: error }))
      }
    }} aria-busy={status === 'sending'}>
      <h2>Send us a message</h2>
      <fieldset disabled={status === 'sending'}>
        {contactFields.map(({ missing: _missing, ...field }: (typeof contactFields)[number] & { missing?: string }) => (
          <FormField key={field.name} {...field} error={errors[field.name]} />
        ))}
        <button className="button" type="submit">{status === 'sending' ? 'Sending…' : 'Send message'}</button>
      </fieldset>
      {!contactAvailable && <p className="form-feedback">Online submissions are currently unavailable.</p>}
      <div role="status">
        {status === 'success' && <p className="form-feedback success">Thanks. Your message was sent.</p>}
        {status === 'error' && <p className="form-feedback error">We couldn’t confirm your submission. Please try again.</p>}
      </div>
    </form>
  )
}
