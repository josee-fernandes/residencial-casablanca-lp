import { enabledDebugMarkers } from '@/constants/gsap'

export function cloneClippedGradient(source: HTMLElement, chars: Element[]) {
	const sourceTop = source.getBoundingClientRect().top
	const sourceHeight = source.offsetHeight

	for (const char of chars as HTMLElement[]) {
		const offset = char.getBoundingClientRect().top - sourceTop

		char.style.backgroundImage = 'var(--clipped-gradient)'
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
