'use client'
import type { FC, ReactNode } from 'react'
import {
  AspectRatio,
  Badge,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  type ButtonProps,
  type BoxProps
} from '@chakra-ui/react'
import { SecondaryButton } from '../buttons'
import { Container } from '.'

export const HeroSection: FC<
  {
    badge: string
    title: ReactNode
    description: string
    action: ButtonProps
    video: string
    order: number
  } & BoxProps
> = ({ badge, title, description, action, video, order, ...props }) => {
  const isAlt = order % 2 === 0

  return (
    <Box
      py={{ base: 16, lg: 24 }}
      bgColor={isAlt ? 'secondary.50' : 'white'}
      {...props}
    >
      <Container maxW='container.lg'>
        <Flex
          flexDir={{
            base: 'column',
            lg: isAlt ? 'row-reverse' : 'row'
          }}
          columnGap={10}
          rowGap={12}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <Grid flex={3} autoFlow='row' alignContent='start' rowGap={4}>
            <GridItem>
              <Badge
                variant='subtle'
                bgColor='primary.50'
                color='primary.700'
                px={2}
                py={1.5}
                rounded='full'
                fontWeight={500}
              >
                {badge}
              </Badge>
            </GridItem>
            <GridItem>
              <Heading
                size='xl'
                fontWeight={600}
                color='secondary.700'
                maxW='md'
                mx={{ base: 'auto', lg: 'unset' }}
              >
                {title}
              </Heading>
            </GridItem>
            <GridItem>
              <Text fontSize='lg' maxW='md' mx={{ base: 'auto', lg: 'unset' }}>
                {description}
              </Text>
            </GridItem>
            <GridItem pt={4}>
              <SecondaryButton rounded='lg' {...action} />
            </GridItem>
          </Grid>
          <AspectRatio
            flex={4}
            pos='relative'
            ratio={16 / 9}
            bgColor='secondary.100'
            rounded='lg'
            w='full'
            maxW={{ base: 'xl', lg: 'none' }}
            mx={{ base: 'auto', lg: 'unset' }}
            overflow='hidden'
          >
            <video
              src={video}
              style={{ position: 'absolute', objectFit: 'cover' }}
              autoPlay
              muted
              loop
            />
          </AspectRatio>
        </Flex>
      </Container>
    </Box>
  )
}
