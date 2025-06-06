import type { Message } from 'ai'
import { Function } from '@/enums'

export const FineTuneData: Partial<Message>[][] = [
  [
    {
      role: 'user',
      content: 'Are you open on Labor Day?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'Labor Day hours'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      // excerpts, include off topics
      content: JSON.stringify([
        'Do you have any active sales? Yes, we are currently offering a Labor Day sale!',
        'What are your Labor Day hours? We operate from 9 a.m. to 5 p.m. on Labor Day.'
      ])
    },
    {
      role: 'assistant',
      content: 'Yes, we are open on Labor Day from 9 a.m. to 5 p.m.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you provide Wi-Fi for customers?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'customer Wi-Fi availability'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Enjoy our comfortable seating areas while you shop.',
        'Free Wi-Fi is available for all our customers.'
      ])
    },
    {
      role: 'assistant',
      content: 'Absolutely, we provide free Wi-Fi for all our customers.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you accept credit card payments?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'credit card payment acceptance'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'We ensure a secure payment process for all transactions.',
        'All major credit cards are accepted at our store.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Yes, we accept all major credit cards for payments. We ensure a secure transaction process for your convenience.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Is your facility wheelchair accessible?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'wheelchair accessibility'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Our restrooms are cleaned and maintained regularly.',
        'Our facility is fully wheelchair accessible, including restrooms and elevators.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Absolutely, our facility is fully wheelchair accessible, which includes access to restrooms and elevators.'
    }
  ],
  [
    {
      role: 'user',
      content: "What are your store's holiday hours?"
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'store holiday hours'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([])
    },
    {
      role: 'assistant',
      content:
        "I don't have information regarding our store's holiday hours. Would you like me to file a support ticket to get this information for you?"
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you offer any discounts for seniors?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'senior discounts'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Check out our seasonal sale for great discounts.',
        'We provide special offers for our loyalty program members.'
      ])
    },
    {
      role: 'assistant',
      content:
        'I found information about other discounts and sales, but nothing specifically about senior discounts. Would you like me to create a support ticket to inquire further?'
    }
  ],
  [
    {
      role: 'user',
      content: 'Are pets allowed in your store?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'pet policy'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'We have a variety of pet products available.',
        'Our store hosts pet adoption events every month.'
      ])
    },
    {
      role: 'assistant',
      content:
        'There is information about pet products and events, but nothing about our pet policy in the store. Would you like me to file a support ticket for this information?'
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you have bike parking facilities?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'bike parking facilities'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Ample car parking space is available.',
        'We are located near public transit stops.'
      ])
    },
    {
      role: 'assistant',
      content:
        'I found information about car parking and public transit, but nothing on bike parking. Would you like assistance with a support ticket to get more details?'
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you have a loyalty program?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'loyalty program'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Our loyalty program offers various benefits, including discounts and special offers.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Yes, we do have a loyalty program. It includes discounts and special offers for members.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Is your facility child-friendly?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'child-friendly facility'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'We have facilities for people with disabilities.',
        'Our staff are trained to ensure a safe and welcoming environment for all customers.'
      ])
    },
    {
      role: 'assistant',
      content:
        'I found information about accessibility and staff training, but nothing specifically about child-friendly facilities. Would you like to file a support ticket for more detailed information?'
    }
  ],
  [
    {
      role: 'user',
      content: 'Can I return a product after 30 days?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'return policy'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Our standard return policy allows returns within 30 days of purchase.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Our return policy permits returns within 30 days of purchase. Unfortunately, returns after 30 days are not typically accepted.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you offer installation services for your products?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'installation services'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([])
    },
    {
      role: 'assistant',
      content:
        "It appears we don't have information on installation services. Would you like me to file a support ticket to get more details on this?"
    }
  ],
  [
    {
      role: 'user',
      content: 'What are your weekend hours?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'weekend hours'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Weekend hours: Saturday 10 AM - 6 PM, Sunday 11 AM - 5 PM.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Our weekend hours are Saturday from 10 AM to 6 PM, and Sunday from 11 AM to 5 PM.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you have a dress code for your restaurant?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'restaurant dress code'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([])
    },
    {
      role: 'assistant',
      content:
        "I don't have information regarding a dress code for our restaurant. Would you like me to file a support ticket for more detailed information?"
    }
  ],
  [
    {
      role: 'user',
      content: 'Can I book a private event at your location?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'booking private events'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'We offer catering services for events.',
        'Special group discounts are available for events.'
      ])
    },
    {
      role: 'assistant',
      content:
        'I found information about catering services and group discounts, but nothing specific about booking private events. Would you like assistance with a support ticket to get more details?'
    }
  ],
  [
    {
      role: 'user',
      content: 'Are your products environmentally friendly?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'environmentally friendly products'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'We are committed to sustainability and environmentally friendly practices.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Yes, we are committed to sustainability and offer environmentally friendly products.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you offer gift wrapping services?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'gift wrapping services'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Gift cards are available for purchase.',
        'We offer special gift packages during the holiday season.'
      ])
    },
    {
      role: 'assistant',
      content:
        'I found information on gift cards and holiday packages, but nothing specific about gift wrapping services. Would you like me to file a support ticket to get more information on this?'
    }
  ],
  [
    {
      role: 'user',
      content: 'What are the system requirements for your software?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'software system requirements'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Our software is compatible with most modern operating systems.',
        'Regular updates are available to enhance functionality.'
      ])
    },
    {
      role: 'assistant',
      content:
        "Our software is compatible with most modern operating systems and receives regular updates. However, I don't have specific system requirements details. Would you like me to file a support ticket for more detailed information?"
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you have any job openings currently?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'current job openings'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([])
    },
    {
      role: 'assistant',
      content:
        "Currently, I don't have information about job openings. Would you like me to file a support ticket so you can get the latest updates directly?"
    }
  ],
  [
    {
      role: 'user',
      content: 'Can I change my order after placing it?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'order modification policy'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Order modifications can be made within 24 hours of placing the order.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Yes, you can change your order, but only within 24 hours of placing it. After that, modifications might not be possible.'
    }
  ],
  [
    {
      role: 'user',
      content: 'What is your refund policy?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'refund policy'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Refunds are processed within 5 business days.',
        'Items returned must be in their original condition.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Our refund policy requires that items be in their original condition. Refunds are processed within 5 business days after the return.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Are there any age restrictions for your events?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'event age restrictions'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Most events are suitable for all ages.',
        'Some special events may have specific age restrictions.'
      ])
    },
    {
      role: 'assistant',
      content:
        'Most of our events are suitable for all ages, but some special events might have age restrictions. Check specific event details for more information.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Is there a discount on bulk orders?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'bulk order discount'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([])
    },
    {
      role: 'assistant',
      content:
        "I don't have information regarding discounts on bulk orders. Would you like me to file a support ticket to get this information for you?"
    }
  ],
  [
    {
      role: 'user',
      content: 'Can I reserve a table at your restaurant online?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'online table reservation'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Our restaurant offers online ordering for takeout.',
        'We host special dining events every month.'
      ])
    },
    {
      role: 'assistant',
      content:
        'I found information about online ordering and special events, but nothing specific about online table reservations. Would you like to file a support ticket for more detailed information?'
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you have any vegan options on your menu?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'vegan menu options'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Our menu includes a variety of vegetarian dishes.',
        'We use locally sourced ingredients to ensure freshness.'
      ])
    },
    {
      role: 'assistant',
      content:
        "Our menu features a variety of vegetarian dishes, but I don't have specific information on vegan options. Would you like me to file a support ticket to find out more?"
    }
  ],
  [
    {
      role: 'user',
      content: 'Do you provide parking facilities?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'parking facilities'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'We are located near public transport for easy access.',
        'Valet parking is available on weekends.'
      ])
    },
    {
      role: 'assistant',
      content:
        'We offer valet parking on weekends and are conveniently located near public transport options for easy access.'
    }
  ],
  [
    {
      role: 'user',
      content: 'Are your products tested on animals?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'animal testing policy'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([
        'Our products are made with natural ingredients.',
        'We are committed to ethical sourcing of materials.'
      ])
    },
    {
      role: 'assistant',
      content:
        'I found information about natural ingredients and ethical sourcing, but nothing specific about animal testing. Would you like me to file a support ticket for more detailed information?'
    }
  ],
  [
    {
      role: 'user',
      content: 'What are the sizes available for this product?'
    },
    {
      role: 'assistant',
      function_call: {
        name: Function.SearchKnowledgeBase,
        arguments: JSON.stringify({
          query: 'product size availability'
        })
      },
      content: ''
    },
    {
      role: 'function',
      name: Function.SearchKnowledgeBase,
      content: JSON.stringify([])
    },
    {
      role: 'assistant',
      content:
        "Currently, I don't have information on the size availability for this product. Would you like me to file a support ticket to get this information for you?"
    }
  ]
]
