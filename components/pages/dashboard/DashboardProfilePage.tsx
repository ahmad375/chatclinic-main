'use client'
import { type FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardSectionTitle } from '@/components/dashboard'
import { ProfileEmail, ProfileName, ProfilePassword, ProfileWorkingHours } from './profile'
import { useDashboard } from '@/hooks'
import { Box } from '@chakra-ui/react'

export const DashboardProfilePage: FC = () => {
  const { push } = useRouter()
  const {dispatch} = useDashboard()

  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Profile'}
    })
  },[])

  return (
    <Box pb={'20px'}>
      <DashboardSectionTitle
        secondaryButton={{
          children: 'Log Out',
          onClick() {
            push('/logout')
          }
        }}
      >
        {/* Profile */}
      </DashboardSectionTitle>
      <ProfileName />
      <ProfileEmail />
      <ProfileWorkingHours />
      <ProfilePassword />
    </Box>
  )
}
