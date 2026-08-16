import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'

import { ThemeProvider } from '@/components/theme-provider'
import { routeTree } from '@/route-tree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

function ScrollTriggerSync() {
	useLenis(() => ScrollTrigger.update())

	return null
}

export function App() {
	return (
		<ThemeProvider defaultTheme="dark">
			<ReactLenis root>
				<ScrollTriggerSync />
				<RouterProvider router={router} />
			</ReactLenis>
		</ThemeProvider>
	)
}
