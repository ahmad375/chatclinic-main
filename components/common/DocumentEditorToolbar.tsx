'use client'
import type { FC } from 'react'
import { Editor } from '@tiptap/react'
import {
  IconButton,
  Grid,
  GridItem,
  Icon,
  type IconButtonProps
} from '@chakra-ui/react'
import { FaBold, FaItalic, FaUnderline, FaList, FaLink } from 'react-icons/fa'

export const DocumentEditorToolbar: FC<{ editor: Editor | null }> = ({
  editor
}) => {
  if (!editor) return null

  return (
    <Grid
      autoFlow='column'
      columnGap={2}
      justifyContent='start'
      bgColor='white'
      border='1px solid var(--chakra-colors-secondary-200)'
      roundedTop='lg'
      px={3}
      py={1.5}
    >
      <GridItem>
        <DocumentEditorToolbarOption
          icon={<Icon as={FaBold} />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          isDisabled={!editor.can().toggleBold()}
          aria-selected={editor.isActive('bold')}
          aria-label='Toggle Bold'
        />
      </GridItem>
      <GridItem>
        <DocumentEditorToolbarOption
          icon={<Icon as={FaUnderline} />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isDisabled={!editor.can().toggleUnderline()}
          aria-selected={editor.isActive('underline')}
          aria-label='Toggle Underline'
        />
      </GridItem>
      <GridItem>
        <DocumentEditorToolbarOption
          icon={<Icon as={FaItalic} />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isDisabled={!editor.can().toggleItalic()}
          aria-selected={editor.isActive('italic')}
          aria-label='Toggle Italic'
        />
      </GridItem>
      <GridItem>
        <DocumentEditorToolbarOption
          icon={<Icon as={FaList} />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isDisabled={!editor.can().toggleBulletList()}
          aria-selected={editor.isActive('bulletList')}
          aria-label='Toggle Bulleted List'
        />
      </GridItem>
      {/* <GridItem>
        <DocumentEditorToolbarOption
          icon={<Icon as={FaLink} />}
          onClick={() => {}}
          //   isDisabled={!editor.can().toggleLink()}
          aria-selected={editor.isActive('link')}
          aria-label='Set Link'
        />
      </GridItem> */}
    </Grid>
  )
}

const DocumentEditorToolbarOption: FC<IconButtonProps> = (props) => {
  return (
    <IconButton
      bgColor='transparent'
      _hover={{}}
      _focus={{}}
      _disabled={{
        opacity: 0.5,
        pointerEvents: 'none'
      }}
      _selected={{
        bgColor: 'primary.50',
        color: 'primary.700'
      }}
      {...props}
    />
  )
}
