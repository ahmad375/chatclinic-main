'use client'
import type { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { useDashboard } from '@/hooks'
import { Message } from '.'
import type { LiveChat } from '@/types'

export const ChatContents: FC = () => {
  const {state} = useDashboard()
  
  const groupedMessages = state.activeLiveChat?.messages.reduce((result: any, message: LiveChat["messages"][number]) => {
    const messageDate =message.created_at? new Date(message.created_at).toDateString(): new Date().toDateString()
    if (!result[messageDate]) {
      result[messageDate] = [];
    }
    result[messageDate].push(message);
    return result;
  }, {});
  
  const getDateHeader = (dateString: string) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString(); // 86400000 ms = 1 day
  
    if (dateString === today) {
      return "Today";
    } else if (dateString === yesterday) {
      return "Yesterday";
    } else if (isSameWeek(new Date(dateString), new Date())) {
      return getDayOfWeek(new Date(dateString));
    } else {
      return dateString;
    }
  }
  
  // Helper function to check if two dates are in the same week
  const isSameWeek = (date1: Date, date2: Date) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const firstWeek = getWeekNumber(firstDate);
    const secondWeek = getWeekNumber(secondDate);
    return firstWeek === secondWeek && firstDate.getFullYear() === secondDate.getFullYear();
  }
  
  // Helper function to get the week number of a date
  const getWeekNumber = (date: Date) => {
    const target = new Date(date.valueOf());
    const dayNumber = (date.getUTCDay() + 6) % 7;
    target.setUTCDate(target.getUTCDate() - dayNumber + 3);
    const firstThursday = target.valueOf();
    target.setUTCMonth(0, 1);
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000); // 604800000 ms = 1 week
  }
  
  // Helper function to get the day of the week
  const getDayOfWeek = (date: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  }

  return (
    <Flex
      id='livechat-scrollable-container'
      grow="1"
      align="start"
      direction="column"
      overflowY="scroll"
      bgColor="#f8fafc"
      px="30px"
      pt="20px"
      sx={{
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#ddd",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#aaa",
        }
      }}
    >
      {/* {state.activeLiveChat?.messages.map((message:LiveChat["messages"][number], i:number)=>(
        <Message key={i} message={message} />
      ))} */}
      {groupedMessages && Object.keys(groupedMessages).map((date, i) => (
        <div style={{width:'100%'}} key={i}>
          <div style={{background:"#edf2f7", padding:'4px', border:"2px solid #e6e7e7", borderRadius:"10px", color:"#818689", width:"max-content", margin:"auto", marginTop:'5px'}}>
            <h2 style={{textAlign:'center'}}>{getDateHeader(date)}</h2>
          </div>
          {groupedMessages[date].map((message: LiveChat["messages"][number], j: number) => (
            <Message key={j} message={message} />
          ))}
        </div>
      ))}
      
      {/* {messages}
      <div ref={scrollRef}></div> */}
    </Flex>
  )
}