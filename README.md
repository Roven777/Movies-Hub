# CineHub - Movie Discoery Web Application

|Live Demo|[Live Demo](https://cinehub-production-8631.up.railway.app/)|
|:----------|-----------:|

## Overview

**Cine-Hub** is a modern, visually rich movie discovery web application designed to showcase trending movies with smooth animations, interactive UI elements, and a production-ready deployment workflow.

The project demonstrates strong frontend skills using **React**, advanced UI animations using **Framer Motion**, responsive design with **Tailwind CSS**, and real-world DevOps practices using **Docker, GitHub, and Railway**.

The application is fully containerized, automatically deployed on cloud infrastructure, and accessible publicly without requiring paid subscriptions or credit card details.

---

## Project Purpose

Cine-Hub was built to simulate a **real production-grade frontend application** with:

- Premium streaming-platform-style UI
- Smooth page-level animations
- Clean and scalable React architecture
- Docker-based deployment
- CI/CD automation using GitHub + Railway

This project is suitable for **portfolios, interviews, and real-world frontend demonstrations**.

---

## Technology Stack

### Frontend
- **React (Vite)** – fast builds and modern tooling
- **Tailwind CSS** – responsive and utility-first styling
- **Framer Motion** – smooth animations and transitions

### Routing & Icons
- **React Router DOM** – client-side routing
- **Lucide React** – modern icon set

### API Integration
- **TMDB API** – real-time movie data

### DevOps & Deployment
- **Docker** – containerization
- **Docker Hub** – image hosting
- **GitHub** – version control
- **Railway** – cloud deployment & CI/CD

---

## Application Features

### Animated Navigation Bar
- Fixed navbar with glass-blur effect
- Scroll-aware background transition
- Expandable animated search bar
- Hamburger menu trigger
- Navbar remains static during page rotation

---

### Page Rotation Interaction
A unique **full-page rotation animation** is triggered when clicking the hamburger menu.

- Entire page rotates (not the navbar)
- Rotation pivots from the **top-right corner**
- Motion flows **bottom-right → top-left**
- Implemented using **Framer Motion + React Context**

---

### Revealed Side Content
During rotation, a hidden layer is revealed displaying:

- **About Us**
- **Contact Us**

This content appears correctly aligned in the **top-left corner** behind the rotating page.

---

### Movie Discovery Section
Homepage displays:

- “Discover Movies”
- “Trending This Week”

Movies are shown in a responsive grid with:
- Poster
- Title
- Genre
- Release year

---

### Search Functionality
- Animated expanding search bar
- Keyboard (`Enter`) and button-based search
- Client-side routing for results

---

## Architecture & State Management

- React Hooks (`useState`, `useEffect`)
- Context API for global rotation state
- Controlled form components
- Modular and reusable component structure

---

## Dockerization

The application is fully containerized using Docker.

**Key details:**
- Lightweight Node Alpine image
- Production build using Vite
- Static serving via `serve`
- Port exposed on **80**
- Health checks included

Docker image is published to **Docker Hub**.

---

## Deployment on Railway

Cine-Hub is deployed on **Railway**, a free cloud platform.

Deployment includes:
- Docker-based service
- Public URL exposure
- Automatic restarts
- Built-in observability

---

## CI/CD – Auto Deployment

Automatic redeployment is enabled via **GitHub → Railway integration**.

### Deployment Flow:
1. Push code to `main` branch on GitHub
2. Railway detects the push
3. Docker image is rebuilt
4. New version is deployed automatically

No manual deployment required after setup.

---

## Port Configuration

The app listens on:

```js
process.env.PORT || 80


