import { useState } from 'react'
import { Arrow } from './Icons.jsx'

export default function BookingModal({ open, onClose }) {
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  if (!open) return null

  const close = () => { setStatus(''); setError(''); onClose() }
  const submit = async event => {
    event.preventDefault()
    setStatus('sending')
    setError('')
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Unable to send your inquiry right now.')
      form.reset()
      setStatus('success')
    } catch (requestError) {
      setError(requestError.message)
      setStatus('error')
    }
  }

  return <div className="modal-wrap" role="dialog" aria-modal="true" aria-label="Booking inquiry">
    <div className="modal"><button className="close" onClick={close} aria-label="Close">×</button><p className="eyebrow">Booking inquiry</p><h2>Tell me about<br/><em>your project.</em></h2>
      {status === 'success' ? <div className="success"><h3>Thank you.</h3><p>Your inquiry has been received. Khushi will get back to you soon.</p><button className="text-link" onClick={close}>Close <Arrow /></button></div> : <form onSubmit={submit}>
        <input className="form-honeypot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
        <label>Full name<input name="name" required placeholder="Your name" /></label><label>Email address<input name="email" type="email" required placeholder="you@company.com" /></label>
        <label>Phone number<input name="phone" type="tel" required placeholder="+91 00000 00000" /></label><label>Brand / company<input name="company" placeholder="Optional" /></label>
        <label>Collaboration type<select name="type" required defaultValue=""><option value="" disabled>Select type</option><option>Editorial</option><option>Bridal</option><option>Jewellery</option><option>Beauty</option><option>Brand campaign</option><option>Other</option></select></label><label>Preferred date<input name="date" type="date" /></label>
        <label>City<input name="city" required placeholder="Shoot location" /></label><label>Budget<input name="budget" placeholder="Estimated budget" /></label>
        <label className="wide">Project details<textarea name="details" required rows="3" placeholder="A little about the brief, usage and timeline..." /></label>
        <button className="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send inquiry'} <Arrow /></button>{status === 'error' && <p className="form-error" role="alert">{error} Please email directly at chauhan.khushi.1211@gmail.com.</p>}
      </form>}
    </div>
  </div>
}
