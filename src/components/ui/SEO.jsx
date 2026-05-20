import { useEffect } from 'react'

export function SEO({ title, description, image, type = 'website' }) {
  useEffect(() => {
    // Set dynamic page title
    const formattedTitle = title ? `${title} | Arborea Skincare` : 'Arborea | Luxury Botanical Care'
    document.title = formattedTitle

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    const finalDesc = description || 'Premium organic personal care and botanical skincare rituals crafted for glow, hydration, and everyday confidence.'
    metaDescription.setAttribute('content', finalDesc)

    // Set mobile browser theme color (elegant botanical moss)
    let themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta')
      themeColorMeta.setAttribute('name', 'theme-color')
      document.head.appendChild(themeColorMeta)
    }
    themeColorMeta.setAttribute('content', '#4a5d4e')

    // Set Open Graph Tags
    const ogTags = {
      'og:title': formattedTitle,
      'og:description': finalDesc,
      'og:type': type,
      'og:image': image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80',
      'og:url': window.location.href,
      'twitter:card': 'summary_large_image',
      'twitter:title': formattedTitle,
      'twitter:description': finalDesc
    }

    Object.entries(ogTags).forEach(([key, val]) => {
      let meta = document.querySelector(`meta[property="${key}"]`) || document.querySelector(`meta[name="${key}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        if (key.startsWith('og:')) {
          meta.setAttribute('property', key)
        } else {
          meta.setAttribute('name', key)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', val)
    })
  }, [title, description, image, type])

  return null
}
