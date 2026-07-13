const highlights = [
  '5+ years of professional modeling experience',
  'Editorial, fashion & commercial shoots',
  'Beauty, jewellery & lifestyle campaigns',
  'Professional, reliable & easy to work with',
  'Creative direction & camera confidence',
  'Available for travel across India',
]

export default function WhyChooseMeSection() {
  return <section className="why-me reveal" id="why-me">
    <div className="why-orbit" aria-hidden="true"><span>WHY</span><span>ME</span></div>
    <div className="why-heading">
      <p className="section-no">02 / Why work with me</p>
      <p className="why-label">The difference</p>
      <h2>Why brands<br/>choose <em>me?</em></h2>
      <p className="why-lead">I bring confidence, professionalism, and creativity to every collaboration, helping brands create visually impactful content that genuinely connects with their audience.</p>
    </div>
    <div className="why-highlights">
      <p className="why-label">Highlights</p>
      <div className="highlight-list">{highlights.map((highlight, index) => <div key={highlight}><span>{String(index + 1).padStart(2, '0')}</span><p>{highlight}</p></div>)}</div>
    </div>
    <div className="why-stats">
      <div><strong>100<sup>+</sup></strong><span>Campaigns</span></div>
      <div><strong>15<sup>+</sup></strong><span>Brands</span></div>
      <div><strong>5<sup>+</sup></strong><span>Years experience</span></div>
    </div>
  </section>
}
