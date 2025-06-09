# 🔐 Auth Dashboard App (Next.js 15 + Tailwind CSS)

A modern authentication and dashboard app built with **Next.js (App Router)**, **React**, and **Tailwind CSS**. It features a login/signup flow using `localStorage` and JSON file-based storage, protected dashboard routes, user profile editing, an agent configuration panel with interdependent dropdowns, and support for dark mode.

---

## 🚀 Features

- 🔐 Sign Up & Login (with localStorage)
- 🔒 Protected Dashboard using `useState`
- 🧑‍💼 Profile Management (Email/Password Update)
- ⚙️ Agent Configuration Panel (with interdependent dropdowns)
- 📁 JSON-based fake API using `public/stt.json` and `src/data/users.json`

---

## 🛠️ Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- `localStorage` for client-side session and user data

---

## 📦 Installation

> Requires: Node.js ≥ 18, npm or pnpm

1. **Clone the repo**

```bash
git clone https://github.com/amarjithp/user_auth.git
cd user_auth

2. **Install dependencies**

```bash
npm install

3. **Run the development server**

```bash
npm run dev

4. **Visit the app**
Open http://localhost:3000 in your browser.

**🧪 Test Users**
You can edit src/data/users.json to pre-fill users:
```bash
[
  {
    "username": "john",
    "email": "john@example.com",
    "password": "1234",
    "phone": "1234567890"
  }
]

