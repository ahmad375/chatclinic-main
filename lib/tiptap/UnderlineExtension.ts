import { Underline } from '@tiptap/extension-underline'

export const UnderlineExtension = Underline.configure({
  HTMLAttributes: {
    class: 'tiptap-underline'
  }
})
