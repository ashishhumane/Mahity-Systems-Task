const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

export const contactAvailable = Boolean(endpoint)

export async function submitContact(formData: FormData) {
  const body = new URLSearchParams()
  for (const [key, value] of formData) {
    if (typeof value === 'string') body.set(key, value.trim())
  }

  const response = await fetch(endpoint, { method: 'POST', body, signal: AbortSignal.timeout(15000) })
  if (!response.ok) throw new Error('Submission failed')
  const result = await response.json()
  if (result?.ok !== true) throw new Error('Submission was not confirmed')
}
