# 🎬 Movie Explorer App

A modern, feature-rich Movie Explorer application built with Next.js 15, TypeScript, and Tailwind CSS. Browse, search, and save your favorite movies with a beautiful, responsive interface.

## ✨ Features

### 🔐 Authentication
- **Login/Register System** - Secure authentication using NextAuth.js
- **Protected Routes** - Only authenticated users can access movie features
- **Demo Credentials** - `demo@example.com` / `password123`

### 🎬 Movie Browsing
- **Popular Movies** - Browse trending movies from TMDB API
- **Advanced Search** - Real-time movie search functionality
- **Detailed Movie Pages** - Comprehensive movie information including cast, crew, and more
- **Pagination** - Navigate through movie collections efficiently

### ⭐ Favorites Management
- **Add to Favorites** - Save movies to your personal collection
- **Favorites Page** - View all your saved movies in one place
- **Local Storage** - Favorites persist between sessions

### 🎨 User Experience
- **Responsive Design** - Works perfectly on all devices
- **Dark Mode** - Toggle between light and dark themes
- **Loading States** - Smooth loading animations and skeletons
- **Image Optimization** - Next.js Image component for optimal performance

## 🚀 Technology Stack

### Core Framework
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling

### Authentication & Data
- **🔐 NextAuth.js** - Authentication solution
- **🌐 Axios** - HTTP client for API requests
- **🗄️ Local Storage** - Client-side favorites storage

### UI Components
- **🧩 shadcn/ui** - High-quality accessible components
- **🎯 Lucide React** - Beautiful icon library
- **🌈 Next Themes** - Theme management

### API Integration
- **🎬 TMDB API** - Comprehensive movie database
- **🔄 React Query** - Server state management

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- NPM or Yarn
- TMDB API Key (free from [themoviedb.org](https://themoviedb.org))

### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/Shahnawaz4518/Movie-Explorer-App.git
cd Movie-Explorer-App

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
# TMDB API Configuration
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database Configuration
DATABASE_URL="file:./db/custom.db"
```

### 3. Get Your TMDB API Key
1. Visit [TMDB API](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Replace `your_tmdb_api_key_here` with your actual API key

### 4. Run the Application
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage Guide

### Getting Started
1. **Sign Up** - Create a new account or use demo credentials
2. **Browse Movies** - Explore popular movies on the home page
3. **Search** - Use the search bar to find specific movies
4. **View Details** - Click on any movie to see detailed information
5. **Save Favorites** - Click the heart icon to add movies to your favorites

### Demo Account
- **Email**: `demo@example.com`
- **Password**: `password123`

### Features Overview

#### Movie Listing
- Grid layout with movie posters
- Rating and release year display
- Hover effects for better interactivity
- Pagination for navigating through results

#### Search Functionality
- Real-time search as you type
- Search by movie title
- Maintains pagination in search results

#### Movie Details
- High-resolution poster images
- Comprehensive movie information
- Cast, crew, and production details
- Genre tags and runtime

#### Favorites System
- Add/remove movies with one click
- Dedicated favorites page
- Persistent storage using localStorage
- Visual indicators for favorited movies

#### Theme System
- Light/Dark mode toggle
- System theme detection
- Smooth theme transitions
- Consistent styling across themes

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── auth/              # Authentication pages
│   ├── favorites/         # Favorites page
│   ├── movie/             # Movie detail pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── providers.tsx     # Theme and auth providers
├── hooks/                # Custom React hooks
└── lib/                  # Utilities and configurations
    ├── auth.ts           # Authentication configuration
    ├── tmdb.ts           # TMDB API service
    └── utils.ts          # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for interactive elements
- **Background**: Light gray (light mode) / Dark gray (dark mode)
- **Text**: High contrast for readability
- **Accent**: Yellow for star ratings

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Clean, readable font
- **Responsive**: Scales appropriately across devices

### Components
- **Cards**: Consistent padding and shadow
- **Buttons**: Clear visual feedback
- **Forms**: Accessible and user-friendly
- **Navigation**: Intuitive and responsive

## 🔧 Customization

### Adding New Features
1. **New Pages**: Add to the `src/app/` directory
2. **Components**: Create reusable components in `src/components/`
3. **API Integration**: Extend the TMDB service in `src/lib/tmdb.ts`
4. **Styling**: Use Tailwind CSS classes for consistent design

### Styling Customization
- Modify `tailwind.config.ts` for custom themes
- Update CSS variables in `src/app/globals.css`
- Extend shadcn/ui components as needed

### API Configuration
- Add new TMDB endpoints in `src/lib/tmdb.ts`
- Extend movie interfaces for additional data
- Implement caching strategies for better performance

## 🚀 Deployment

### Live Application
The application is deployed and accessible at: [https://movie-explorer-app-ulap.vercel.app/](https://movie-explorer-app-ulap.vercel.app/)

### GitHub Repository
The source code is available at: [https://github.com/Shahnawaz4518/Movie-Explorer-App](https://github.com/Shahnawaz4518/Movie-Explorer-App)

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
- **Netlify**: Works with Next.js static export
- **AWS Amplify**: Full-stack deployment
- **Digital Ocean**: App Platform support

### Environment Variables for Production
```env
NEXT_PUBLIC_TMDB_API_KEY=your_production_tmdb_key
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_production_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- **Movie Trailers** - Embed YouTube trailers
- **Watchlists** - Separate from favorites
- **User Profiles** - Customizable user experience
- **Reviews & Ratings** - User-generated content
- **Social Features** - Share and recommend movies
- **Advanced Filtering** - Filter by genre, year, rating
- **Offline Support** - PWA functionality
- **Multi-language** - Internationalization support

## 🙏 Acknowledgments

- **TMDB** - For providing the amazing movie database API
- **Next.js** - For the excellent React framework
- **shadcn/ui** - For the beautiful component library
- **Tailwind CSS** - For the utility-first CSS framework

---

Built with ❤️ for movie enthusiasts. Enjoy exploring the world of cinema! 🎬✨