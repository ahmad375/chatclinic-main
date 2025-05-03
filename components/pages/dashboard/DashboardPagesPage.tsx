'use client'
import { useEffect, type FC } from 'react'
import { useDashboard, usePaginate, usePages } from '@/hooks'
import { DashboardSectionTitle } from '@/components/dashboard'
import { EmptyPages, PagesTable } from './pages'

export const DashboardPagesPage: FC = () => {
  const {
    dispatch,
    state: { pages, totalPages }
  } = useDashboard()
  const { fetchPages } = usePages()
  const { page } = usePaginate()

  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Pages'}
    })
  },[])

  useEffect(() => {
    fetchPages(page)
  }, [page])

  useEffect(() => {
    dispatch({
      type: 'SET_PAGES',
      payload: {
        pages: undefined,
        totalPages: 0
      }
    })
  }, [page])

  return (
    <>
      <DashboardSectionTitle
        primaryButton={{
          children: 'New Page',
          onClick() {
            dispatch({
              type: 'SET_NEW_PAGE_MODAL',
              payload: true
            })
          }
        }}
      >
        {/* Pages */}
      </DashboardSectionTitle>
      {pages && pages.length === 0 && <EmptyPages />}
      {(!pages || pages.length > 0) && (
        <PagesTable
          {...{
            pages,
            paginate: {
              total: totalPages,
              current: pages ? pages.length : 0,
              page
            }
          }}
        />
      )}
    </>
  )
}
