'use client'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import Link from 'next/link'
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Icon,
  chakra,
  Skeleton,
  type ButtonProps
} from '@chakra-ui/react'
import { HiChevronRight } from '@react-icons/all-files/hi/HiChevronRight'
import { PrimaryButton, SecondaryButton } from '../buttons'

export const DashboardSectionTitle: FC<
  PropsWithChildren<{
    back?: {
      path: string
      children: ReactNode
    }
    primaryButton?: ButtonProps
    secondaryButton?: ButtonProps
    primaryButtonLoading?: boolean
    secondaryButtonLoading?: boolean
  }>
> = ({
  back,
  primaryButton,
  secondaryButton,
  primaryButtonLoading,
  secondaryButtonLoading,
  children
}) => {
  const hasAnAction =
    !!primaryButton ||
    !!secondaryButton ||
    !!primaryButtonLoading ||
    !!secondaryButtonLoading

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '1fr 0fr' }}
      rowGap={4}
      alignItems='center'
      minH={24}
      py={6}
      borderBottom='1px solid'
      borderBottomColor='secondary.200'
    >
      <GridItem>
        <Box>
          <Heading fontSize='26px' color='secondary.800'>
            {back && (
              <>
                <Link
                  href={back.path}
                  style={{ display: 'inline' }}
                  prefetch={false}
                >
                  <chakra.span
                    color='secondary.600'
                    _hover={{ textDecor: 'underline' }}
                  >
                    {back.children}
                  </chakra.span>
                </Link>
                &nbsp;
                <Icon
                  display='inline'
                  verticalAlign='-6px'
                  as={HiChevronRight}
                />
                &nbsp;
              </>
            )}
            {children}
          </Heading>
        </Box>
      </GridItem>
      {hasAnAction && (
        <GridItem>
          <Grid autoFlow={{ base: 'row', lg: 'column' }} gap={3}>
            {!secondaryButtonLoading && secondaryButton && (
              <GridItem>
                <SecondaryButton rounded='lg' {...secondaryButton} />
              </GridItem>
            )}
            {!primaryButtonLoading && primaryButton && (
              <GridItem>
                <PrimaryButton rounded='lg' {...primaryButton} />
              </GridItem>
            )}
            {primaryButtonLoading && (
              <GridItem>
                <Skeleton
                  startColor='secondary.200'
                  endColor='secondary.400'
                  w={20}
                  h={10}
                  rounded='lg'
                />
              </GridItem>
            )}
            {secondaryButtonLoading && (
              <GridItem>
                <Skeleton
                  startColor='secondary.200'
                  endColor='secondary.400'
                  w={20}
                  h={10}
                  rounded='lg'
                />
              </GridItem>
            )}
          </Grid>
        </GridItem>
      )}
    </Grid>
  )
}
