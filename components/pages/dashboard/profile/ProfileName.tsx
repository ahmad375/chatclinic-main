'use client'
import { useState, type FC } from 'react'
import { 
  Heading,
  Icon,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { useDashboard } from '@/hooks'
import { DashboardSectionItem } from '@/components/dashboard'
import { SecondaryIconButton } from '@/components/buttons'
import { HiPencil } from '@react-icons/all-files/hi/HiPencil'
import { Tooltip } from '@/components/common'
import { IoIosSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CustomInput } from '@/components/common'
import { useAPI, useNotification } from '@/hooks'
import { UnexpectedErrorNotification } from '@/lib'

export const ProfileName: FC = () => {
  const {
    state: { user }
  } = useDashboard()
  const [isEditing, setIsEditing]= useState(false)
  const [newName, setNewName] = useState(user.name)
  const [saveLoading, setSaveLoading] = useState(false)
  const { request } = useAPI()
  const { setNotification } = useNotification()
  
  const saveHandler = async () => {
    if(!newName){
      setNotification({
        type:'error',
        title:`The username can't be empty. Please input the name.`
      })
    }else {
      try {
        setSaveLoading(true)
  
        const apiResponse = await request(
          '/api/user/profile/updateUserName',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              new_name: newName
            })
          }
        )

        if(apiResponse.success){
          setIsEditing(false)
          window.location.href = '/dashboard/profile'
        }
  
      } catch {
        setNotification(UnexpectedErrorNotification)
      } finally {
        setSaveLoading(false)
      }
    }
  }

  return (
    <DashboardSectionItem title='Name'>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 0fr' }}
        alignItems={'center'}
        gap={'40px'}
      >
        <GridItem>
        {!isEditing?
          (<Heading fontSize='1.5em' color='secondary.900'>
            {user.name}
          </Heading>
        ):(
          <CustomInput type='text' value={newName} onChange={(e)=>setNewName(e.target.value)} name='__name' placeholder='John Doe' />
        )}
        </GridItem>
        <GridItem>
          {!isEditing?
            (<Tooltip label='Edit Name'>
              <SecondaryIconButton
                size='sm'
                icon={<Icon as={HiPencil} />}
                aria-label='Edit Name'
                onClick={()=>setIsEditing(true)}
              />
            </Tooltip>
            ):(
            <Grid autoFlow='column' justifyContent='start' columnGap={2}>
              <GridItem>
                <Tooltip label='Cancel Editing'>
                  <SecondaryIconButton
                    size='sm'
                    icon={<Icon as={IoMdClose} />}
                    aria-label='Cancel Editing'
                    onClick={()=>{setIsEditing(false);setNewName(user.name);}}
                />
                </Tooltip>
              </GridItem>
              <GridItem>
                <Tooltip label='Save Name'>
                  <SecondaryIconButton
                    size='sm'
                    icon={<Icon as={IoIosSave} />}
                    isLoading={saveLoading}
                    onClick={saveHandler}
                    aria-label='Save Name'
                  />
                </Tooltip>
              </GridItem>
            </Grid>
          )}
        </GridItem>
      </Grid>
    </DashboardSectionItem>
  )
}
