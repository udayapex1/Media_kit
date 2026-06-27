# Dynamic Creator Media Kit & Rate Card Builder

A full-stack web app for creators to build a live, shareable media kit and rate card. The editor uses a split-screen workspace: form controls on the left and a responsive public preview on the right. Changes autosave to PostgreSQL and can be viewed through a public `/kit/:username` route.

## Screenshots

| Editor (Split-screen) | Public Media Kit |
|---|---|
| ![Editor view](https://res.cloudinary.com/dwemivxbp/image/upload/v1782544628/Screenshot_from_2026-06-27_12-42-41_nvumhf.png) | ![Public kit view](https://res.cloudinary.com/dwemivxbp/image/upload/v1782544616/Screenshot_from_2026-06-27_12-43-34_uyyy49.png) |

## Features

- Split-screen media kit editor with live preview
- Debounced autosave for creator profile, metrics, and rate cards
- Public media kit viewer at `/kit/[username]`
- Profile photo upload through Cloudinary
- Dynamic audience metrics and commercial rate cards
- Theme accent color picker
- PDF export for saved kits
- Currency conversion for public rate cards
- Skeleton loading states and dark SaaS UI styling
- Server health endpoint at `/health`

## Tech Stack

**Frontend**

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Dropzone
- Lucide React

**Backend**

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- Zod validation
- Multer
- Cloudinary
- PDFKit

## Project Structure

```text
.
├── client/          # Next.js frontend
└── server/          # Express API server
```

## Local Setup

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Create environment files.

`server/.env`:

```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/media_kit
CLIENT_ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

`client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Run the backend:

```bash
cd server
npm run dev
```

Run the frontend:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:3000/edit
```

## Backend API

- `GET /health` - Health check
- `POST /api/kit/save` - Create or update a creator kit
- `GET /api/kit/:username` - Fetch a public creator kit
- `POST /api/kit/:username/export-pdf` - Export a saved kit as PDF
- `POST /api/upload/image` - Upload a profile image
- `GET /api/currency/convert` - Convert a rate card price between currencies

## Build

Frontend:

```bash
cd client
npm run build
```

Backend:

```bash
cd server
npm run build
```

Production backend start:

```bash
cd server
npm run start
```