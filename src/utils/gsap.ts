import { enabledDebugMarkers } from '@/constants/gsap'

const DESCENDER_PADDING = '0.12em'
const DESCENDER_CHARS = /[gjpqyçÇ]/

export function cloneClippedGradient(source: HTMLElement, chars: Element[]) {
	source.style.overflow = 'visible'

	for (const char of chars as HTMLElement[]) {
		let parent = char.parentElement

		while (parent && parent !== source) {
			parent.style.overflow = 'visible'
			parent = parent.parentElement
		}

		char.style.overflow = 'visible'
		char.style.color = 'transparent'
		char.style.setProperty('-webkit-text-fill-color', 'transparent')

		if (DESCENDER_CHARS.test(char.textContent ?? '')) {
			char.style.paddingBottom = DESCENDER_PADDING
		}
	}

	const sourceTop = source.getBoundingClientRect().top
	const sourceHeight = source.getBoundingClientRect().height

	for (const char of chars as HTMLElement[]) {
		const offset = char.getBoundingClientRect().top - sourceTop

		char.style.backgroundImage = 'var(--clipped-gradient)'
		char.style.backgroundRepeat = 'no-repeat'
		char.style.backgroundSize = `100% ${sourceHeight}px`
		char.style.backgroundPosition = `0 ${-offset}px`
		char.style.backgroundClip = 'text'
		char.style.setProperty('-webkit-background-clip', 'text')
	}
}

export function debugMarkers(id: string) {
	if (!enabledDebugMarkers[id]) return false

	return { startColor: 'lime', endColor: 'red', fontSize: '14px', fontWeight: 'bold', indent: 20 }
}
