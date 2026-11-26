import type { ComponentProps } from 'react'
import type { FormField } from '../../components/FormField'

export const contactFields = [
  { name: 'name', label: 'Name', autoComplete: 'name', maxLength: 120, required: true, missing: 'Enter your name.' },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email', maxLength: 254, required: true, missing: 'Enter your work email.' },
  { name: 'company', label: 'Company', autoComplete: 'organization', maxLength: 160 },
  { name: 'message', label: 'Message', type: 'textarea', maxLength: 3000, required: true, missing: 'Enter a message.' },
] as const satisfies readonly (ComponentProps<typeof FormField> & { missing?: string })[]

type ContactField = (typeof contactFields)[number]

export function validateContactField(field: ContactField, value: string) {
  const trimmed = value.trim()
  if (!trimmed && 'missing' in field) return field.missing
  if (trimmed.length > field.maxLength) return `Use ${field.maxLength} characters or fewer.`
  if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return 'Enter an email address like name@company.com.'
  }
  return ''
}
