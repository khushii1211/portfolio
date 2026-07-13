import { useState } from 'react'
import { Arrow } from './Icons.jsx'

export default function BookingModal({ open, onClose }) {
  const [status, setStatus] = useState('')
  if (!open) return null

  const close = () => { setStatus(''); onClose() }
  const submit = async event => {
    event.preventDefault(); setStatus('sending')
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!response.ok) throw new Error('Unable to send')
      setStatus('success'); event.currentTarget.reset()
    } catch { setStatus('error') }
  }

  return <div className="modal-wrap" role="dialog" aria-modal="true" aria-label="Booking inquiry">
    <div className="modal"><button className="close" onClick={close} aria-label="Close">×</button><p className="eyebrow">Booking inquiry</p><h2>Tell me about<br/><em>your project.</em></h2>
      {status === 'success' ? <div className="success"><h3>Thank you.</h3><p>Your inquiry has been received. Khushi will get back to you soon.</p><button className="text-link" onClick={close}>Close <Arrow /></button></div> : <form onSubmit={submit}>
        <label>Full name<input name="name" required placeholder="Your name" /></label><label>Email address<input name="email" type="email" required placeholder="you@company.com" /></label>
        <label>Phone number<input name="phone" type="tel" required placeholder="+91 00000 00000" /></label><label>Brand / company<input name="company" placeholder="Optional" /></label>
        <label>Collaboration type<select name="type" required defaultValue=""><option value="" disabled>Select type</option><option>Editorial</option><option>Bridal</option><option>Jewellery</option><option>Beauty</option><option>Brand campaign</option><option>Other</option></select></label><label>Preferred date<input name="date" type="date" /></label>
        <label>City<input name="city" required placeholder="Shoot location" /></label><label>Budget<input name="budget" placeholder="Estimated budget" /></label>
        <label className="wide">Project details<textarea name="details" required rows="3" placeholder="A little about the brief, usage and timeline..." /></label>
        <button className="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send inquiry'} <Arrow /></button>{status === 'error' && <p className="form-error">Couldn’t send right now. Please email directly at chauhan.khushi.1211@gmail.com.</p>}
      </form>}
    </div>
  </div>
}
