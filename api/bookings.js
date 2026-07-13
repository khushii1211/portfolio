const requiredFields = ['name', 'email', 'phone', 'city', 'details']

const clean = value => typeof value === 'string' ? value.trim() : ''
const escapeHtml = value => clean(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
  } catch {
    return res.status(400).json({ error: 'Invalid request.' })
  }

  // Bots tend to fill hidden fields. Return success without sending an email.
  if (clean(body.website)) return res.status(201).json({ message: 'Booking inquiry received.' })

  if (!requiredFields.every(field => clean(body[field]))) {
    return res.status(400).json({ error: 'Please complete all required fields.' })
  }
  if (!/^\S+@\S+\.\S+$/.test(clean(body.email))) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.BOOKING_TO_EMAIL || 'chauhan.khushi.1211@gmail.com'
  const from = process.env.BOOKING_FROM_EMAIL || 'Portfolio Bookings <onboarding@resend.dev>'

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(503).json({ error: 'The booking service is not configured yet.' })
  }

  const labels = {
    name: 'Name', email: 'Email', phone: 'Phone', company: 'Brand / company',
    type: 'Collaboration type', date: 'Preferred date', city: 'City',
    budget: 'Budget', details: 'Project details',
  }
  const fields = Object.entries(labels).map(([key, label]) => [label, clean(body[key]) || '—'])
  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n')
  const html = `<h2>New portfolio booking inquiry</h2>${fields.map(([label, value]) =>
    `<p><strong>${label}:</strong><br>${escapeHtml(value).replaceAll('\n', '<br>')}</p>`
  ).join('')}`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: clean(body.email),
        subject: `New booking inquiry from ${clean(body.name).replace(/[\r\n]/g, ' ')}`,
        text,
        html,
      }),
    })

    if (!response.ok) {
      console.error('Resend rejected booking email', response.status, await response.text())
      return res.status(502).json({ error: 'Unable to deliver the inquiry right now.' })
    }

    return res.status(201).json({ message: 'Booking inquiry received.' })
  } catch (error) {
    console.error('Booking email failed', error)
    return res.status(500).json({ error: 'Unable to deliver the inquiry right now.' })
  }
}
