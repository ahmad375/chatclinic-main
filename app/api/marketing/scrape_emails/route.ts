import { appendFileSync, readFileSync } from 'fs'
import neatCSV from 'neat-csv'
import EmailExtractor from 'node-email-extractor'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    if (process.env.NODE_ENV !== 'development') throw new Error()

    const tawkToLeads = await neatCSV(
      readFileSync('leads/source/hunter-tawkto-0-3.csv')
    )
    const scrapedLeads = await neatCSV('/leads/output')

    var counter = 0

    for (const tawkToLead of tawkToLeads) {
      console.log(
        `Processing lead ${++counter} of ${tawkToLeads.length.toLocaleString()}`
      )
      const domain = tawkToLead['Domain name']
      const company = tawkToLead['Company name']
      const url = `https://${domain}`
      if (domain && company) {
        try {
          const { emails } = (await EmailExtractor.url(url)) as {
            emails?: string[]
          }
          if (emails && emails.length) {
            const email = emails[0]
            appendFileSync(
              'leads/source/leads.csv',
              `\n${company},${domain},${email}`
            )
          }
        } catch {
          continue
        }
      }
    }

    console.log(tawkToLeads.length)

    return new Response('Ok', {
      status: 200
    })
  } catch (e) {
    console.log(`/api/marketing/scrape_emails error: ${e}`)
    return new Response(null, {
      status: 200
    })
  }
}
