# 🚀 Complete VPS Deployment Guide for Hostinger

## 📋 Pre-Deployment Checklist

### ✅ Code Ready for Launch - Status Report

**FIXED ISSUES:**
- ✅ Hardcoded localhost URLs replaced with dynamic API configuration
- ✅ Database credentials moved to environment variables
- ✅ JWT secret configured via environment variables
- ✅ CORS properly configured for production
- ✅ Console.log statements wrapped in development checks

**REMAINING TASKS:**
- ⚠️ Update `.env.production` files with actual production values
- ⚠️ Test build process locally
- ⚠️ Prepare database backup/migration scripts

---

## 🎯 Step-by-Step Deployment Process

### **PART 1: Prepare Your Local Environment**

#### 1.1 Update Production Environment Variables

**Frontend (.env.production):**
```bash
# Replace with your actual domain
VITE_API_URL=https://yourdomain.com
VITE_NODE_ENV=production
```

**Backend (backend/.env.production):**
```bash
NODE_ENV=production
PORT=5002

# Database credentials
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_strong_password
DB_NAME=db_news

# Generate strong JWT secret (run this command):
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_generated_secret_here

# Your frontend URL
CORS_ORIGIN=https://yourdomain.com
```

#### 1.2 Build Frontend Locally (Test Build)

```cmd
npm run build
```

This creates a `dist` folder with optimized production files.

#### 1.3 Export Database

```cmd
cd backend
mysqldump -u root -p db_news > database_backup.sql
```

---

### **PART 2: VPS Setup (Hostinger)**

#### 2.1 Access Your VPS

1. **Login to Hostinger Panel:**
   - Go to hpanel.hostinger.com
   - Navigate to VPS section
   - Note your VPS IP address

2. **SSH Access:**
   ```bash
   ssh root@your_vps_ip
   ```
   (Enter password from Hostinger email)

#### 2.2 Initial Server Setup

```bash
# Update system packages
apt update && apt upgrade -y

# Install Node.js (v20 LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
node --version
npm --version

# Install build essentials
apt install -y build-essential

# Install Nginx (web server)
apt install -y nginx

# Install MySQL
apt install -y mysql-server

# Secure MySQL installation
mysql_secure_installation
```

**MySQL Security Prompts:**
- Set root password: **YES** (choose strong password)
- Remove anonymous users: **YES**
- Disallow root login remotely: **YES**
- Remove test database: **YES**
- Reload privilege tables: **YES**

#### 2.3 Create MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Inside MySQL prompt:
CREATE DATABASE db_news;
CREATE USER 'cdi_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON db_news.* TO 'cdi_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

### **PART 3: Upload Your Application**

#### 3.1 Create Application Directory

```bash
# Create directory for your app
mkdir -p /var/www/cdi-sakata
cd /var/www/cdi-sakata
```

#### 3.2 Upload Files (Choose one method)

**Method A: Using Git (Recommended)**
```bash
# Install git if not available
apt install -y git

# Clone your repository
git clone https://github.com/milbertxd/CDI-SAKATA-INX-CORP-.git .

# If repository is private, you'll need to authenticate
```

**Method B: Using FileZilla/SFTP**
1. Download FileZilla Client
2. Connect with:
   - Host: `sftp://your_vps_ip`
   - Username: `root`
   - Password: Your VPS password
   - Port: `22`
3. Upload entire project to `/var/www/cdi-sakata`

**Method C: Using SCP from Local Machine**
```cmd
# From your local project directory
scp -r "C:\Users\LENOVO\Downloads\CDI Sakata Inx Corp\*" root@your_vps_ip:/var/www/cdi-sakata/
```

#### 3.3 Import Database

```bash
# Upload your database backup to VPS, then:
mysql -u cdi_user -p db_news < database_backup.sql
```

---

### **PART 4: Configure Backend**

#### 4.1 Setup Backend Environment

```bash
cd /var/www/cdi-sakata/backend

# Copy production environment file
cp .env.production .env

# Edit with production values
nano .env
```

Update the `.env` file:
```bash
NODE_ENV=production
PORT=5002
DB_HOST=localhost
DB_USER=cdi_user
DB_PASSWORD=your_strong_password
DB_NAME=db_news
JWT_SECRET=your_generated_secret_here
CORS_ORIGIN=https://yourdomain.com
```

Save: `Ctrl+O`, Enter, `Ctrl+X`

#### 4.2 Install Backend Dependencies

```bash
npm install --production
```

#### 4.3 Setup PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start your backend server
pm2 start server-with-routes.js --name "cdi-backend"

# Setup PM2 to start on system reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs cdi-backend
```

---

### **PART 5: Configure Frontend**

#### 5.1 Build Frontend on VPS

```bash
cd /var/www/cdi-sakata

# Install dependencies
npm install

