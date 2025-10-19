# 🚀 Quick Deployment Commands Reference

## 📋 COPY-PASTE COMMANDS FOR DEPLOYMENT

### 🔵 STEP 1: VPS Initial Setup
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs build-essential

# Install Nginx
apt install -y nginx

# Install MySQL
apt install -y mysql-server
mysql_secure_installation
```

### 🔵 STEP 2: Setup MySQL Database
```bash
# Login to MySQL
mysql -u root -p

# Then run these SQL commands:
```
```sql
CREATE DATABASE db_news;
CREATE USER 'cdi_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON db_news.* TO 'cdi_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 🔵 STEP 3: Create Application Directory
```bash
mkdir -p /var/www/cdi-sakata
cd /var/www/cdi-sakata
```

### 🔵 STEP 4: Upload Code (Choose One Method)

**Method A - Git:**
```bash
git clone https://github.com/milbertxd/CDI-SAKATA-INX-CORP-.git .
```

**Method B - SCP from local machine:**
```cmd
scp -r "C:\Users\LENOVO\Downloads\CDI Sakata Inx Corp\*" root@YOUR_VPS_IP:/var/www/cdi-sakata/
```

### 🔵 STEP 5: Import Database
```bash
# Upload your database backup, then:
mysql -u cdi_user -p db_news < database_backup.sql
```

### 🔵 STEP 6: Configure Backend
```bash
cd /var/www/cdi-sakata/backend

# Copy and edit production environment
cp .env.production .env
nano .env
```

**Update these values in .env:**
```bash
NODE_ENV=production
PORT=5002
DB_HOST=localhost
DB_USER=cdi_user
DB_PASSWORD=YOUR_STRONG_PASSWORD
DB_NAME=db_news
JWT_SECRET=YOUR_GENERATED_SECRET
CORS_ORIGIN=https://yourdomain.com
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 🔵 STEP 7: Install Backend Dependencies & Start
```bash
cd /var/www/cdi-sakata/backend
npm install --production

# Install PM2
npm install -g pm2

