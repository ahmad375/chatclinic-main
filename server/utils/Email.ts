const Brevo = require('@getbrevo/brevo')
const defaultClient = Brevo.ApiClient.instance

const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.BREVO_API_KEY!

const api = new Brevo.TransactionalEmailsApi()

interface To {
  name?: string
  email: string
}
type Params = Record<string, any>

export class Email {
  private static async send(templateId: number, to: To[], params?: Params) {
    try {
      if (to.length)
        for (const r of to) {
          await api.sendTransacEmail({
            templateId,
            to: [r],
            params
          })
        }
    } catch (e) {
      console.log(`Email.send error: ${e}`)
    }
  }

  public static async sendRecoveryEmail(
    email: string,
    name: string,
    link: string
  ): Promise<void> {
    await Email.send(
      1,
      [
        {
          email
        }
      ],
      {
        email,
        name,
        link
      }
    )
  }
}
