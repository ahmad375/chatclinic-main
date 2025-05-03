import { nanoid } from 'nanoid'
import { UnexpectedErrorResponse } from '@/lib'
import { UserUtils, dbConnect, Threads, LiveChats } from '@/server'
import type { LiveChat, Thread } from '@/types'

export async function POST(req: Request,
  {
    params: { clientId, thread: threadUUID }
  }: { params: { clientId: string; thread: string } }
) {
  try {
    const { name, email } =
      (await req.json())

    if (!name || !email)
      throw new Error('Bad body')

    await dbConnect()

    const user = await UserUtils.getUserByClientId(clientId)

    if (!user) throw new Error('No such user')

    const thread = await Threads.findOne<Thread>({
      user: user._id,
      uuid: threadUUID
    })
    if (!thread) throw new Error('No such thread')

    const supportWorkingHours = user.workingHours
    // @ts-ignore
    const isCurrentTimeWithinWorkingHours = (supportWorkingHours, currentDate: Date) => {
      const supportTimezone = supportWorkingHours.timeZone.value;
      const offsetInMillis = supportWorkingHours.timeZone.offset * 60 * 60 * 1000

      const currentDay = currentDate.toLocaleString('en-US', { timeZone: supportTimezone, weekday: 'long' });
      const workingHours = supportWorkingHours.workingHours;
      
      const currentDayWorkingHours = workingHours[currentDay.toLowerCase()];
  
      if (currentDayWorkingHours === "No working") {
        return false; // Return false if it's "No working" for that day
      }
  
      const [startStr, endStr] = currentDayWorkingHours.split("-");
      const [startHour, startMinute] = startStr.split(":").map(Number);
      const [endHour, endMinute] = endStr.split(":").map(Number);
  
      const startTime = new Date(currentDate);
      startTime.setUTCHours(startHour, startMinute, 0, 0);
      startTime.setTime(startTime.getTime() - offsetInMillis)

      const endTime = new Date(currentDate);
      endTime.setUTCHours(endHour, endMinute, 0, 0);
      endTime.setTime(endTime.getTime() - offsetInMillis)

      // console.log('=========currentDay=========',currentDay)
      // console.log('=========startHour=========',startHour)
      // console.log('=========endHour=========',endHour)
      // console.log('=========currentDayWorkingHours=========',currentDayWorkingHours)
      // console.log('=========supportTimezone=========',supportTimezone)
      // console.log('=========currentDate=========',currentDate)
      // console.log('=========startTime3=========',startTime)
      // console.log('=========endTime=========',endTime)
      return currentDate >= startTime && currentDate <= endTime;
    };

    const currentDate = new Date();
    const currentTimeWithinWorkingHours = isCurrentTimeWithinWorkingHours(supportWorkingHours, currentDate);

    const newLiveChat: Partial<LiveChat> = {
      thread: threadUUID,
      clientId: clientId,
      name,
      email,
      messages: [{
        content: currentTimeWithinWorkingHours? 
          'Our team is currently online, how can we assist you?': "Our team is offline but you can chat with our AI Bot or create a ticket!",
        role: 'support',
        readFlag: 1,
        created_at: new Date()
      }],
      activeFlag: 0
    }

    const createdLiveChat = await LiveChats.create<Partial <LiveChat>>(newLiveChat)

    return new Response(JSON.stringify({createdLiveChat, success:true}), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/messages/[clientId]/[thread]/register error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}