# Start backend
pm2 start server-with-routes.js --name "cdi-backend"
pm2 startup
pm2 save
```

### 🔵 STEP 8: Build Frontend
```bash
cd /var/www/cdi-sakata
npm install
npm run build
```

### 🔵 STEP 9: Configure Nginx
```bash
nano /etc/nginx/sites-available/cdi-sakata
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/cdi-sakata/dist;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

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

    location /uploads {
        alias /var/www/cdi-sakata/backend/public/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable site:**
```bash
ln -s /etc/nginx/sites-available/cdi-sakata /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
systemctl enable nginx
```

### 🔵 STEP 10: Setup SSL Certificate
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**Select option 2 to redirect HTTP to HTTPS**

### 🔵 STEP 11: Configure Firewall
```bash
apt install -y ufw
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

---

## 🛠️ USEFUL MAINTENANCE COMMANDS

### Check Status:
```bash
# Backend status
pm2 status
pm2 logs cdi-backend

# Nginx status
systemctl status nginx
nginx -t

# MySQL status
systemctl status mysql
```

### Restart Services:
```bash
# Restart backend
pm2 restart cdi-backend

# Restart Nginx
systemctl restart nginx

# Restart MySQL
systemctl restart mysql
```

### View Logs:
```bash
# Backend logs (live)
pm2 logs cdi-backend

# Nginx error log
tail -f /var/log/nginx/error.log

# Nginx access log
tail -f /var/log/nginx/access.log
```

### Update Application:
```bash
# Pull latest code
cd /var/www/cdi-sakata
git pull origin main

# Update backend
cd backend
npm install --production
pm2 restart cdi-backend

# Update frontend
cd ..
npm install
npm run build
```

### Database Backup:
```bash
# Backup
mysqldump -u cdi_user -p db_news > backup_$(date +%Y%m%d).sql

# Restore
mysql -u cdi_user -p db_news < backup_20251019.sql
```

### Check Disk Space:
```bash
df -h
du -sh /var/www/cdi-sakata/*
```

### Check Memory Usage:
```bash
free -m
top
htop
```

### Check Ports:
```bash
netstat -tulpn | grep LISTEN
ss -tulpn | grep LISTEN
```

---

## 🔧 TROUBLESHOOTING COMMANDS

### 502 Bad Gateway:
```bash
pm2 status
pm2 restart cdi-backend
pm2 logs cdi-backend --lines 50
```

### Database Connection Error:
```bash
systemctl status mysql
mysql -u cdi_user -p db_news
cat /var/www/cdi-sakata/backend/.env
```

### Nginx Configuration Error:
```bash
nginx -t
cat /etc/nginx/sites-available/cdi-sakata
systemctl status nginx
```

### Permission Issues:
```bash
# Fix uploads folder
chmod -R 755 /var/www/cdi-sakata/backend/public/uploads
chown -R www-data:www-data /var/www/cdi-sakata/backend/public/uploads

# Fix application folder
chown -R www-data:www-data /var/www/cdi-sakata
```

### SSL Certificate Issues:
```bash
certbot certificates
certbot renew --dry-run
systemctl status certbot.timer
```

---

## 📊 MONITORING COMMANDS

### Server Health:
```bash
# CPU and Memory
htop

# Disk usage
df -h
du -sh /var/* | sort -h

# Network connections
netstat -an | grep ESTABLISHED | wc -l
```

### Application Health:
```bash
# Check if backend responds
curl http://localhost:5002/api/news

# Check frontend
curl http://localhost

# Check SSL
curl https://yourdomain.com
```

### PM2 Monitoring:
```bash
# Dashboard
pm2 monit

# List processes with details
pm2 list

# Show process info
pm2 show cdi-backend

# Logs with timestamps
pm2 logs cdi-backend --timestamp
```

---

## 🔒 SECURITY COMMANDS

### Update System:
```bash
apt update
apt list --upgradable
apt upgrade -y
```

### Check Firewall:
```bash
ufw status verbose
ufw app list
```

### Check Failed Login Attempts:
```bash
grep "Failed password" /var/log/auth.log | tail -20
```

### Check Open Ports:
```bash
nmap localhost
ss -tulpn
```

---

## 💾 BACKUP AUTOMATION SCRIPT

**Create backup script:**
```bash
mkdir -p /root/backups
nano /root/backup-db.sh
```

**Paste this:**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
DB_NAME="db_news"
DB_USER="cdi_user"
DB_PASS="YOUR_PASSWORD"

# Backup database
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "db_*.sql" -mtime +7 -delete

echo "Backup completed: db_$DATE.sql"
```

**Make executable and schedule:**
```bash
chmod +x /root/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add this line:
0 2 * * * /root/backup-db.sh >> /var/log/backup.log 2>&1
```

---

## 📝 QUICK TESTS AFTER DEPLOYMENT

```bash
# Test backend API
curl http://localhost:5002/api/news

# Test frontend
curl http://localhost

# Test database
mysql -u cdi_user -p -e "USE db_news; SHOW TABLES;"

# Test Nginx config
nginx -t

# Test PM2
pm2 status

# Test SSL (if configured)
curl -I https://yourdomain.com
```

---

## 🎯 COMMON FIXES

### Fix Port Already in Use:
```bash
lsof -i :5002
kill -9 <PID>
pm2 restart cdi-backend
```

### Fix Nginx Not Starting:
```bash
nginx -t
systemctl status nginx
journalctl -u nginx -n 50
```

### Fix MySQL Not Starting:
```bash
systemctl status mysql
journalctl -u mysql -n 50
```

### Clear PM2 Logs:
```bash
pm2 flush
```

### Reset Nginx:
```bash
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

---

## 📞 EMERGENCY COMMANDS

### If Site is Down:
```bash
pm2 restart all
systemctl restart nginx
systemctl restart mysql
```

### Check All Services:
```bash
systemctl status nginx
systemctl status mysql
pm2 status
ufw status
```

### View Recent Errors:
```bash
tail -100 /var/log/nginx/error.log
pm2 logs cdi-backend --lines 100 --err
journalctl -p err -n 50
```

---

**Keep this file handy during deployment!** 📌

**Pro Tip:** Save frequently used commands to bash aliases for quick access.
