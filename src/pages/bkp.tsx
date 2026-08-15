import { useGSAP } from '@gsap/react'
import { createFileRoute } from '@tanstack/react-router'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ExternalLinkIcon } from 'lucide-react'
import { useRef } from 'react'

import { ThemeToggler } from '@/components/theme-toggler'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(SplitText)

export const Route = createFileRoute('/bkp')({
	component: BkpPage,
})

function BkpPage() {
	const section1TitleRef = useRef<HTMLHeadingElement>(null)
	const section2TitleRef = useRef<HTMLHeadingElement>(null)
	const section3TitleRef = useRef<HTMLHeadingElement>(null)
	const section4TitleRef = useRef<HTMLHeadingElement>(null)
	const section5TitleRef = useRef<HTMLHeadingElement>(null)

	useGSAP(() => {
		const tl = gsap.timeline({ repeat: -1, delay: 1, repeatDelay: 0.5 })
		const split = SplitText.create(section1TitleRef.current, { type: 'chars' })

		tl.fromTo(
			split.chars,
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: 'expo.out',
				stagger: 0.015,
			},
		)
		tl.to(split.chars, {
			opacity: 0,
			y: -50,
			duration: 0.5,
			ease: 'expo.in',
			stagger: 0.015,
		})

		return () => {
			tl.kill()
			split.revert()
		}
	})

	useGSAP(() => {
		const tl = gsap.timeline({ repeat: -1, delay: 1, repeatDelay: 0.5 })
		const split = SplitText.create(section2TitleRef.current, { type: 'chars' })

		tl.fromTo(
			split.chars,
			{ opacity: 0, x: 50 },
			{
				opacity: 1,
				x: 0,
				duration: 0.5,
				ease: 'expo.out',
				stagger: 0.015,
			},
		)
		tl.to(split.chars, {
			opacity: 0,
			x: -50,
			duration: 0.5,
			ease: 'expo.in',
			stagger: 0.015,
		})

		return () => {
			tl.kill()
			split.revert()
		}
	})

	useGSAP(() => {
		const tl = gsap.timeline({ repeat: -1, delay: 1, repeatDelay: 0.5 })

		tl.fromTo(
			section3TitleRef.current,
			{ opacity: 0, scale: 1.5 },
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: 'expo.out',
			},
		)
		tl.to(section3TitleRef.current, {
			opacity: 0,
			scale: 0.5,
			duration: 1,
			ease: 'expo.in',
		})

		return () => {
			tl.kill()
		}
	})

	useGSAP(() => {
		const tl = gsap.timeline({ repeat: -1, delay: 1, repeatDelay: 0.5 })

		tl.fromTo(
			section4TitleRef.current,
			{ opacity: 0, x: 150 },
			{
				opacity: 1,
				x: 0,
				duration: 1,
				ease: 'expo.out',
			},
		)
		tl.to(section4TitleRef.current, {
			opacity: 0,
			x: -150,
			duration: 1,
			ease: 'expo.in',
		})

		return () => {
			tl.kill()
		}
	})

	useGSAP(() => {
		const tl = gsap.timeline({ repeat: -1, delay: 1, repeatDelay: 0.5 })

		tl.fromTo(
			section5TitleRef.current,
			{ opacity: 0, scale: 1.5 },
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: 'expo.out',
			},
		)
		tl.to(section5TitleRef.current, {
			opacity: 0,
			y: 150,
			duration: 1,
			ease: 'expo.in',
		})

		return () => {
			tl.kill()
		}
	})

	return (
		<div className="overflow-x-hidden">
			<section className="w-screen h-screen">
				<nav className="absolute top-0 left-0 w-full h-10 flex items-center justify-end px-4">
					<ThemeToggler />
				</nav>
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<h1 ref={section1TitleRef} className="font-wide text-2xl xl:text-4xl text-center wrap-break-word">
						Welcome to the home page.
						<br />
						This is a simple section with some text.
					</h1>
				</div>
			</section>
			<section className="w-screen h-screen">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<h1 ref={section2TitleRef} className="font-wide text-2xl xl:text-4xl text-center">
						This is the second section of the home page.
					</h1>
				</div>
			</section>
			<section className="w-screen h-screen">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<h1 ref={section3TitleRef} className="font-wide text-2xl xl:text-4xl text-center">
						Aaaand this is the third one.
					</h1>
				</div>
			</section>
			<section className="w-screen h-screen">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<h1 ref={section4TitleRef} className="font-wide text-2xl xl:text-4xl text-center">
						Maybe the last one?
					</h1>
				</div>
			</section>
			<section className="w-screen h-screen relative">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<h1 ref={section5TitleRef} className="font-wide text-2xl xl:text-4xl text-center">
						Now it is. For real.
					</h1>
				</div>
				<footer className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center">
					<Button asChild variant="link" className="group text-xs text-center text-muted-foreground">
						<a href="https://github.com/josee-fernandes" target="_blank" rel="noopener noreferrer">
							josee-fernandes
							<ExternalLinkIcon className="size-3 -ml-5 opacity-0 group-hover:ml-0 group-hover:opacity-100 transition-all duration-200" />
						</a>
					</Button>
				</footer>
			</section>
		</div>
	)
}
