// 'use client'
// import {
//   useReducer,
//   type FC,
//   type PropsWithChildren,
//   type Reducer
// } from 'react'
// import { HomeContext } from '@/contexts'
// import { DefaultHomeState } from '@/lib'
// import { homeReducer } from '@/reducers'
// import type { HomeState, HomeAction } from '@/types'

// export const HomeProvider: FC<PropsWithChildren<Partial<HomeState>>> = ({
//   children,
//   ...rest
// }) => {
//   const [state, dispatch] = useReducer<Reducer<HomeState, HomeAction>>(
//     homeReducer,
//     {
//       ...DefaultHomeState,
//       ...rest
//     }
//   )

//   return (
//     <HomeContext.Provider
//       value={{
//         state,
//         dispatch
//       }}
//     >
//       {children}
//     </HomeContext.Provider>
//   )
// }
