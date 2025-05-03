'use client'
import type { FC } from 'react'
import {
  Badge,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Icon,
  type ButtonProps
} from '@chakra-ui/react'
import { FiCheckCircle } from 'react-icons/fi'
import { Plan } from '@/enums'
import { getPlanInfo } from '@/lib'
import { SecondaryButton } from '../buttons'

export const PlanCard: FC<{ plan: Plan; action: ButtonProps }> = ({
  plan,
  action
}) => {
  const { description, features, amount, highlighted } = getPlanInfo(plan)

  return (
    <Grid
      autoFlow='row'
      alignContent='start'
      rowGap={4}
      px={4}
      py={6}
      rounded='2xl'
      bgGradient='linear(to-b, var(--chakra-colors-customGreen-50) 10%, #fff)'
      shadow='sm'
      h='full'
    >
      <GridItem>
        <Flex justifyContent='center'>
          <Badge
            color={highlighted ? 'white' : 'primary.700'}
            bgColor={highlighted ? 'primary.700' : 'customGreen.50'}
            border='1px solid var(--chakra-colors-primary-700)'
            textTransform='none'
            px={3}
            py={1}
            rounded='full'
            fontWeight={500}
            fontSize='sm'
          >
            {plan}
          </Badge>
        </Flex>
      </GridItem>
      <GridItem>
        <Heading
          size='3xl'
          color='customGreen.900'
          textAlign='center'
          verticalAlign='baseline'
        >
          ${amount}
          <Heading display='inline' size='md'>
            / mo
          </Heading>
        </Heading>
      </GridItem>
      <GridItem>
        <Text
          color='customGreen.700'
          maxW='xs'
          mx='auto'
          textAlign='center'
          fontWeight={400}
        >
          {description}
        </Text>
      </GridItem>
      <GridItem
        pt={2}
        pb={6}
        borderBottom='1px solid'
        borderBottomColor='customGreen.100'
      >
        <SecondaryButton
          w='full'
          rounded='lg'
          bgColor={highlighted ? 'primary.700' : 'transparent'}
          color={highlighted ? 'white' : 'primary.700'}
          _hover={
            !highlighted
              ? {
                  bgColor: 'primary.700',
                  color: 'white'
                }
              : {}
          }
          {...action}
        />
      </GridItem>
      <GridItem>
        <Text
          fontSize='sm'
          color='customGreen.400'
          textTransform='uppercase'
          fontWeight={500}
        >
          What&apos;s included
        </Text>
      </GridItem>
      <GridItem>
        <Grid autoFlow='row' rowGap={3}>
          {features.map((feature, i) => (
            <GridItem key={`feature-${plan}-${i}`}>
              <Text fontWeight={450} color='customGreen.800'>
                <Icon
                  display='inline'
                  as={FiCheckCircle}
                  color='primary.700'
                  verticalAlign='-2px'
                />
                &nbsp;
                {feature}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </GridItem>
    </Grid>
  )
}
