import { useGSAP } from '@gsap/react'
import { createFileRoute } from '@tanstack/react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLenis } from 'lenis/react'
import { CalendarIcon, KeyRoundIcon, UserRoundIcon } from 'lucide-react'
import { useRef } from 'react'

import { useTheme } from '@/components/theme-provider'
import { ThemeToggler } from '@/components/theme-toggler'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { DotPattern } from '@/components/ui/dot-pattern'
import { LightRays } from '@/components/ui/light-rays'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { cn } from '@/lib/utils'

import heroDark from '@/assets/hero-dark.webp'
import heroLight from '@/assets/hero-light.webp'
import tableDark from '@/assets/table-dark.webp'
import tableLight from '@/assets/table-light.webp'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const enabledDebugMarkers: Record<string, boolean> = {
	// Seção 1 — Medicação sob controle
	'title-1': false,
	'copy-1': false,

	// Seção 2 — Quando a medicação depende de memória
	'title-2': false,
	'copy-2': false,
	'slide-in-right-1': false,

	// Seção 3 — Uma operação de medicação completa
	'title-3': false,
	'cards-1': false,

	// Seção 4 — Feito para quem administra medicação
	'title-4': false,
	'fill-1': false,

	// Seção 5 — Residencial Casablanca
	'title-5': false,
	'copy-3': false,
}

function debugMarkers(id: string) {
	if (!enabledDebugMarkers[id]) return false

	return { startColor: 'lime', endColor: 'red', fontSize: '14px', fontWeight: 'bold', indent: 20 }
}

export const Route = createFileRoute('/')({
	component: HomePage,
})

