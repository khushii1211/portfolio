export default function Lightbox({ image, onClose }) {
  if (!image) return null
  return <div className="lightbox" onClick={onClose}><button aria-label="Close">×</button><img src={image[0]} alt={image[2]}/><p>{image[1]} · {image[2]}</p></div>
}
