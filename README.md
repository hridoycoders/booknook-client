# 📚 BookNook — Online Library Management System

BookNook is a modern online library management platform where users can explore books, manage their personal book collections, borrow books, and track their borrowing history. It provides a smooth and responsive experience with secure authentication and an easy-to-use interface.

## 🌐 Live Website

**Live Demo:** Coming Soon

**Client Repository:** https://github.com/hridoycoders/booknook-client

**Server Repository:** https://github.com/hridoycoders/booknook-server

## ✨ Key Features

- **User Authentication:** Secure user registration and login using Better Auth.
- **Google Authentication:** Sign in with Google.
- **Browse Books:** Explore all available books with category filtering.
- **Book Details:** View detailed information about individual books.
- **Add Books:** Authenticated users can add new books to the library.
- **Manage Books:** Update and delete books added by the logged-in user.
- **Borrow Books:** Borrow available books with a selected return date.
- **Return Books:** Return borrowed books and update availability.
- **My Books:** Manage your own book collection.
- **My Borrows:** View and track your borrowed books.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Dark Mode:** Switch between light and dark themes.
- **Loading & Error Handling:** User-friendly loading states and error feedback.
- **Private Routes:** Protect authenticated pages and preserve access after page reload.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Swiper
- React Hot Toast
- Next Themes

### Authentication & Database
- Better Auth
- MongoDB
- MongoDB Adapter

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- JOSE
- CORS

### Deployment
- Vercel

## 📦 Installation & Setup

### 1. Clone the Client Repository

```bash
git clone https://github.com/hridoycoders/booknook-client.git
```

### 2. Navigate to the Project Directory

```bash
cd booknook-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the environment variables required by your application.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

If Google authentication or Cloudinary is enabled, configure the corresponding credentials using the exact variable names used in your source code.

**Important:** Never commit `.env.local` or expose secret keys in a public repository.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Backend Setup

Clone the server repository separately:

```bash
git clone https://github.com/hridoycoders/booknook-server.git
```

Navigate to the server directory:

```bash
cd booknook-server
```

Install dependencies:

```bash
npm install
```

Configure the server's `.env` file with your MongoDB and authentication environment variables.

Start the development server:

```bash
npm run dev
```

The backend runs locally at:

```text
http://localhost:5000
```

Production API:

```text
https://booknook-server-lib.vercel.app
```

## 📁 Project Structure

```text
booknook-client/
├── public/
├── src/
│   ├── app/
│   │   ├── add-book/
│   │   ├── books/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── my-books/
│   │   └── my-borrows/
│   ├── components/
│   │   ├── books/
│   │   └── home/
│   └── ...
├── .env.local
├── package.json
└── README.md
```

*Note: This is a simplified overview of the project structure.*

## 🔐 Security

- Authentication is handled through Better Auth.
- Protected API routes use token verification.
- Environment variables are used for sensitive credentials.
- Users can manage their own book records.

## 🚀 Deployment

The frontend is designed to be deployed on [Vercel](https://vercel.com/).

The backend is deployed separately on Vercel.

Before production deployment, configure the required environment variables in the Vercel project settings.

## 👨‍💻 Author

**Hridoy Ahmed**

- GitHub: [hridoycoders](https://github.com/hridoycoders)

---

⭐ If you find this project interesting, feel free to explore the repositories and share your feedback.

**BookNook — Your Personal Digital Library.**
