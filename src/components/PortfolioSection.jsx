import { useMemo, useState } from 'react'
import { portfolioFilters, portfolioImages } from '../data/portfolio.js'

export default function PortfolioSection({ onSelect }) {
  const [filter, setFilter] = useState('All')
  const visibleImages = useMemo(() => filter === 'All' ? portfolioImages : portfolioImages.filter(image => image[1] === filter), [filter])

  return <section className="portfolio reveal" id="portfolio">
    <div className="portfolio-head"><div><p className="section-no">03 / Selected work</p><h2>Portfolio</h2></div><p>A curated selection of editorial, bridal, jewellery and commercial work.</p></div>
    <div className="filters" role="group" aria-label="Portfolio filters">{portfolioFilters.map(item => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
    <div className="gallery">{visibleImages.map((item, index) => <button className="shot" style={{ '--delay': `${index * 35}ms` }} onClick={() => onSelect(item)} key={item[0]}><img src={item[0]} alt={item[2]} loading="lazy"/><span><small>{item[1]}</small>{item[2]}</span></button>)}</div>
  </section>
}
