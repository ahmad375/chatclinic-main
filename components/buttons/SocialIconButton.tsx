'use client'
import type { FC } from 'react'
import { IconButton, type IconButtonProps } from '@chakra-ui/react'

export const SocialIconButton: FC<IconButtonProps> = (props) => (
	<IconButton
		bgColor='transparent'
		w={'min-content'}
		border="1px solid"
		borderColor='gray.200'
		borderRadius={'20px'}
		// rounded={'lg'}
		fontWeight={500}
		_hover={{
			bgColor: 'whiteAlpha.100'
		}}
		_active={{
			bgColor: 'whiteAlpha.200'
		}}
		{...props}
	/>
)
