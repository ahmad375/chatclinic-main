'use client'
import { type FC, useState } from 'react'
import { Heading } from '@chakra-ui/react'
import { useDashboard } from '@/hooks'
import { DashboardSectionItem } from '@/components/dashboard'
import { type User } from '@/types'
import { extractMessage } from '@pinecone-database/pinecone/dist/errors'
import { FormControl, FormLabel, Input, Box, Button, Select, Tab, TabList, Switch, Icon, Tabs } from '@chakra-ui/react'
import { PrimaryButton } from '@/components/buttons'
import { FiSave } from '@react-icons/all-files/fi/FiSave'
import TimezoneSelect, { type ITimezone } from 'react-timezone-select'
import { useAPI, useNotification } from '@/hooks'
import { UnexpectedErrorNotification } from '@/lib'

type weekdayType = 'monday'| 'tuesday'| 'wednesday'| 'thursday'| 'friday'| 'saturday'| 'sunday'

export const ProfileWorkingHours: FC = () => {
  const {
    state: { user }
  } = useDashboard()
  const { request } = useAPI()
  const { setNotification } = useNotification()

  const [weekday, setWeekday] = useState<weekdayType>("monday")
  const [updateWorkingHoursLoading, setUpdateWorkingHoursLoading] = useState<boolean>(false)

  const currentUserWorkingHours: User['workingHours'] = user.workingHours? user.workingHours:{
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    workingHours: {
      sunday: "No working",
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-13:00",
    },
  };

  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(currentUserWorkingHours["timeZone"])  

  const [formData, setFormData] = useState({
    timeZone: currentUserWorkingHours.timeZone,
    workingHours: { ...currentUserWorkingHours.workingHours }
  });

  const handleTimeZoneChange = (timeZone: ITimezone) => {
    setFormData({ ...formData, timeZone: timeZone });
    setSelectedTimezone(timeZone)
  };

  const handleWorkingHoursChange = (day: weekdayType, type: string, value?: string) => {
    if(type == 'Switch'){
      setFormData({
        ...formData,
        workingHours: {
          ...formData.workingHours,
          [day]:(formData.workingHours[day]== "No working")? "09:00-17:00": "No working",
        },
      });
    }else if(type == "Start_time"){
      setFormData({
        ...formData,
        workingHours: {
          ...formData.workingHours,
          [day]:`${value}-${formData.workingHours[day].split('-')[1]}`,
        },
      });
    }else if(type == "End_time"){
      setFormData({
        ...formData,
        workingHours: {
          ...formData.workingHours,
          [day]:`${formData.workingHours[day].split('-')[0]}-${value}`,
        },
      });
    }
    // setFormData({
    //   ...formData,
    //   workingHours: {
    //     ...formData.workingHours,
    //     [day]: value,
    //   },
    // });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      console.log('============clicked submit button========', formData)
      setUpdateWorkingHoursLoading(true)

      const apiResponse = await request<{ user?: User }>(
        '/api/user/profile/updateWorkingHours',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            workingHours: formData
          })
        }
      )

    } catch {
      setNotification(UnexpectedErrorNotification)
    } finally {
      setUpdateWorkingHoursLoading(false)
    }
  };
  
  return (
    <DashboardSectionItem title='Working Hours'>
      {/* <Heading fontSize='1.5em' color='secondary.900'>
        {user.name}
      </Heading> */}
      <form onSubmit={handleSubmit}>
        <FormControl width="400px" ml={4}>
          <FormLabel>Time Zone</FormLabel>
          <TimezoneSelect
            value={selectedTimezone}
            onChange={(timezone: ITimezone) => handleTimeZoneChange(timezone)}
          />
        </FormControl>
        <Tabs variant='enclosed' colorScheme='blue' my={8}>
          <TabList>
            <Tab onClick={()=>setWeekday("monday")}>Monday</Tab>
            <Tab onClick={()=>setWeekday("tuesday")}>Tuesday</Tab>
            <Tab onClick={()=>setWeekday("wednesday")}>Wednesday</Tab>
            <Tab onClick={()=>setWeekday("thursday")}>Thursday</Tab>
            <Tab onClick={()=>setWeekday("friday")}>Friday</Tab>
            <Tab onClick={()=>setWeekday("saturday")}>Saturday</Tab>
            <Tab onClick={()=>setWeekday("sunday")}>Sunday</Tab>
          </TabList>
        </Tabs>
        <FormControl display='flex' alignItems='center' ml={4}>
          <FormLabel htmlFor='email-alerts' mb='0'>
            Working?
          </FormLabel>
          <Switch id='email-alerts' onChange={()=>{handleWorkingHoursChange(weekday, 'Switch')}} isChecked={formData.workingHours[weekday]=='No working'? false: true}/>
        </FormControl>
        <Box mt={8} display="flex" ml={4}>
          <FormControl width="150px" mr={4}>
            <FormLabel>From</FormLabel>
            <Input
              type="time"
              value={formData.workingHours[weekday]!=='No working'? formData.workingHours[weekday].split("-")[0]:""}
              onChange={(e) => handleWorkingHoursChange(weekday, 'Start_time', e.target.value)}
              disabled={formData.workingHours[weekday]=='No working'? true: false}
            />
          </FormControl>
          <FormControl width="150px" mr={10}>
            <FormLabel>To</FormLabel>
            <Input
              type="time"
              value={formData.workingHours[weekday]!=='No working'? formData.workingHours[weekday].split("-")[1]:""}
              onChange={(e) => {handleWorkingHoursChange(weekday, 'End_time', e.target.value)}}
              disabled={formData.workingHours[weekday]=='No working'? true: false}
            />
          </FormControl>
          <PrimaryButton
            mt={8}
            type='submit'
            leftIcon={<Icon as={FiSave} />}
            isLoading={updateWorkingHoursLoading}
          >
            Save
          </PrimaryButton>
        </Box>
      </form>
    </DashboardSectionItem>
  )
}
