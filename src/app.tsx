import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ReactLenis } from 'lenis/react'

import { ThemeProvider } from '@/components/theme-provider'
import { routeTree } from '@/route-tree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export function App() {
	return (
		<>
			<ReactLenis root />
			<ThemeProvider defaultTheme="dark">
				<RouterProvider router={router} />
			</ThemeProvider>
		</>
	)
}
