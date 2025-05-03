'use client'
import type { FC, PropsWithChildren } from 'react'
import { MDXProvider as __MDXProvider } from '@mdx-js/react'
import { Text, Link, Heading } from '@chakra-ui/react'

export const MDXProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <__MDXProvider
      {...{
        components: {
          h1: (props) => (
            <Heading {...props} size='md' color='secondary.900' my={4} />
          ),
          h2: (props) => (
            <Text
              {...props}
              color='secondary.900'
              fontSize='lg'
              textDecoration='underline'
              my={2}
            />
          ),
          p: (props) => <Text {...props} color='secondary.900' my={2} />,
          a: (props) => <Link {...props} color='primary.700' />,
          ul: (props) => (
            <ul
              style={{
                paddingLeft: '14px'
              }}
              {...props}
            />
          )
        }
      }}
    >
      {children}
    </__MDXProvider>
  )
}
