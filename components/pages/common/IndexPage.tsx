'use client'
import { type FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Icon, type ButtonProps } from '@chakra-ui/react'
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight'
import { Header } from '@/components/nav'
import { Hero, HeroSection } from '@/components/common'
import { SubHero } from '@/components/common'

export const IndexPage: FC<{ isLoggedInUser?: boolean }> = ({isLoggedInUser}) => {
  const { push, replace } = useRouter()
  const onClick = () => push('/signup')

  const sharedProps: ButtonProps = {
    _hover: {
      bgColor: 'primary.700',
      color: 'white'
    },
    rightIcon: <Icon as={FiArrowRight} />,
    onClick
  }

  return (
    <>
      <Box className='pattern'>
        <Header isTransparent {...{isLoggedInUser}} />
        <Hero />
      </Box>
      <SubHero />
      <Box id='features'>
        <HeroSection
          badge='A.I. Powered Support'
          title='Your A.I. agent is available 24/7, 365'
          description="We leverage cutting edge A.I. technology to give your support agent intelligent behavior. It's always there for your customers."
          action={{
            children: 'Create your agent',
            ...sharedProps
          }}
          video='/videos/chat.mp4'
          order={1}
        />
        <HeroSection
          badge='Data Sources'
          title='Powered By Your Data'
          description='Add support documents, frequently asked questions, website pages, and YouTube videos to power your support agent.'
          action={{
            children: 'Add data sources',
            ...sharedProps
          }}
          video='/videos/add-page.mp4'
          order={2}
        />
        <HeroSection
          badge='Knowledge Retrieval'
          title='References Your Sources'
          description='Your support agent will reference your documents when possible, to provide thorough documentation for your users.'
          action={{
            children: 'Get started',
            ...sharedProps
          }}
          video='/videos/reference.mp4'
          order={3}
        />
      </Box>
    </>
  )
}
