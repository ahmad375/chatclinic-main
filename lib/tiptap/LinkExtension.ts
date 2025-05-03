import { Link } from '@tiptap/extension-link'

export const LinkExtension = Link.configure({
  HTMLAttributes: {
    class: 'tiptap-link'
  },
  protocols: ['mailto'],
  autolink: true,
  openOnClick: true,
  linkOnPaste: true
})