function HomePage() {
	const { theme } = useTheme()

	const containerRef = useRef<HTMLDivElement>(null)
	const section1TitleRef = useRef<HTMLHeadingElement>(null)
	const section2TitleRef = useRef<HTMLHeadingElement>(null)
	const section3TitleRef = useRef<HTMLHeadingElement>(null)
	const section4TitleRef = useRef<HTMLHeadingElement>(null)
	const section5TitleRef = useRef<HTMLHeadingElement>(null)
	const lenis = useLenis()

	function scrollToTop() {
		if (lenis) lenis.scrollTo(0)
		else window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useGSAP(
		() => {
			const container = containerRef.current

			if (!container) return

			const titles = [
				section1TitleRef.current,
				section2TitleRef.current,
				section3TitleRef.current,
				section4TitleRef.current,
				section5TitleRef.current,
			].filter((title) => title !== null)

			const titleSplits = titles.map((title, index) => {
				const id = `title-${index + 1}`

				return SplitText.create(title, {
					type: 'chars',
					smartWrap: true,
					autoSplit: true,
					onSplit: (self) =>
						gsap.fromTo(
							self.chars,
							{ opacity: 0, y: 50 },
							{
								opacity: 1,
								y: 0,
								duration: 0.45,
								ease: 'expo.out',
								stagger: 0.015,
								scrollTrigger: {
									trigger: title,
									start: 'top 80%',
									toggleActions: 'restart none restart reverse',
									id,
									markers: debugMarkers(id),
								},
							},
						),
				})
			})

			const paragraphs = gsap.utils.toArray<HTMLParagraphElement>('[data-animate="copy"]', container)

			const paragraphSplits = paragraphs.map((paragraph, index) => {
				const id = `copy-${index + 1}`

				return SplitText.create(paragraph, {
					type: 'lines',
					mask: 'lines',
					autoSplit: true,
					onSplit: (self) =>
						gsap.fromTo(
							self.lines,
							{ yPercent: 110 },
							{
								yPercent: 0,
								duration: 0.85,
								ease: 'expo.out',
								stagger: 0.11,
								scrollTrigger: {
									trigger: paragraph,
									start: 'top 85%',
									toggleActions: 'restart none restart reverse',
									id,
									markers: debugMarkers(id),
								},
							},
						),
				})
			})

			const fillGroups = gsap.utils.toArray<HTMLDivElement>('[data-animate="fill"]', container)

			const fillSplits = fillGroups.map((group, index) => {
				const id = `fill-${index + 1}`

				return SplitText.create(group, {
					type: 'words',
					autoSplit: true,
					onSplit: (self) =>
						gsap.fromTo(
							self.words,
							{ opacity: 0.15 },
							{
								opacity: 1,
								ease: 'none',
								duration: 0.85,
								stagger: { amount: 4 },
								scrollTrigger: {
									trigger: group,
									start: 'top 50%',
									end: 'bottom 50%',
									scrub: true,
									id,
									markers: debugMarkers(id),
								},
							},
						),
				})
			})

			const cardGroups = gsap.utils.toArray<HTMLDivElement>('[data-animate="cards"]', container)

			cardGroups.forEach((group, index) => {
				const id = `cards-${index + 1}`

				gsap.fromTo(
					group.children,
					{ opacity: 0, y: 40, scale: 0.96 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.85,
						ease: 'expo.out',
						stagger: 0.16,
						scrollTrigger: {
							trigger: group,
							start: 'top 85%',
							toggleActions: 'restart none restart reverse',
							id,
							markers: debugMarkers(id),
						},
					},
				)
			})

			const slideInRightElements = gsap.utils.toArray<HTMLElement>('[data-animate="slide-in-right"]', container)

			slideInRightElements.forEach((element, index) => {
				const id = `slide-in-right-${index + 1}`

				gsap.fromTo(
					element,
					{ opacity: 0, xPercent: 60 },
					{
						opacity: 1,
						xPercent: 0,
						duration: 1.1,
						ease: 'expo.out',
						scrollTrigger: {
							trigger: element,
							start: 'top 85%',
							toggleActions: 'restart none restart reverse',
							id,
							markers: debugMarkers(id),
						},
					},
				)
			})

			return () => {
				for (const split of [...titleSplits, ...paragraphSplits, ...fillSplits]) split.revert()
			}
		},
		{ scope: containerRef },
	)

	return (
		<div ref={containerRef} className="overflow-x-hidden">
			<nav className="absolute z-10 top-0 left-0 w-full h-10 flex items-center justify-end px-4">
				<ThemeToggler />
			</nav>
			<section className="relative w-screen py-16 px-6 overflow-hidden ">
				{/* <LightRays className="after:absolute after:inset-0 after:z-50 after:bg-linear-to-t after:from-background after:from-30% after:to-transparent" /> */}

				<div className="relative z-1 mt-32 md:mt-64 px-4 max-w-300 mx-auto flex items-center justify-center">
					<div className="flex flex-col gap-4">
						<div className="pointer-events-none bg-linear-to-t from-background to-20% to-foreground/80 bg-clip-text leading-none whitespace-pre-wrap text-transparent">
							<h1 ref={section1TitleRef} className="font-bold text-2xl xl:text-6xl text-center">
								Medicação sob controle.
								<br />
								Do paciente ao horário certo.
							</h1>
						</div>
						<p data-animate="copy" className="text-center text-muted-foreground text-balance">
							Cadastre pacientes, vincule responsáveis, monte prescrições e agendas de administração
							<br />
							com painel para a equipe e API para o seu app.
						</p>
					</div>
				</div>
				<div className="relative z-1 overflow-hidden max-w-304 mx-auto rounded-xl mt-32 after:absolute after:inset-0 after:z-50 after:bg-linear-to-t after:from-background after:from-30% after:to-transparent">
					<div className="border rounded-[inherit]">
						<img src={theme === 'dark' ? heroDark : heroLight} alt="Hero Image" className="rounded-[inherit]" />
						<BorderBeam duration={16} size={300} className="from-primary via-primary to-transparent" />
					</div>
				</div>
				<div className="after:absolute after:inset-0 after:bg-linear-to-t after:from-background after:from-10% after:to-transparent">
					<LightRays length="60vh" />
				</div>
			</section>

			<section className="relative w-screen py-16 overflow-hidden">
				{/* <NoiseTexture noiseOpacity={0.15} /> */}
				<div className="px-4 max-w-300 mx-auto h-full flex flex-col md:flex-row items-center md:justify-between gap-4">
					<div className="flex flex-col gap-4 max-w-150">
						<h1 ref={section2TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word">
							Quando a medicação depende de memória e planilha, o risco sobe.
						</h1>
						<p data-animate="copy" className="text-muted-foreground">
							Troca de plantão, horários perdidos, dose errada, “já administrei?” sem registro claro. Em instituições
							com vários pacientes e vários profissionais, o controle manual não escala — e o custo do erro é alto.
						</p>
					</div>

					<img
						data-animate="slide-in-right"
						src={theme === 'dark' ? tableDark : tableLight}
						alt="Table Preview"
						className="rounded-lg max-w-130 w-full"
					/>
				</div>
			</section>

			<section className="relative w-screen h-200 py-16 overflow-hidden">
				<DotPattern className={cn('mask-[radial-gradient(300px_circle_at_center,white,transparent)]')} />
				<div className="px-4 max-w-300 mx-auto h-full flex items-center ">
					<div className="flex flex-col gap-4 items-center justify-center">
						<div className="flex flex-col gap-4 max-w-150 items-center justify-center">
							<h1 ref={section3TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word text-center">
								Uma operação de medicação completa, do cadastro à agenda.
							</h1>
						</div>

						<div data-animate="cards" className="flex flex-col md:flex-row gap-4 mt-6">
							<div className="border bg-card p-4 rounded-lg">
								<UserRoundIcon className="mx-auto size-6 md:size-10" />
								<h3 className="font-semibold text-lg text-center">Pacientes e responsáveis</h3>
								<p className="mt-2 text-sm text-center">
									Cadastro com documento, admissão e vínculo familiar/legal — quem cuida de quem fica explícito.
								</p>
							</div>
							<div className="border bg-card p-4 rounded-lg">
								<CalendarIcon className="mx-auto size-6 md:size-10" />
								<h3 className="font-semibold text-lg text-center">Prescrições e agendas</h3>
								<p className="mt-2 text-sm text-center">
									Medicamento, período de vigência, instruções e horários por dia da semana, com quantidade definida.
								</p>
							</div>
							<div className="border bg-card p-4 rounded-lg">
								<KeyRoundIcon className="mx-auto size-6 md:size-10" />
								<h3 className="mt-2 font-semibold text-lg text-center">Equipe com papéis e permissões</h3>
								<p className="mt-2 text-sm text-center">
									Enfermagem, farmácia e admin veem e fazem só o que cabe a cada perfil — no painel e na API.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative w-screen h-200 py-16 overflow-hidden">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-4 max-w-150">
							<h1 ref={section4TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word">
								Feito para quem administra medicação todos os dias.
							</h1>
						</div>

						<div data-animate="fill" className="mt-6 flex flex-col gap-4 text-foreground">
							<div>
								<h3 className="font-semibold text-2xl">Enfermagem / cuidadoras</h3>
								<p className="text-lg">
									Agenda do dia, dose e horário — sem depender de planilha ou memória na troca de plantão.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-2xl">Coordenação / administração</h3>
								<p className="text-lg">Visão de pacientes, responsáveis e quem tem permissão para ver ou alterar.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative w-screen h-screen overflow-hidden">
				<div className="relative z-1 px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-4 max-w-150">
							<h1 ref={section5TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word text-center">
								Residencial Casablanca
							</h1>
							<p data-animate="copy" className="text-center">
								Clínica e creche para idosos
							</p>
							<Button variant="outline" className="group relative" onClick={scrollToTop}>
								Voltar ao topo
							</Button>
						</div>
					</div>
				</div>
				<div className="after:absolute after:inset-0 after:bg-linear-to-b after:from-background after:from-10% after:to-transparent">
					<LightRays length="60vh" className="rotate-180" />
				</div>
			</section>
		</div>
	)
}
