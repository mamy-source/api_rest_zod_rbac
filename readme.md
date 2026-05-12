# REST API - Task Management System

API REST sécurisée développée avec **Node.js**, **Express**, **Prisma ORM** et **JWT Authentication**.

Ce projet implémente une architecture backend moderne avec :

- Authentification JWT (Access Token + Refresh Token)
- Gestion des utilisateurs
- Gestion des tâches (CRUD)
- Pagination
- RBAC (Role Based Access Control)
- Middleware de validation avec Zod
- Prisma ORM
- Gestion centralisée des erreurs

---

## Stack Technique

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL / MySQL
- JWT
- Zod
- Cookie Parser
- Argon

---

## Fonctionnalités

### Authentification
- Inscription
- Connexion
- Refresh Token


### Utilisateurs
- Consulter un utilisateur
- Modifier un utilisateur
- Supprimer un utilisateur
- Changer le rôle

### Tâches
- Créer une tâche
- Lister les tâches
- Pagination
- Modifier une tâche
- Supprimer une tâche

### Sécurité
- JWT Access Token
- Refresh Token via cookies HTTPOnly
- RBAC (admin / user)
- Validation Zod
- Middleware centralisé d’erreurs

---

# Architecture du projet

```txt
src/
│
├── controllers/
├── services/
├── routes/
├── middlewares/
├── schema/
├── prisma/
├── utils/
└── app.js
```

---

# Installation

## 1. Cloner le projet

```bash
git clone https://github.com/mamy-source/api_rest_zod_rbac.git
cd restApi_express
```

---

## 2. Installer les dépendances

```bash
npm install
```

---

## 3. Configurer les variables d’environnement

Créer un fichier `.env`

```env
PORT=9000

DATABASE_URL="postgresql://postgres:password@localhost:5432/rest_db"

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Pour MySQL :

```env
DATABASE_URL="mysql://root:password@localhost:3306/rest_db"
```

---

## 4. Initialiser Prisma

Créer les migrations :

```bash
npx prisma migrate dev --name init
```

Générer Prisma Client :

```bash
npx prisma generate
```

---

## 5. Lancer le serveur

Mode développement :

```bash
npm run dev
```

Le serveur sera disponible sur :

```txt
http://localhost:9000
```

---

# Endpoints principaux

## Auth

### Register
```http
POST /auth/register
```

### Login
```http
POST /auth/login
```

### Refresh Token
```http
POST /auth/refresh
```


---

## Tasks

### Créer une tâche
```http
POST /task/create
```

### Lister les tâches
```http
GET /tasks?page=1&limit=10
```


### Détail
```http
GET /tasks/:id
```

### Modifier
```http
PUT /tasks/:id
```

### Supprimer
```http
DELETE /tasks/:id
```

---

## Users

### Obtenir un utilisateur
```http
GET /users/:id
```

### Modifier
```http
PUT /users/:id
```

### Supprimer
```http
DELETE /users/:id
```

### Changer rôle
```http
PATCH /users/:id/role
```

---

# Authentification

Ajouter le token dans les headers :

```http
Authorization: Bearer your_access_token
```

---

# Pagination

Exemple :

```http
GET /tasks?page=2&limit=5
```

Réponse :

```json
{
  "data": [],
  "pagination": {
    "page": 2,
    "limit": 5,
    "total": 20,
    "totalPages": 4
  }
}
```

---

# Scripts disponibles

Lancer en dev :

```bash
npm run dev
```

Prisma Studio :

```bash
npx prisma studio
```

Créer migration :

```bash
npx prisma migrate dev --name migration_name
```

---

# Notes importantes

- Vérifier que la base de données est démarrée
- Vérifier les variables `.env`
- Régénérer Prisma si besoin :

```bash
npx prisma generate
```

---

# Auteur

Développé par **Mamy**

Backend Developer | Node.js | Express | Prisma