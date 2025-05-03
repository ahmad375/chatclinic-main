import { PageLimit } from '@/lib'
import type { DashboardState, DashboardAction } from '@/types'
import { STATES } from 'mongoose'

export const dashboardReducer = (
  state: DashboardState,
  action: DashboardAction
): DashboardState => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    case 'SET_DOCUMENTS':
      return {
        ...state,
        documents: action.payload.documents,
        totalDocuments: action.payload.totalDocuments
      }
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [action.payload, ...(state.documents || [])].slice(
          0,
          PageLimit
        ),
        totalDocuments: state.totalDocuments + 1
      }
    case 'REMOVE_DOCUMENT':
      return {
        ...state,
        documents: (state.documents || []).filter(
          (d) => d._id !== action.payload
        )
      }
    case 'SET_TICKETS':
      return {
        ...state,
        tickets: action.payload.tickets,
        totalTickets: action.payload.totalTickets
      }
    case 'SET_TICKET':
      return {
        ...state,
        ticket: action.payload
      }
    case 'SET_DOCUMENT':
      return {
        ...state,
        document: action.payload
      }
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        document: {
          ...(state.document || {}),
          ...action.payload
        } as any
      }
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload.questions,
        totalQuestions: action.payload.totalQuestions
      }
    case 'REMOVE_QUESTION':
      return {
        ...state,
        questions: (state.questions || []).filter(
          (d) => d._id !== action.payload
        )
      }
    case 'SET_QUESTION':
      return {
        ...state,
        question: action.payload
      }
    case 'SET_VIDEOS':
      return {
        ...state,
        videos: action.payload.videos,
        totalVideos: action.payload.totalVideos
      }
    case 'SET_NEW_VIDEO_MODAL':
      return {
        ...state,
        newVideoModal: action.payload
      }
    case 'SET_PAGES':
      return {
        ...state,
        pages: action.payload.pages,
        totalPages: action.payload.totalPages
      }
    case 'SET_NEW_PAGE_MODAL':
      return {
        ...state,
        newPageModal: action.payload
      }
    case 'SET_SUBSCRIBE_MODAL':
      return { ...state, subscribeModal: action.payload }

    case 'SET_CANCEL_MODAL':
      return {
        ...state,
        cancelModal: action.payload
      }
    
    case 'SET_TITLE':
      return {
        ...state,
        selectedTitle: action.payload.selectedTitle
      }

    case 'SET_INITIAL_LIVECHATS':
      return {
        ...state,
        liveChats: action.payload
      }

    case 'SET_ACTIVE_LIVECHAT':
      return {
        ...state,
        activeLiveChat: action.payload
      }

    case 'ADD_NEW_MESSAGE_TO_ACTIVE_LIVECHAT':
      if (state.activeLiveChat) {
        return {
          ...state,
          activeLiveChat: {
            ...state.activeLiveChat,
            messages: [...state.activeLiveChat.messages, action.payload]
          }
        };
      } else {
        // Handle the case where activeLiveChat is undefined
        return state; // or return a default state or handle the undefined case as needed
      }

    case 'ADD_NEW_MESSAGE_TO_LIVECHATS':
      const updatedLiveChats = state.liveChats?.map(chat => {
        if (chat._id === state.activeLiveChat?._id) {
          return {
            ...chat,
            messages: [...chat.messages, action.payload]
          };
        }
        return chat;
      });
      if (updatedLiveChats && state.activeLiveChat) {
        const selectedChatIndex = updatedLiveChats.findIndex(chat => chat._id === state.activeLiveChat?._id);
        if (selectedChatIndex !== -1) {
          const selectedChat = updatedLiveChats.splice(selectedChatIndex, 1)[0];
          updatedLiveChats.unshift(selectedChat);
        }
      }
      return {
        ...state,
        liveChats: updatedLiveChats
      };

    case 'ADD_NEW_MESSAGE_TO_LIVECHATS_NOT_ACTIVE':
      const updatedLiveChats_notActive = state.liveChats?.map(chat => {
        if (chat.thread === action.payload.thread) {
          return {
            ...chat,
            messages: [...chat.messages, action.payload.message]
          };
        }
        return chat;
      });
      if (updatedLiveChats_notActive) {
        const selectedChatIndex = updatedLiveChats_notActive.findIndex(chat => chat.thread === action.payload.thread);
        if (selectedChatIndex !== -1) {
          const selectedChat = updatedLiveChats_notActive.splice(selectedChatIndex, 1)[0];
          updatedLiveChats_notActive.unshift(selectedChat);
        }
      }    
      return {
        ...state,
        liveChats: updatedLiveChats_notActive
      };

    case 'ADD_NEW_LIVECHAT_TO_LIVECHATS':
      return {
        ...state,
        liveChats: state.liveChats ? [action.payload, ...state.liveChats] : [action.payload]
      };

    default:
      return state
  }
}
