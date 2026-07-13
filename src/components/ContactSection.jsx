import { Arrow, InstagramIcon, MailIcon } from './Icons.jsx'

export default function ContactSection({ onBook }) {
  return <section className="contact reveal" id="contact">
    <p className="section-no">04 / Contact</p>
    <div><p className="eyebrow">Let’s create something memorable</p><h2>Have a project<br/>in <em>mind?</em></h2></div>
    <div className="contact-details">
      <a href="mailto:chauhan.khushi.1211@gmail.com"><MailIcon/><span>chauhan.khushi.1211@gmail.com</span></a>
      <a href="https://www.instagram.com/khushii_official1211/" target="_blank" rel="noreferrer" aria-label="Open @khushii_official1211 on Instagram"><InstagramIcon/><span>@khushii_official1211 ↗</span></a>
      <p>Rajkot, Gujarat, India</p>
    </div>
  </section>
}
