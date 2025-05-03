import StarterKit from '@tiptap/starter-kit'
import type { AnyExtension } from '@tiptap/react'

import { UnderlineExtension } from './UnderlineExtension'
import { BulletListExtension } from './BulletListExtension'
import { LinkExtension } from './LinkExtension'

export const Extensions: AnyExtension[] = [
  StarterKit,
  UnderlineExtension,
  BulletListExtension,
  LinkExtension
]