# Build for production
npm run build
```

This creates `/var/www/cdi-sakata/dist` with production files.

---

### **PART 6: Configure Nginx**

#### 6.1 Create Nginx Configuration

```bash
nano /etc/nginx/sites-available/cdi-sakata
```

**Nginx Configuration:**
```nginx
# Frontend (Port 80)
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/cdi-sakata/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API Proxy to Backend
    location /api {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads folder
    location /uploads {
        alias /var/www/cdi-sakata/backend/public/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Save and exit.

#### 6.2 Enable Site and Restart Nginx

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/cdi-sakata /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# If test passes, restart Nginx
systemctl restart nginx

# Enable Nginx to start on boot
systemctl enable nginx
```

---

### **PART 7: Configure Domain DNS**

#### 7.1 Point Domain to VPS

**In Hostinger Domain Panel:**
1. Go to Domains → Manage
2. Click DNS / Nameservers
3. Add/Update these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | your_vps_ip | 14400 |
| A | www | your_vps_ip | 14400 |

**Wait 15 minutes - 48 hours for DNS propagation.**

---

### **PART 8: Setup SSL Certificate (HTTPS)**

#### 8.1 Install Certbot

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Generate SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**Certbot Prompts:**
- Email: your@email.com
- Terms: Agree (A)
- Share email: Your choice (Y/N)
- Redirect HTTP to HTTPS: **Yes (2)**

#### 8.2 Auto-Renewal Setup

```bash
# Test renewal
certbot renew --dry-run

# Renewal happens automatically via cron
```

#### 8.3 Update Backend .env

```bash
nano /var/www/cdi-sakata/backend/.env
```

Change:
```bash
CORS_ORIGIN=https://yourdomain.com
```

Restart backend:
```bash
pm2 restart cdi-backend
```

---

### **PART 9: Configure Firewall**

```bash
# Install UFW
apt install -y ufw

# Allow SSH (IMPORTANT!)
ufw allow 22/tcp

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable

# Check status
ufw status
```

---

### **PART 10: Final Checks**

#### 10.1 Test Your Website

Visit: `https://yourdomain.com`

**Test these pages:**
- ✅ Home page loads
- ✅ Products page shows data
- ✅ News page works
- ✅ Contact form submits
- ✅ Admin login at /admin/login
- ✅ Images load correctly

#### 10.2 Check Backend

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs cdi-backend

# Check Nginx status
systemctl status nginx

# Check MySQL
systemctl status mysql
```

#### 10.3 Monitor Logs

```bash
# Backend logs
pm2 logs cdi-backend --lines 100

# Nginx error log
tail -f /var/log/nginx/error.log

# Nginx access log
tail -f /var/log/nginx/access.log
```

---

## 🔧 Common Issues & Solutions

### Issue 1: 502 Bad Gateway
**Cause:** Backend not running
**Solution:**
```bash
pm2 restart cdi-backend
pm2 logs cdi-backend
```

### Issue 2: Database Connection Failed
**Cause:** Wrong credentials or MySQL not running
**Solution:**
```bash
systemctl status mysql
nano /var/www/cdi-sakata/backend/.env
# Verify DB credentials
pm2 restart cdi-backend
```

### Issue 3: Images Not Loading
**Cause:** Wrong nginx configuration or permissions
**Solution:**
```bash
# Check permissions
chmod -R 755 /var/www/cdi-sakata/backend/public/uploads
chown -R www-data:www-data /var/www/cdi-sakata/backend/public/uploads

# Restart nginx
systemctl restart nginx
```

### Issue 4: CORS Error
**Cause:** Wrong CORS_ORIGIN in backend
**Solution:**
```bash
nano /var/www/cdi-sakata/backend/.env
# Set: CORS_ORIGIN=https://yourdomain.com
pm2 restart cdi-backend
```

---

## 🔄 Future Updates

### Update Frontend:
```bash
cd /var/www/cdi-sakata
git pull origin main
npm install
npm run build
```

### Update Backend:
```bash
cd /var/www/cdi-sakata/backend
git pull origin main
npm install --production
pm2 restart cdi-backend
```

---

## 📊 Performance Optimization

### Enable MySQL Query Cache:
```bash
nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Add:
```ini
[mysqld]
query_cache_type = 1
query_cache_size = 16M
```

Restart:
```bash
systemctl restart mysql
```

### Setup Nginx Caching:
```nginx
# Add to nginx config
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m;

# In location /api block:
proxy_cache api_cache;
proxy_cache_valid 200 10m;
```

---

## 🔒 Security Best Practices

1. **Change SSH Port:**
```bash
nano /etc/ssh/sshd_config
# Change Port 22 to Port 2222
systemctl restart sshd
ufw allow 2222/tcp
```

2. **Disable Root SSH Login:**
```bash
nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
```

3. **Regular Updates:**
```bash
apt update && apt upgrade -y
```

4. **Backup Database Daily:**
```bash
# Create backup script
nano /root/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u cdi_user -p'your_password' db_news > /root/backups/db_$DATE.sql
find /root/backups/ -name "db_*.sql" -mtime +7 -delete
```

```bash
chmod +x /root/backup-db.sh
crontab -e
# Add: 0 2 * * * /root/backup-db.sh
```

---

## 📞 Support

**Need help?**
- Hostinger Support: 24/7 Live Chat
- Check PM2 logs: `pm2 logs`
- Check Nginx logs: `tail -f /var/log/nginx/error.log`

---

## ✅ Deployment Complete!

Your website is now live at: `https://yourdomain.com`

**Next Steps:**
1. Set up Google Analytics
2. Configure email notifications
3. Setup monitoring (Uptime Robot)
4. Schedule regular backups

🎉 **Congratulations on your deployment!**
