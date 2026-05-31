# CodeTask — Gerenciador de Tarefas Acadêmicas

Aplicação web desenvolvida em React para gerenciamento de tarefas acadêmicas.

O sistema permite cadastrar tarefas, visualizar a listagem em tempo real e consumir dados de uma API REST simulada, aplicando os conceitos estudados na disciplina de Tecnologias Web.

## Funcionalidades

* Navegação entre páginas com React Router
* Página inicial com consumo de API REST usando Fetch
* Cadastro de tarefas acadêmicas
* Validação de formulário com React
* Estado compartilhado entre páginas com Context API
* Listagem dinâmica das tarefas cadastradas
* Atualização da interface sem recarregar a página
* Estrutura com HTML semântico
* Responsividade básica com CSS externo

## Tecnologias utilizadas

* React
* Vite
* React Router DOM
* Context API
* Fetch API
* JavaScript (ES6+)
* HTML5 semântico
* CSS3

## Como executar o projeto

No terminal:

```bash
npm install
npm run dev
```

Acesse no navegador:

```bash
http://localhost:5173
```

## Estrutura do projeto

```bash
codetask/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── ItemsContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Cadastro.jsx
│   │   └── Listagem.jsx
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Conceitos aplicados

Durante o desenvolvimento foram utilizados os conteúdos estudados em aula:

* Componentes React
* JSX
* Props
* useState
* Context API
* Eventos:

  * onClick
  * onChange
  * onSubmit

* event.preventDefault()
* Renderização com map()
* Fetch API:

  * GET
  * POST

* ReactDOM com createRoot()
* Roteamento com React Router

## Integrantes

* Eduardo Lima dos Santos — 2412130074
* Heitor dos Santos Ribeiro — 2412130143
* Danielly de Sousa Luz — 2412130158

