import type { Metadata } from 'next'
import { SiteConfig } from '@/lib'
import { GlobalProviders } from '@/components/providers'
import type { LayoutProps } from '@/types'
import '@/styles/global.css'

export const metadata: Metadata = {
  title: {
    default: `${SiteConfig.baseTitle} - Custom chatbots for your business`,
    template: `%s - ${SiteConfig.baseTitle}`
  },
  description: SiteConfig.description,

  openGraph: {
    title: SiteConfig.baseTitle,
    description: SiteConfig.description,
    url: process.env.NEXT_PUBLIC_APP_URI!,
    siteName: SiteConfig.baseTitle,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URI}/images/preview.png`,
        width: 1200,
        height: 630
      }
    ]
  }
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-M191ECSWB3'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-M191ECSWB3');`
          }}
        />
        {/* For links in client widget/frames */}
        <base target='_blank' />
      </head>
      {/* For iframe view */}
      <body style={{ backgroundColor: 'transparent' }}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  )
}
