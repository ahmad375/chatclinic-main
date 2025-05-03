'use client'
import type { FC } from 'react'
import { Grid, GridItem, Skeleton, SkeletonText } from '@chakra-ui/react'

export const DashboardSectionLoading: FC<{
  primaryButton?: boolean
  secondaryButton?: boolean
}> = ({ primaryButton, secondaryButton }) => {
  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 0fr' }}
        alignItems='center'
        minH={24}
        py={6}
        borderBottom='1px solid'
        borderBottomColor='secondary.200'
      >
        <GridItem>
          <Skeleton
            startColor='secondary.200'
            endColor='secondary.400'
            w='full'
            maxW='md'
            h={10}
            rounded='lg'
          />
        </GridItem>
        <GridItem>
          <Grid autoFlow={{ base: 'row', lg: 'column' }} gap={3}>
            {secondaryButton && (
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
            {primaryButton && (
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
      </Grid>
      <Grid autoFlow='row' rowGap={6} py={6}>
        {new Array(4).fill(0).map((_, i) => (
          <GridItem key={`dashboard-section-loading-${i}`}>
            <Skeleton
              startColor='secondary.200'
              endColor='secondary.400'
              w='full'
              h={10}
              rounded='lg'
            />
          </GridItem>
        ))}
      </Grid>
    </>
  )
}
