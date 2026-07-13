import { Arrow } from './Icons.jsx'

export default function CampaignSection() {
  return <section className="campaign reveal">
    <div className="campaign-image"><img src="bridal5.jpeg" alt="Featured bridal campaign" /></div>
    <div className="campaign-copy">
      <p className="eyebrow">Featured story · Bridal 2026</p>
      <h2>The art of<br/><em>becoming</em></h2>
      <p>An intimate bridal study in soft light, heirloom details and quiet confidence.</p>
      <a className="campaign-button" href="#portfolio">View portfolio <Arrow /></a>
    </div>
  </section>
}
