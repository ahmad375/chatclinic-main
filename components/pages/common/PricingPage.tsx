'use client'
import { type FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Grid, GridItem, Icon } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import { PageHeader } from '@/components/nav'
import { Plan } from '@/enums'
import { PlanCard, PricingModal } from '@/components/pricing'
import { Container } from '@/components/common'

export const PricingPage: FC<{isLoggedInUser:boolean}> = ({isLoggedInUser}) => {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <PageHeader isLoggedInUser={isLoggedInUser} pb={28}>Pricing</PageHeader>
      <Container mt={-28} pb={24}>
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={3}>
          {Object.values(Plan).map((plan) => (
            <GridItem key={`plan-card-${plan}`}>
              <PlanCard
                {...{ plan }}
                action={{
                  rightIcon: <Icon as={FiArrowRight} />,
                  children: 'Get Started',
                  onClick() {
                    if(plan === Plan.Free){
                      push('/signup')
                    }else {
                      setIsOpen(true)
                    }
                  }
                }}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
      <PricingModal {...{isOpen, setIsOpen, isLoggedInUser}} />
    </>
  )
}
