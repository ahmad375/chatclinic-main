import { BulletList } from '@tiptap/extension-bullet-list'

export const BulletListExtension = BulletList.configure({
  HTMLAttributes: {
    class: 'tiptap-bullet-list'
  }
})
