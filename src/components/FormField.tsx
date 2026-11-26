import { useId } from 'react'

type Props = {
  name: string
  label: string
  type?: 'text' | 'email' | 'textarea'
  autoComplete?: string
  required?: boolean
  maxLength: number
  error?: string
}

export function FormField({ label, type = 'text', error, ...props }: Props) {
  const id = useId()
  const accessibility = {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}{!props.required && <span> (optional)</span>}</label>
      {type === 'textarea' ? <textarea id={id} rows={5} {...props} {...accessibility} /> : <input id={id} type={type} {...props} {...accessibility} />}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
