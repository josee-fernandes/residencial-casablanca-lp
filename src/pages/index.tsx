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
import { cn } from '@/lib/utils'

import heroDark from '@/assets/hero-dark.webp'
import heroLight from '@/assets/hero-light.webp'
import tableDark from '@/assets/table-dark.webp'
import tableLight from '@/assets/table-light.webp'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

// Lidar com mudança de altura da viewport durante o scroll
ScrollTrigger.config({ ignoreMobileResize: true })

const MEDIA_CONDITIONS = {
	isMobile: '(max-width: 767px)',
	isDesktop: '(min-width: 768px)',
	prefersReducedMotion: '(prefers-reduced-motion: reduce)',
}

type MediaConditions = {
	isMobile: boolean
	isDesktop: boolean
	prefersReducedMotion: boolean
}

const enabledDebugMarkers: Record<string, boolean> = {
	// Seção 2 — Quando a medicação depende de memória
	'title-2': false,
	'copy-1': false,
	'slide-in-right-1': false,

	// Seção 3 — Uma operação de medicação completa
	'title-3': false,
	'cards-1': false,
	'cards-1-1': false,
	'cards-1-2': false,
	'cards-1-3': false,

	// Seção 4 — Feito para quem administra medicação
	'title-4': false,
	'fill-1': false,

	// Seção 5 — Residencial Casablanca
	'title-5': false,
	'copy-2': false,
	'fade-up-1': false,
}

