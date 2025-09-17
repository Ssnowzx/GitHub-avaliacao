# GitHub Profile Analyzer

Uma aplicação web responsiva para analisar qualquer perfil do GitHub usando IA. Receba uma auditoria técnica, feedbacks práticos e gere um README profissional para seu perfil.

## Funcionalidades

- Analisa perfis do GitHub e sugere boas práticas
- Avaliação por estrelas e sugestões de melhoria
- Geração automática de README.md profissional
- Suporte a múltiplos idiomas (EN/PT)
- Interface moderna e responsiva

## Como rodar localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   `npm install`
2. Defina o `GEMINI_API_KEY` no arquivo `.env.local` com sua chave Gemini
3. Execute o app:
   `npm run dev`

## Segurança

- Sua chave Gemini nunca é exposta ao frontend.
- Todas as variáveis de ambiente são carregadas de forma segura.

## Deploy

Você pode fazer o deploy facilmente no Vercel:

1. Suba o código para um repositório no GitHub
2. Importe o repositório no Vercel
3. Adicione sua `GEMINI_API_KEY` nas variáveis de ambiente do Vercel
4. Faça o deploy e compartilhe seu app!

## Licença

MIT

---

# GitHub Profile Analyzer (English)

A responsive web app to analyze any GitHub profile using AI. Get a technical audit, actionable feedback, and generate a professional README for your profile.

## Features

- Analyze any GitHub profile for best practices
- Get a star rating and improvement suggestions
- Generate a professional README.md
- Multi-language support (EN/PT)
- Modern, responsive UI

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   `npm run dev`

## Security

- Your Gemini API key is never exposed to the frontend.
- All environment variables are loaded securely.

## Deployment

You can deploy this project easily to Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add your `GEMINI_API_KEY` in Vercel's environment variables
4. Deploy and share your app!

## License

MIT
