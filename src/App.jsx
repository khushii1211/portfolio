import { useEffect, useState } from 'react'
import AboutSection from './components/AboutSection.jsx'
import BookingModal from './components/BookingModal.jsx'
import CampaignSection from './components/CampaignSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import Lightbox from './components/Lightbox.jsx'
import PortfolioSection from './components/PortfolioSection.jsx'
import WhyChooseMeSection from './components/WhyChooseMeSection.jsx'
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    document.body.style.overflow = bookingOpen || selectedImage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [bookingOpen, selectedImage])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const openBooking = () => setBookingOpen(true)

  return <>
    <Header onBook={openBooking} />
    <main>
      <HeroSection onBook={openBooking} />
      <AboutSection />
      <CampaignSection />
      <WhyChooseMeSection />
      <PortfolioSection onSelect={setSelectedImage} />
      <ContactSection onBook={openBooking} />
    </main>
    <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
  </>
}