// Um `bg-clip-text` no wrapper para de recortar os chars no momento em que eles ganham
// transform próprio no stagger, e o título fica invisível. Cada char passa a carregar a
// fatia do degradê que lhe cabe, mantendo o mesmo visual do bloco inteiro.
function cloneClippedGradient(source: HTMLElement, chars: Element[]) {
	const { backgroundImage } = getComputedStyle(source)
	const sourceTop = source.getBoundingClientRect().top
	const sourceHeight = source.offsetHeight

	for (const char of chars as HTMLElement[]) {
		const offset = char.getBoundingClientRect().top - sourceTop

		char.style.backgroundImage = backgroundImage
		char.style.backgroundSize = `100% ${sourceHeight}px`
		char.style.backgroundPosition = `0 ${-offset}px`
		char.style.backgroundClip = 'text'
		char.style.setProperty('-webkit-background-clip', 'text')
	}
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
	const heroTitleRef = useRef<HTMLHeadingElement>(null)
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

			const mediaQueries = gsap.matchMedia()

			let isActive = true

			// Com `autoSplit`, o SplitText divide o texto outra vez quando as fontes acabam de
			// carregar e recria a animação, que recomeça na frente do usuário. Montar tudo depois
			// das fontes deixa acontecer uma única passada.
			const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()

			fontsReady.then(() => {
				if (!isActive) return

				mediaQueries.add(MEDIA_CONDITIONS, (context) => {
					const { isMobile, prefersReducedMotion } = context.conditions as MediaConditions

					const heroTitle = heroTitleRef.current

					const titles = [
						section2TitleRef.current,
						section3TitleRef.current,
						section4TitleRef.current,
						section5TitleRef.current,
					].filter((title) => title !== null)

					// Os alvos nascem com `invisible` no HTML para não aparecerem no estado final
					// antes de existir animação; revelar aqui, junto da criação delas.
					const hiddenElements = [
						heroTitle,
						...titles,
						...gsap.utils.toArray<HTMLElement>('[data-animate]', container),
					].filter((element) => element !== null)

					gsap.set(hiddenElements, { visibility: 'visible' })

					if (prefersReducedMotion) return

					const splits: SplitText[] = []

					const titleStart = isMobile ? 'top 88%' : 'top 82%'
					const copyStart = isMobile ? 'top 92%' : 'top 86%'
					const cardsStart = isMobile ? 'top 92%' : 'top 82%'
					const fadeUpStart = isMobile ? 'top 92%' : 'top 88%'
					const toggleActions = 'play none none reverse'

					if (heroTitle) {
						splits.push(
							SplitText.create(heroTitle, {
								type: 'chars',
								smartWrap: true,
								autoSplit: true,
								onSplit: (self) => {
									cloneClippedGradient(heroTitle.parentElement ?? heroTitle, self.chars)

									return gsap.fromTo(
										self.chars,
										{ opacity: 0, y: 50 },
										{ opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', stagger: 0.015, delay: 0.1 },
									)
								},
							}),
						)
					}

					const heroCopy = gsap.utils.toArray<HTMLParagraphElement>('[data-animate="hero-copy"]', container)

					for (const paragraph of heroCopy) {
						splits.push(
							SplitText.create(paragraph, {
								type: 'lines',
								mask: 'lines',
								autoSplit: true,
								onSplit: (self) =>
									gsap.fromTo(
										self.lines,
										{ yPercent: 110 },
										{ yPercent: 0, duration: 0.85, ease: 'expo.out', stagger: 0.11, delay: 0.35 },
									),
							}),
						)
					}

					gsap.fromTo(
						'[data-animate="hero-visual"]',
						{ opacity: 0, y: 48, scale: 0.98 },
						{ opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 },
					)

					titles.forEach((title, index) => {
						const id = `title-${index + 2}`

						splits.push(
							SplitText.create(title, {
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
												start: titleStart,
												toggleActions,
												invalidateOnRefresh: true,
												id,
												markers: debugMarkers(id),
											},
										},
									),
							}),
						)
					})

					const paragraphs = gsap.utils.toArray<HTMLParagraphElement>('[data-animate="copy"]', container)

					paragraphs.forEach((paragraph, index) => {
						const id = `copy-${index + 1}`

						splits.push(
							SplitText.create(paragraph, {
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
												start: copyStart,
												toggleActions,
												invalidateOnRefresh: true,
												id,
												markers: debugMarkers(id),
											},
										},
									),
							}),
						)
					})

					const fillGroups = gsap.utils.toArray<HTMLDivElement>('[data-animate="fill"]', container)

					fillGroups.forEach((group, index) => {
						const id = `fill-${index + 1}`

						splits.push(
							SplitText.create(group, {
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
												start: isMobile ? 'top 85%' : 'top 75%',
												end: () => `+=${Math.round(group.offsetHeight + window.innerHeight * (isMobile ? 0.4 : 0.55))}`,
												scrub: 0.6,
												invalidateOnRefresh: true,
												id,
												markers: debugMarkers(id),
											},
										},
									),
							}),
						)
					})

					const cardGroups = gsap.utils.toArray<HTMLDivElement>('[data-animate="cards"]', container)

					cardGroups.forEach((group, groupIndex) => {
						const cards = gsap.utils.toArray<HTMLElement>(group.children)

						// Lidar com cards empilhados no mobile
						if (isMobile) {
							cards.forEach((card, cardIndex) => {
								const id = `cards-${groupIndex + 1}-${cardIndex + 1}`

								gsap.fromTo(
									card,
									{ opacity: 0, y: 32 },
									{
										opacity: 1,
										y: 0,
										duration: 0.7,
										ease: 'expo.out',
										scrollTrigger: {
											trigger: card,
											start: cardsStart,
											toggleActions,
											invalidateOnRefresh: true,
											id,
											markers: debugMarkers(id),
										},
									},
								)
							})

							return
						}

						const id = `cards-${groupIndex + 1}`

						gsap.fromTo(
							cards,
							{ opacity: 0, y: 40, scale: 0.96 },
							{
								opacity: 1,
								y: 0,
								scale: 1,
								duration: 0.85,
								ease: 'expo.out',
								stagger: 0.14,
								scrollTrigger: {
									trigger: group,
									start: cardsStart,
									toggleActions,
									invalidateOnRefresh: true,
									id,
									markers: debugMarkers(id),
								},
							},
						)
					})

					const slideInRightElements = gsap.utils.toArray<HTMLElement>('[data-animate="slide-in-right"]', container)

					slideInRightElements.forEach((element, index) => {
						const id = `slide-in-right-${index + 1}`

						gsap.fromTo(element, isMobile ? { opacity: 0, y: 40 } : { opacity: 0, xPercent: 45 }, {
							opacity: 1,
							y: 0,
							xPercent: 0,
							duration: isMobile ? 0.8 : 1.1,
							ease: 'expo.out',
							scrollTrigger: {
								trigger: element,
								// Lidar com imagem mais alta que o texto ao lado, então entra na viewport antes dele: o start mais tarde alinha as duas entradas.
								start: isMobile ? 'top 90%' : 'top 72%',
								toggleActions,
								invalidateOnRefresh: true,
								id,
								markers: debugMarkers(id),
							},
						})
					})

					const fadeUpElements = gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]', container)

					fadeUpElements.forEach((element, index) => {
						const id = `fade-up-${index + 1}`

						gsap.fromTo(
							element,
							{ opacity: 0, y: 24 },
							{
								opacity: 1,
								y: 0,
								duration: 0.7,
								ease: 'expo.out',
								scrollTrigger: {
									trigger: element,
									start: fadeUpStart,
									toggleActions,
									invalidateOnRefresh: true,
									id,
									markers: debugMarkers(id),
								},
							},
						)
					})

					return () => {
						for (const split of splits) split.revert()
					}
				})

				ScrollTrigger.refresh()
			})

			return () => {
				isActive = false
				mediaQueries.revert()
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
				<div className="relative z-1 mt-32 md:mt-64 px-4 max-w-300 mx-auto flex items-center justify-center">
					<div className="flex flex-col gap-4">
						<div className="pointer-events-none bg-linear-to-t from-background to-20% to-foreground/80 bg-clip-text leading-none whitespace-pre-wrap text-transparent">
							<h1 ref={heroTitleRef} className="invisible font-bold text-2xl xl:text-6xl text-center">
								Medicação sob controle.
								<br />
								Do paciente ao horário certo.
							</h1>
						</div>
						<p data-animate="hero-copy" className="invisible text-center text-muted-foreground text-balance">
							Cadastre pacientes, vincule responsáveis, monte prescrições e agendas de administração
							<br />
							com painel para a equipe e API para o seu app.
						</p>
					</div>
				</div>
				<div
					data-animate="hero-visual"
					className="invisible relative z-1 overflow-hidden max-w-304 mx-auto rounded-xl mt-32 after:absolute after:inset-0 after:z-50 after:bg-linear-to-t after:from-background after:from-30% after:to-transparent"
				>
					<div className="border rounded-[inherit]">
						<img
							src={theme === 'dark' ? heroDark : heroLight}
							alt="Hero Image"
							className="rounded-[inherit]"
							onLoad={() => ScrollTrigger.refresh()}
						/>
						<BorderBeam duration={16} size={300} className="from-primary via-primary to-transparent" />
					</div>
				</div>
				<div className="after:absolute after:inset-0 after:bg-linear-to-t after:from-background after:from-10% after:to-transparent">
					<LightRays length="60vh" />
				</div>
			</section>

			<section className="relative w-screen py-16 overflow-hidden">
				<div className="px-4 max-w-300 mx-auto h-full flex flex-col md:flex-row items-center md:justify-between gap-4">
					<div className="flex flex-col gap-4 max-w-150">
						<h1 ref={section2TitleRef} className="invisible font-bold text-2xl xl:text-4xl wrap-break-word">
							Quando a medicação depende de memória e planilha, o risco sobe.
						</h1>
						<p data-animate="copy" className="invisible text-muted-foreground">
							Troca de plantão, horários perdidos, dose errada, “já administrei?” sem registro claro. Em instituições
							com vários pacientes e vários profissionais, o controle manual não escala — e o custo do erro é alto.
						</p>
					</div>

					<img
						data-animate="slide-in-right"
						src={theme === 'dark' ? tableDark : tableLight}
						alt="Table Preview"
						className="invisible rounded-lg max-w-130 w-full"
						onLoad={() => ScrollTrigger.refresh()}
					/>
				</div>
			</section>

			<section className="relative w-screen h-200 py-16 overflow-hidden">
				<DotPattern className={cn('mask-[radial-gradient(300px_circle_at_center,white,transparent)]')} />
				<div className="px-4 max-w-300 mx-auto h-full flex items-center ">
					<div className="flex flex-col gap-4 items-center justify-center">
						<div className="flex flex-col gap-4 max-w-150 items-center justify-center">
							<h1
								ref={section3TitleRef}
								className="invisible font-bold text-2xl xl:text-4xl wrap-break-word text-center"
							>
								Uma operação de medicação completa, do cadastro à agenda.
							</h1>
						</div>

						<div data-animate="cards" className="invisible flex flex-col md:flex-row gap-4 mt-6">
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
							<h1 ref={section4TitleRef} className="invisible font-bold text-2xl xl:text-4xl wrap-break-word">
								Feito para quem administra medicação todos os dias.
							</h1>
						</div>

						<div data-animate="fill" className="invisible mt-6 flex flex-col gap-4 text-foreground">
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
							<h1
								ref={section5TitleRef}
								className="invisible font-bold text-2xl xl:text-4xl wrap-break-word text-center"
							>
								Residencial Casablanca
							</h1>
							<p data-animate="copy" className="invisible text-center">
								Clínica e creche para idosos
							</p>
							<Button
								data-animate="fade-up"
								variant="outline"
								className="invisible group relative"
								onClick={scrollToTop}
							>
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
