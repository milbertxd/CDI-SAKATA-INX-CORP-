# CDI SAKATA INX CORP - Deployment Guide

## 🚀 Deployment Checklist

### ✅ Issues Fixed:
1. ✅ Environment variables configuration
2. ✅ API URL centralization
3. ✅ Backend environment setup
4. ✅ CORS configuration
5. ✅ Database environment variables

### 📋 Pre-Deployment Steps:

#### 1. Install Backend Dependencies
```bash
cd backend
npm install dotenv
```

#### 2. Frontend Build Test
```bash
npm run build
```

#### 3. Update Environment Variables for Production

**Frontend (.env.production):**
```env
VITE_API_URL=https://your-production-api.com
VITE_NODE_ENV=production
```

**Backend (.env.production):**
```env
NODE_ENV=production
PORT=5002
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=your-production-db-name
JWT_SECRET=your-super-secure-production-jwt-secret
CORS_ORIGIN=https://your-production-frontend.com
```

### 🌐 Deployment Options:

#### Frontend Deployment (Choose One):

**Option 1: Vercel (Recommended)**
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically

**Option 2: Netlify**
1. Drag & drop `dist` folder after `npm run build`
2. Set environment variables in site settings

**Option 3: AWS S3 + CloudFront**
1. Upload `dist` folder to S3 bucket
2. Configure CloudFront distribution

#### Backend Deployment (Choose One):

**Option 1: Railway (Recommended)**
1. Connect GitHub repository
2. Add MySQL database addon
3. Set environment variables
4. Deploy automatically

**Option 2: Heroku**
1. Create Heroku app
2. Add ClearDB MySQL addon
3. Set config vars (environment variables)
4. Deploy via Git

**Option 3: DigitalOcean Droplet**
1. Create Ubuntu droplet
2. Install Node.js and MySQL
3. Clone repository and set environment variables
4. Use PM2 for process management

### 🗄️ Database Setup:

#### Required Tables:
- `news` - News articles
- `careers` - Job postings  
- `products` - Product information
- `certificates` - Company certificates
- `admin` - Admin user accounts

#### Database Scripts:
Run the SQL scripts in `/backend/` directory:
- `create-products-table.sql`
- `create-certificates-table.sql`
- Other setup scripts as needed

### 🔧 Configuration Updates Needed:

#### 1. Update API Base URLs:
- All localhost URLs have been replaced with environment variables
- Use `API_ENDPOINTS` from `/src/config/api.ts`

#### 2. CORS Configuration:
- Backend now uses environment-based CORS origins
- Update `CORS_ORIGIN` in backend `.env` file

#### 3. File Upload Configuration:
- Ensure upload directory exists on production server
- Configure proper file permissions

### 🧪 Testing:

#### Local Testing:
```bash
# Frontend
npm run dev

# Backend  
cd backend
npm start
```

#### Production Testing:
```bash
# Build and preview
npm run build
npm run preview
```

### 🔐 Security Considerations:

1. **JWT Secret**: Use strong, unique secret in production
2. **Database Credentials**: Use secure passwords
3. **HTTPS**: Enable SSL certificates for production
4. **Environment Variables**: Never commit `.env` files to version control

### 📊 Monitoring:

1. **Error Logging**: Consider adding error tracking (Sentry)
2. **Performance**: Monitor API response times
3. **Uptime**: Set up uptime monitoring
4. **Database**: Monitor database performance

### 🚀 Ready for Deployment!

The website is now configured with:
- ✅ Environment-based API URLs
- ✅ Production-ready backend configuration
- ✅ Proper CORS setup
- ✅ Database environment variables
- ✅ Build optimization

**Next Steps:**
1. Choose deployment platforms
2. Set up production database
3. Update environment variables with production values
4. Deploy and test!

### 📞 Support:
For deployment assistance, refer to the platform-specific documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Netlify Docs](https://docs.netlify.com)
