import { useEffect, useState } from 'react'
import { Arrow } from './Icons.jsx'

const heroImages = [
  ['banner1.jpeg', 'Khushi Chauhan bridal portrait'],
  ['banner2.jpeg', 'Khushi Chauhan in an editorial bridal look'],
  ['banner3.PNG', 'Khushi Chauhan in an ethnic fashion look'],
]

export default function HeroSection({ onBook }) {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActiveImage(index => (index + 1) % heroImages.length), 3500)
    return () => window.clearInterval(timer)
  }, [])

  return <section className="hero" id="home">
    <div className="hero-slides">
      {heroImages.map(([src, alt], index) => <img className={`hero-slide slide-${index + 1} ${index === activeImage ? 'active' : ''}`} src={src} alt={alt} key={src} />)}
    </div>
    <div className="hero-shade" />
    <div className="hero-copy">
      <p className="hero-role">Model <i/> Actress <i/> Influencer</p>
      <h1>Khushi Chauhan</h1>
      <p className="hero-intro">Professional fashion and commercial model based in Gujarat, India, crafting editorial stories with elegance, confidence, and cinematic presence.</p>
      <div className="hero-actions"><a href="#portfolio" className="hero-primary">View portfolio</a><button onClick={onBook} className="hero-secondary">Book Me <Arrow /></button></div>
    </div>
    <div className="hero-dots" aria-label="Hero slides">{heroImages.map((_, index) => <button key={index} className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)} aria-label={`Show slide ${index + 1}`} />)}</div>
  </section>
}
