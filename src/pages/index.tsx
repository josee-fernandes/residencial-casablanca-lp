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
import { Button } from '@/components/ui/button'
import { DotPattern } from '@/components/ui/dot-pattern'
import { LightRays } from '@/components/ui/light-rays'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { cn } from '@/lib/utils'

import tableDark from '@/assets/table-dark.jpg'
import tableLight from '@/assets/table-light.jpg'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

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

			const titleSplits = titles.map((title) =>
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
								duration: 0.3,
								ease: 'expo.out',
								stagger: 0.01,
								scrollTrigger: {
									trigger: title,
									start: 'top 80%',
									toggleActions: 'restart none restart reverse',
								},
							},
						),
				}),
			)

			const paragraphs = gsap.utils.toArray<HTMLParagraphElement>('[data-animate="copy"]', container)

			const paragraphSplits = paragraphs.map((paragraph) =>
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
								duration: 0.6,
								ease: 'expo.out',
								stagger: 0.08,
								scrollTrigger: {
									trigger: paragraph,
									start: 'top 85%',
									toggleActions: 'restart none restart reverse',
								},
							},
						),
				}),
			)

			const fillGroups = gsap.utils.toArray<HTMLDivElement>('[data-animate="fill"]', container)

			const fillSplits = fillGroups.map((group) =>
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
								duration: 0.6,
								stagger: { amount: 3 },
								scrollTrigger: {
									trigger: group,
									start: 'top 90%',
									end: 'bottom 70%',
									scrub: true,
								},
							},
						),
				}),
			)

			const cardGroups = gsap.utils.toArray<HTMLDivElement>('[data-animate="cards"]', container)

			for (const group of cardGroups) {
				gsap.fromTo(
					group.children,
					{ opacity: 0, y: 40, scale: 0.96 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.6,
						ease: 'expo.out',
						stagger: 0.12,
						scrollTrigger: {
							trigger: group,
							start: 'top 85%',
							toggleActions: 'restart none restart reverse',
						},
					},
				)
			}

			return () => {
				for (const split of [...titleSplits, ...paragraphSplits, ...fillSplits]) split.revert()
			}
		},
		{ scope: containerRef },
	)

	return (
		<div ref={containerRef} className="overflow-x-hidden">
			<section className="relative w-screen h-screen overflow-hidden">
				<nav className="absolute top-0 left-0 w-full h-10 flex items-center justify-end px-4">
					<ThemeToggler />
				</nav>
				<LightRays />
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<div className="flex flex-col gap-4 max-w-150">
						<h1 ref={section1TitleRef} className="font-bold text-2xl xl:text-4xl text-center wrap-break-word">
							Medicação sob controle.
							<br />
							Do paciente ao horário certo.
						</h1>
						<p data-animate="copy" className="text-center text-muted-foreground">
							Cadastre pacientes, vincule responsáveis, monte prescrições e agendas de administração — com painel para a
							equipe e API para o seu app.
						</p>
					</div>
				</div>
			</section>

			<section className="relative w-screen h-screen overflow-hidden">
				<NoiseTexture noiseOpacity={0.15} />
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
						src={theme === 'dark' ? tableDark : tableLight}
						alt="Table Preview"
						className="rounded-lg max-w-130 w-full"
					/>
				</div>
			</section>

			<section className="relative w-screen h-screen overflow-hidden">
				<DotPattern className={cn('[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]')} />
				<div className="px-4 max-w-300 mx-auto h-full flex items-center ">
					<div className="flex flex-col gap-4 items-center justify-center">
						<div className="flex flex-col gap-4 max-w-150 items-center justify-center">
							<h1 ref={section3TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word text-center">
								Uma operação de medicação completa, do cadastro à agenda.
							</h1>
						</div>

						<div data-animate="cards" className="flex gap-4 mt-6">
							<div className="border bg-card p-4 rounded-lg">
								<UserRoundIcon className="mx-auto size-10" />
								<h3 className="font-semibold text-lg text-center">Pacientes e responsáveis</h3>
								<p className="mt-2 text-sm text-center">
									Cadastro com documento, admissão e vínculo familiar/legal — quem cuida de quem fica explícito.
								</p>
							</div>
							<div className="border bg-card p-4 rounded-lg">
								<CalendarIcon className="mx-auto size-10" />
								<h3 className="font-semibold text-lg text-center">Prescrições e agendas</h3>
								<p className="mt-2 text-sm text-center">
									Medicamento, período de vigência, instruções e horários por dia da semana, com quantidade definida.
								</p>
							</div>
							<div className="border bg-card p-4 rounded-lg">
								<KeyRoundIcon className="mx-auto size-10" />
								<h3 className="mt-2 font-semibold text-lg text-center">Equipe com papéis e permissões</h3>
								<p className="mt-2 text-sm text-center">
									Enfermagem, farmácia e admin veem e fazem só o que cabe a cada perfil — no painel e na API.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative w-screen h-screen overflow-hidden">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-4 max-w-150">
							<h1 ref={section4TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word">
								Feito para quem administra medicação todos os dias.
							</h1>
						</div>

						<div data-animate="fill" className="mt-6 flex flex-col gap-4 text-foreground">
							<div>
								<h3 className="font-black text-2xl uppercase">Enfermagem / cuidadoras</h3>
								<p className="font-black text-lg uppercase">
									Agenda do dia, dose e horário — sem depender de planilha ou memória na troca de plantão.
								</p>
							</div>
							<div>
								<h3 className="font-black text-2xl uppercase">Coordenação / administração</h3>
								<p className="font-black text-lg uppercase">
									Visão de pacientes, responsáveis e quem tem permissão para ver ou alterar.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative w-screen h-screen overflow-hidden">
				<LightRays className="rotate-180" />
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
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
			</section>
		</div>
	)
}
