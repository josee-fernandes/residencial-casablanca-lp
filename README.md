# Residencial Casablanca — Landing Page

Landing page do Residencial Casablanca (clínica e creche para idosos), com foco em controle de medicação: cadastro de pacientes, responsáveis, prescrições, agendas de administração e painel para a equipe.

## Stack

- **React 19** + **TypeScript** + **Vite 8**
- **TanStack Router** (rotas baseadas em arquivos em `src/pages`)
- **Tailwind CSS 4** + **shadcn/ui**
- **GSAP** (ScrollTrigger, SplitText) + **Lenis** (scroll suave)
- **Biome** (lint)
- **React Compiler**

Gerenciador de pacotes: **pnpm**

## Pré-requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Começando

```bash
pnpm install
pnpm dev
```

A aplicação sobe em `http://localhost:5173`.

## Scripts

| Comando         | Descrição                          |
| --------------- | ---------------------------------- |
| `pnpm dev`      | Servidor de desenvolvimento (HMR)  |
| `pnpm build`    | Typecheck + build de produção      |
| `pnpm preview`  | Preview do build local             |
| `pnpm lint`     | Lint com Biome                     |

## Estrutura

```
src/
  pages/          # Rotas (TanStack Router)
  components/     # UI e providers (tema, shadcn)
  styles/         # CSS global / tokens
  lib/            # Utilitários
  app.tsx         # Router + Lenis + ThemeProvider
  main.tsx        # Entry point
```

## Observações

- O tema padrão é escuro (`ThemeProvider`), com toggle na navegação.
- A árvore de rotas gerada fica em `src/route-tree.gen.ts` (não editar à mão).
