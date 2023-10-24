# Monkey Chat

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Design UX/UI](https://www.figma.com/file/vVjs4Od2M51a1D90O9EcsT/monkey-chat?type=design&mode=design&t=VtFpbqQ3LO30ALbg-1)

## Introduction

Aplicação web de chat, utilizando next, firebase e redux. Nesse chat você pode enviar mensagens de texto e imagem em realtime.

## Features
<ul>
  <li>Criar e editar seu perfil.</li>
  <li>Adicionar nova conversa.</li>
  <li>Enviar mensagens de texto.</li>
  <li>Enviar imagens.</li>
</ul>

## Getting Started

Primeiro você precisa de uma aplicação no Firebase.
Crie um app da Web, ative um Authentication com provedor de E-mail/senha, crie um Firestore Database, e crie um Storage.
<br>
Você terá que definir um arquivo '.env' e definir as seguintes variáveis:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```
<br>
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
<br>