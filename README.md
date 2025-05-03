# ChatClinic

To run this application locally:

- Run `yarn install` to install dependencies
- Run `yarn dev` to start Next.js development server on http://localhost:3000

How to run the project on production:

1. Deploy the main project on vercel.
2. Deploy socket server in heroku.
3. Replace with new hosted URLs for cors in socket server
4. Connect vercel and new domain.
5. Set up Environment variables.

Required environment variables (.env.local in development mode; managed by Vercel on production)
- `OPENAI_API_KEY`
- `MONGODB_URL`
- `PARENT_MONGODB_URL`: This is deal.ai db address, needed to check if new user is the user of deal.ai or not.
- `APP_SECRET`: You can define this app secretkey randomly, as you like. This is key used in authentication.
- `NEXT_PUBLIC_APP_URI`: This is your website address hosted, like https://www.chatclinicai.com
- `SCRAPING_BEE_API_KEY`: You get this key from https://www.scrapingbee.com. You can sign up and choose "Freelance" plan.
- `NEXT_PUBLIC_SOCKET_SERVER_ADDRESS`: This is socket server address. This socket server is used for live chat.

These are from [pinecone.ai](https://www.pinecone.io/)
- `PINECONE_API_KEY`
- `PINECONE_INDEX`
- `PINECONE_ENVIRONMENT`
- `PINECONE_NAMESPACE`

You can choose "text-embedding-3-small (1536)" and "p1" as pod size.


These keys are from Stripe.
- `NEXT_PUBLIC_STRIPE_PK`
- `STRIPE_SK`
- `NEXT_PUBLIC_FREE_PRICE_ID`
- `NEXT_PUBLIC_PRO_PRICE_ID`
- `NEXT_PUBLIC_ENTERPRISE_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`

In your (company) stripe account, you can get stripe secret key, and public key. 
And there, you can create 3 products for "Free", "Pro", "Enterprise" plans.
From each product, you can get Price Ids.
And you should add an webhook endpoint in stripe account.
It is ${process.env.NEXT_PUBLIC_APP_URI}/api/webhooks/stripe.
For example: https://www.chatclinicai.com/api/webhooks/stripe.


And these are used for sending email functionality.
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`

You can get these keys from email service provider like sendgrid.com.
In sendgrid.com you can use "Free" plan firstly, then if you have many users (50+), then you can upgrade the plan to "Essentials" plan.