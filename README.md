# Freelance Marketplace

A modern freelance job marketplace platform built with React and Vite. Post jobs, browse opportunities, and connect with freelancers.

## Features

- 🔐 Firebase Authentication (Google Sign-in)
- 💼 Post and manage job listings
- 🔍 Browse and search all jobs
- 📝 Accept and track jobs
- 🎨 Dark mode support
- 📱 Fully responsive design
- ⚡ Fast and optimized with Vite

## Tech Stack

- **Frontend:** React 19, React Router v7
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion)
- **Authentication:** Firebase
- **Backend:** MongoDB (Node.js/Express)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd A10-Freelance-MarketPlace-Client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── api/           # API configuration
├── assets/        # Static assets
├── components/    # Reusable components
├── context/       # React context providers
├── firebase/      # Firebase configuration
├── layouts/       # Layout components
├── pages/         # Page components
└── routes/        # Router configuration
```

## Deployment

This project is configured for Netlify deployment with client-side routing support via `_redirects` file.

## License

MIT
