import { useState } from 'react'
import { Arrow } from './Icons.jsx'

export default function Header({ onBook }) {
  const [menu, setMenu] = useState(false)
  const closeMenu = () => setMenu(false)

  return <header className="nav">
    <button className="menu-btn" aria-label="Toggle menu" onClick={() => setMenu(!menu)}><span/><span/></button>
    <nav className={menu ? 'open' : ''}>
      {['About', 'Portfolio', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
      <button className="nav-cta" onClick={() => { onBook(); closeMenu() }}>Book me <Arrow /></button>
    </nav>
  </header>
}
