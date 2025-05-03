import { Plan } from '@/enums'
import type { PlanInfo } from '@/types'
import { Limits, pluralize } from '.'

export const getPlanInfo = (plan: Plan): PlanInfo => {
  switch (plan) {
    case Plan.Free:
      return {
        description: 'Small businesses with minimal customer support needs',
        amount: 0,
        features: [
          <>
            {Limits.FREE_MESSAGE_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.FREE_MESSAGE_LIMIT, 'message')} per month
          </>,
          <>Unlimited support tickets (beta)</>,
          <>
            {Limits.FREE_QUESTION_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.FREE_QUESTION_LIMIT, 'question')}
          </>,
          <>
            {Limits.FREE_DOCUMENT_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.FREE_DOCUMENT_LIMIT, 'document')}
          </>,
          <>
            {Limits.FREE_PAGE_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.FREE_PAGE_LIMIT, 'page')}
          </>,
          <>
            {Limits.FREE_VIDEO_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.FREE_VIDEO_LIMIT, 'video')}
          </>,
          <>Customizable widget</>
        ],
        priceId: process.env.NEXT_PUBLIC_FREE_PRICE_ID!
      }
    case Plan.Pro:
      return {
        description:
          'Small to medium businesses seeking automated customer support',
        amount: 49,
        features: [
          <>
            {Limits.PRO_MESSAGE_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.PRO_MESSAGE_LIMIT, 'message')} per month
          </>,
          <>Unlimited support tickets (beta)</>,
          <>
            {Limits.PRO_QUESTION_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.PRO_QUESTION_LIMIT, 'question')}
          </>,
          <>
            {Limits.PRO_DOCUMENT_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.PRO_DOCUMENT_LIMIT, 'document')}
          </>,
          <>
            {Limits.PRO_PAGE_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.PRO_PAGE_LIMIT, 'page')}
          </>,
          <>
            {Limits.PRO_VIDEO_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.PRO_VIDEO_LIMIT, 'video')}
          </>,
          <>Customizable widget</>,
          <>Managed integration</>
        ],
        highlighted: true,
        priceId: process.env.NEXT_PUBLIC_PRO_PRICE_ID!
      }
    case Plan.Enterprise:
      return {
        description:
          'Large businesses aiming to reduce customer support workload',
        amount: 199,
        features: [
          <>
            {Limits.ENTERPRISE_MESSAGE_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.ENTERPRISE_MESSAGE_LIMIT, 'message')} per month
          </>,
          <>Unlimited support tickets (beta)</>,
          <>
            {Limits.ENTERPRISE_QUESTION_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.ENTERPRISE_QUESTION_LIMIT, 'question')}
          </>,
          <>
            {Limits.ENTERPRISE_DOCUMENT_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.ENTERPRISE_DOCUMENT_LIMIT, 'document')}
          </>,
          <>
            {Limits.ENTERPRISE_PAGE_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.ENTERPRISE_PAGE_LIMIT, 'page')}
          </>,
          <>
            {Limits.ENTERPRISE_VIDEO_LIMIT.toLocaleString()}{' '}
            {pluralize(Limits.ENTERPRISE_VIDEO_LIMIT, 'video')}
          </>,
          <>Customizable widget</>,
          <>Managed integration</>,
          <>Dedicated account manager</>,
          <>Custom features &amp; integrations</>
        ],
        priceId: process.env.NEXT_PUBLIC_ENTERPRISE_PRICE_ID!
      }
  }
}
