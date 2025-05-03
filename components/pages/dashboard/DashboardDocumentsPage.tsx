'use client'
import { useState, useEffect, type FC } from 'react'
import { useDashboard, useDocuments, usePaginate } from '@/hooks'
import { DashboardSectionTitle } from '@/components/dashboard'
import { DocumentsTable, EmptyDocuments } from './documents'
import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { PrimaryButton } from '@/components/buttons'
import MyDropZone from '@/components/MyDropzone/MyDropzone'
import { useNotification } from '@/hooks'

export const DashboardDocumentsPage: FC = () => {
  const {
    state: { documents, totalDocuments },
    dispatch
  } = useDashboard()
  const { fetchDocuments, newDocument, newDocumentLoading } = useDocuments()
  const { page } = usePaginate()

  const [createDocumentWay, setCreateDocumentWay] = useState('manual')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [pdfContent, setPdfContent] = useState<string>("")

  const [isOpen, setIsOpen] = useState(false)
  const { setNotification } = useNotification()

  const nextHandler = async () => {
    if(createDocumentWay==='manual'){
      await newDocument();
      return setIsOpen(false);
    }else {
      if(!selectedFile){
        return setNotification({type:'error', title:'Error', description:'Please upload pdf file.'})
      }else {
        await newDocument(pdfContent);
        return setIsOpen(false);
      }
    }
  }

  useEffect(()=>{
    dispatch({
      type: 'SET_TITLE',
      payload: {selectedTitle: 'Documents'}
    })
  },[])

  useEffect(() => {
    fetchDocuments(page)
  }, [page])

  useEffect(() => {
    dispatch({
      type: 'SET_DOCUMENTS',
      payload: {
        documents: undefined,
        totalDocuments: 0
      }
    })
  }, [page])

  return (
    <>
      <DashboardSectionTitle
        primaryButton={{
          children: 'New Document',
          onClick: ()=>{setIsOpen(true)},
          // onClick: newDocument,
          // isLoading: newDocumentLoading
        }}
      >
        {/* Documents */}
      </DashboardSectionTitle>
      {documents && documents.length === 0 && <EmptyDocuments setIsOpen={setIsOpen}/>}
      {(!documents || documents.length > 0) && (
        <DocumentsTable
          {...{
            documents,
            paginate: {
              total: totalDocuments,
              current: documents ? documents.length : 0,
              page
            }
          }}
        />
      )}
      <Modal isOpen={isOpen} onClose={()=>{setIsOpen(prev => !prev)}}>
        <ModalOverlay />
        <ModalContent marginTop="30vh">
          <ModalHeader>Please Choose One Option.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup defaultValue={createDocumentWay}>
              <Stack>
                <Radio onChange={() => {setCreateDocumentWay('manual')}} size='md' value='manual'>New Manual Document</Radio>
                <Radio onChange={() => {setCreateDocumentWay('uploadPDF')}} size='md' value='uploadPDF'>Upload A PDF Document</Radio>
              </Stack>
            </RadioGroup>
            {createDocumentWay=== "uploadPDF" && <MyDropZone {...{setSelectedFile}} {...{selectedFile}} setPdfContent={setPdfContent}/>}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={()=>{setIsOpen(prev => !prev)}}>
              Close
            </Button>
            {/* <Button colorScheme='blue'>Next</Button> */}
            <PrimaryButton isLoading={newDocumentLoading} onClick={nextHandler}>Next</PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
