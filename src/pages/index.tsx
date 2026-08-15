import { useGSAP } from '@gsap/react'
import { createFileRoute } from '@tanstack/react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CalendarIcon, KeyRoundIcon, UserRoundIcon } from 'lucide-react'
import { useRef } from 'react'

import { ThemeToggler } from '@/components/theme-toggler'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export const Route = createFileRoute('/')({
	component: HomePage,
})

function HomePage() {
	const containerRef = useRef<HTMLDivElement>(null)
	const section1TitleRef = useRef<HTMLHeadingElement>(null)
	const section2TitleRef = useRef<HTMLHeadingElement>(null)
	const section3TitleRef = useRef<HTMLHeadingElement>(null)
	const section4TitleRef = useRef<HTMLHeadingElement>(null)
	const section5TitleRef = useRef<HTMLHeadingElement>(null)

	useGSAP(
		() => {
			const titles = [
				section1TitleRef.current,
				section2TitleRef.current,
				section3TitleRef.current,
				section4TitleRef.current,
				section5TitleRef.current,
			].filter((title) => title !== null)

			const splits = titles.map((title) =>
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

			return () => {
				for (const split of splits) split.revert()
			}
		},
		{ scope: containerRef },
	)

	return (
		<div ref={containerRef} className="overflow-x-hidden">
			<section className="w-screen h-screen">
				<nav className="absolute top-0 left-0 w-full h-10 flex items-center justify-end px-4">
					<ThemeToggler />
				</nav>
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<div className="flex flex-col gap-4 max-w-150">
						<h1 ref={section1TitleRef} className="font-bold text-2xl xl:text-4xl text-center wrap-break-word">
							Medicação sob controle.
							<br />
							Do paciente ao horário certo.
						</h1>
						<p className="text-center text-muted-foreground">
							Cadastre pacientes, vincule responsáveis, monte prescrições e agendas de administração — com painel para a
							equipe e API para o seu app.
						</p>
					</div>
				</div>
			</section>

			<section className="w-screen h-screen">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center">
					<div className="flex flex-col gap-4 max-w-150">
						<h1 ref={section2TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word">
							Quando a medicação depende de memória e planilha, o risco sobe.
						</h1>
						<p className="text-muted-foreground">
							Troca de plantão, horários perdidos, dose errada, “já administrei?” sem registro claro. Em instituições
							com vários pacientes e vários profissionais, o controle manual não escala — e o custo do erro é alto.
						</p>
					</div>
					<div className="bg-white rounde-lg h-100 w-130"></div>
				</div>
			</section>

			<section className="w-screen h-screen">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center ">
					<div className="flex flex-col gap-4 items-center justify-center">
						<div className="flex flex-col gap-4 max-w-150 items-center justify-center">
							<h1 ref={section3TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word text-center">
								Uma operação de medicação completa, do cadastro à agenda.
							</h1>
						</div>

						<div className="flex gap-4 mt-6">
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

			<section className="w-screen h-screen">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-4 max-w-150">
							<h1 ref={section4TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word">
								Feito para quem administra medicação todos os dias.
							</h1>
						</div>

						<div className="flex gap-4">
							<div className="border bg-card p-4 rounded-lg">
								<h3 className="font-semibold text-lg">Pacientes e responsáveis</h3>
								<p className="mt-2 text-sm">
									Cadastro com documento, admissão e vínculo familiar/legal — quem cuida de quem fica explícito.
								</p>
							</div>
							<div className="border bg-card p-4 rounded-lg">
								<h3 className="font-semibold text-lg">Prescrições e agendas</h3>
								<p className="mt-2 text-sm">
									Medicamento, período de vigência, instruções e horários por dia da semana, com quantidade definida.
								</p>
							</div>
							<div className="border bg-card p-4 rounded-lg">
								<h3 className="font-semibold text-lg">Equipe com papéis e permissões</h3>
								<p className="mt-2 text-sm">
									Enfermagem, farmácia e admin veem e fazem só o que cabe a cada perfil — no painel e na API.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="w-screen h-screen">
				<div className="px-4 max-w-300 mx-auto h-full flex items-center justify-center">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-4 max-w-150">
							<h1 ref={section5TitleRef} className="font-bold text-2xl xl:text-4xl wrap-break-word text-center">
								Residencial Casablanca
							</h1>
							<p className="text-center">Clínica e creche para idosos</p>
							<Button variant="outline" className="group relative">
								Voltar ao topo
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
