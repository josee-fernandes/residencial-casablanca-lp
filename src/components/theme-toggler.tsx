import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from './theme-provider'
import { Button } from './ui/button'

export function ThemeToggler() {
	const { theme, setTheme } = useTheme()

	return (
		<Button variant="ghost" size="icon-sm" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			{theme === 'light' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
		</Button>
	)
}
