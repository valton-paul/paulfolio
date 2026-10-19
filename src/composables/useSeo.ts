import { onMounted } from 'vue'

import { PROFILE, SITE } from '@/data/content'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function useSeo(pipelineYear: number) {
  onMounted(() => {
    const title = `${SITE.name} — Pipeline #${pipelineYear} · ${PROFILE.fullName}`
    document.title = title
    document.documentElement.lang = 'fr'

    upsertMeta('name', 'description', SITE.description)
    upsertMeta('name', 'author', PROFILE.fullName)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    upsertMeta(
      'name',
      'keywords',
      [
        PROFILE.fullName,
        'DevOps',
        'développeur logiciel',
        'Montpellier',
        'CI/CD',
        'Vue.js',
        'Kubernetes',
        'portfolio',
      ].join(', '),
    )

    upsertMeta('property', 'og:type', 'profile')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:locale', SITE.locale)
    upsertMeta('property', 'og:url', SITE.url)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', SITE.description)
    upsertMeta('property', 'og:image', SITE.image)
    upsertMeta('property', 'profile:first_name', PROFILE.firstName)
    upsertMeta('property', 'profile:last_name', PROFILE.lastName)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', SITE.description)
    upsertMeta('name', 'twitter:image', SITE.image)

    upsertLink('canonical', SITE.url)

    upsertJsonLd('seo-person', {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE.url}/#person`,
      name: PROFILE.fullName,
      givenName: PROFILE.firstName,
      familyName: PROFILE.lastName,
      jobTitle: PROFILE.role,
      email: PROFILE.email,
      url: SITE.url,
      image: SITE.image,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montpellier',
        addressCountry: 'FR',
      },
      worksFor: {
        '@type': 'Organization',
        name: PROFILE.companyLong,
        alternateName: PROFILE.company,
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: PROFILE.school,
      },
      knowsAbout: PROFILE.knowsAbout,
      knowsLanguage: ['fr', 'en'],
      sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.tryhackme, PROFILE.site],
    })

    upsertJsonLd('seo-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: 'fr-FR',
      author: { '@id': `${SITE.url}/#person` },
      about: { '@id': `${SITE.url}/#person` },
    })

    upsertJsonLd('seo-profile', {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${SITE.url}/#profile`,
      url: SITE.url,
      name: title,
      description: SITE.description,
      inLanguage: 'fr-FR',
      mainEntity: { '@id': `${SITE.url}/#person` },
      dateModified: new Date().toISOString().slice(0, 10),
    })
  })
}
