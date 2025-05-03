'use client'
import { useState, type FC } from 'react'
import { 
  Heading,
  Icon,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { useDashboard } from '@/hooks'
import { DashboardSectionItem } from '@/components/dashboard'
import { CustomInput } from '@/components/common'
import { useAPI, useNotification } from '@/hooks'
import { UnexpectedErrorNotification } from '@/lib'
import { PrimaryButton } from '@/components/buttons'
import { FiSave } from '@react-icons/all-files/fi/FiSave'

export const ProfilePassword: FC = () => {
  const {
    state: { user }
  } = useDashboard()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const { request } = useAPI()
  const { setNotification } = useNotification()
  
  const saveHandler = async () => {
    if(!oldPassword || !newPassword){
			if(!oldPassword){
				return setNotification({
					type:'error',
					title:`Please type your current password.`
				})
			}
			if(!newPassword){
				return setNotification({
					type:'error',
					title:`Please type your new password.`
				})
			}
    }else {
      try {
        setSaveLoading(true)
  
        const apiResponse = await request(
          '/api/user/profile/changePassword',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              newPassword: newPassword,
              oldPassword: oldPassword,
            })
          }
        )

				if(apiResponse.success){
					setOldPassword('')
					setNewPassword('')
				}

      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setSaveLoading(false)
      }
    }
  }

  return (
    <DashboardSectionItem title='Change Password'>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr 0fr' }}
        alignItems={'center'}
        gap={'30px'}
      >
        <GridItem>
          <CustomInput type='password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} name='__name' placeholder='Type current password.' />
        </GridItem>
				<GridItem>
          <CustomInput type='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} name='__name' placeholder='Type new password.' />
        </GridItem>
				<GridItem ml={'20px'}>
					<PrimaryButton
            leftIcon={<Icon as={FiSave} />}
            isLoading={saveLoading}
						onClick={saveHandler}
          >
            Save
          </PrimaryButton>
				</GridItem>
      </Grid>
    </DashboardSectionItem>
  )
}
