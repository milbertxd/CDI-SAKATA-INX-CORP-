# 📤 GitHub Push Guide

## 🎯 How to Push Your Code to GitHub

Your repository: **milbertxd/CDI-SAKATA-INX-CORP-**

---

## ✅ **STEP 1: Check Git Status**

Open Command Prompt in your project folder:

```cmd
cd "C:\Users\LENOVO\Downloads\CDI Sakata Inx Corp"
git status
```

This shows which files have changed.

---

## ✅ **STEP 2: Stage All Changes**

Add all modified and new files:

```cmd
git add .
```

**Or** add specific files:
```cmd
git add backend/server-with-routes.js
git add src/config/api.ts
git add .gitignore
```

---

## ✅ **STEP 3: Check What Will Be Committed**

```cmd
git status
```

You should see:
- Files in green = Will be committed ✅
- Files in red = Not staged yet ⚠️

**Important:** Make sure `.env` with real credentials is NOT listed!

---

## ✅ **STEP 4: Commit Your Changes**

```cmd
git commit -m "Fix backend CORS configuration and prepare for production deployment"
```

**Or** use a more detailed message:
```cmd
git commit -m "Production ready: Fix CORS, add environment configs, and deployment guides"
```

---

## ✅ **STEP 5: Push to GitHub**

```cmd
git push origin main
```

**If this is your first push or you get an error, try:**
```cmd
git push -u origin main
```

**If you need to force push (use carefully!):**
```cmd
git push -f origin main
```

---

## 🔐 **AUTHENTICATION**

If GitHub asks for credentials:

### **Option A: Personal Access Token (Recommended)**

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "CDI Project"
4. Select scopes: ✅ `repo` (all)
5. Generate token and **COPY IT** (you won't see it again!)
6. Use as password when pushing

### **Option B: GitHub Desktop**
1. Download GitHub Desktop
2. Sign in
3. Add repository
4. Commit and push from GUI

### **Option C: SSH Key**
```cmd
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
type %USERPROFILE%\.ssh\id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

Then use SSH URL:
```cmd
git remote set-url origin git@github.com:milbertxd/CDI-SAKATA-INX-CORP-.git
git push origin main
```

---

## 📋 **BEFORE YOU PUSH - SECURITY CHECKLIST**

### ❌ **NEVER Push These Files:**
- `.env` with real database passwords
- `node_modules/` folder
- `dist/` build folder
- Database backup files with real data
- Any file with sensitive credentials

### ✅ **Safe to Push:**
- `.env.production` (template with placeholders)
- `.env.development` (template)
- Source code files
- Documentation files
- `.gitignore`

### 🔍 **Check Before Pushing:**

```cmd
git status
```

**Look for:**
- ❌ backend/.env (real credentials)
- ✅ backend/.env.production (template)
- ❌ node_modules/
- ❌ dist/

If you see sensitive files, remove them:
```cmd
git reset HEAD backend/.env
git restore backend/.env
```

---

## 🛠️ **COMMON ISSUES & FIXES**

### Issue 1: "Authentication Failed"

**Fix:** Use Personal Access Token instead of password
1. Generate token on GitHub
2. Use token as password when pushing

### Issue 2: "Permission Denied"

**Fix:** Check you're logged into correct GitHub account
```cmd
git config user.name
git config user.email
```

Set correct credentials:
```cmd
git config user.name "milbertxd"
git config user.email "your_email@example.com"
```

### Issue 3: "Repository Not Found"

**Fix:** Check remote URL
```cmd
git remote -v
```

Should show:
```
origin  https://github.com/milbertxd/CDI-SAKATA-INX-CORP-.git (fetch)
origin  https://github.com/milbertxd/CDI-SAKATA-INX-CORP-.git (push)
```

If wrong, update:
```cmd
git remote set-url origin https://github.com/milbertxd/CDI-SAKATA-INX-CORP-.git
```

### Issue 4: "Rejected - Non-Fast-Forward"

**Fix:** Pull first, then push
```cmd
git pull origin main --rebase
git push origin main
```

**Or** force push (only if you're sure):
```cmd
git push -f origin main
```

### Issue 5: "Large Files"

**Fix:** GitHub has 100MB file limit
```cmd
# Find large files
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print substr($0,6)}' | sort -n -k 2

# Remove from staging
git rm --cached path/to/large/file
```

---

## 📦 **RECOMMENDED: Create .gitattributes**

To handle line endings properly:

```cmd
echo * text=auto > .gitattributes
echo *.jpg binary >> .gitattributes
echo *.png binary >> .gitattributes
echo *.pdf binary >> .gitattributes
git add .gitattributes
git commit -m "Add gitattributes for line endings"
```

---

## 🚀 **COMPLETE PUSH WORKFLOW**

### **Full Command Sequence:**

```cmd
# 1. Navigate to project
cd "C:\Users\LENOVO\Downloads\CDI Sakata Inx Corp"

# 2. Check status
git status

# 3. Add all changes
git add .

# 4. Verify staging
git status

# 5. Commit with message
git commit -m "Production ready: Updated CORS, environment configs, and deployment guides"

# 6. Push to GitHub
git push origin main

# 7. Verify on GitHub
# Visit: https://github.com/milbertxd/CDI-SAKATA-INX-CORP-
```

---

## 📝 **GOOD COMMIT MESSAGE EXAMPLES**

```cmd
# Feature
git commit -m "Add production deployment guides and configuration"

# Fix
git commit -m "Fix backend CORS configuration for port 8080"

# Update
git commit -m "Update environment variable handling for production"

# Multiple changes
git commit -m "Prepare for production deployment

- Fix hardcoded localhost URLs
- Add environment variable configuration
- Create comprehensive deployment guides
- Update CORS settings for development"
```

---

## 🔄 **SYNCING WITH GITHUB**

### **Pull Latest Changes:**
```cmd
git pull origin main
```

### **Check Remote Status:**
```cmd
git fetch
git status
```

### **View Commit History:**
```cmd
git log --oneline
```

### **Undo Last Commit (before push):**
```cmd
git reset --soft HEAD~1
```

---

## 🌿 **BRANCHING (Optional)**

Create a new branch for features:

```cmd
# Create and switch to new branch
git checkout -b feature/deployment-setup

# Make changes, commit
git add .
git commit -m "Add deployment configuration"

# Push branch to GitHub
git push origin feature/deployment-setup

# Switch back to main
git checkout main

# Merge branch
git merge feature/deployment-setup
```

---

## 📊 **VERIFY PUSH SUCCESS**

After pushing:

1. Go to: https://github.com/milbertxd/CDI-SAKATA-INX-CORP-
2. Check latest commit appears
3. Verify files are updated
4. Check no sensitive files are visible

---

## 🎯 **QUICK REFERENCE**

| Command | Purpose |
|---------|---------|
| `git status` | See what changed |
| `git add .` | Stage all changes |
| `git add <file>` | Stage specific file |
| `git commit -m "message"` | Commit changes |
| `git push origin main` | Push to GitHub |
| `git pull origin main` | Get latest from GitHub |
| `git log` | View history |
| `git diff` | See changes |

---

## ⚠️ **IMPORTANT REMINDERS**

1. ✅ Always check `git status` before committing
2. ✅ Never push `.env` files with real credentials
3. ✅ Write meaningful commit messages
4. ✅ Pull before push if working with others
5. ✅ Verify push on GitHub after pushing

---

## 🆘 **EMERGENCY: Pushed Sensitive Data?**

If you accidentally pushed passwords/secrets:

```cmd
# 1. Remove file from Git history
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch backend/.env" --prune-empty --tag-name-filter cat -- --all

# 2. Force push
git push origin --force --all

# 3. IMMEDIATELY change all passwords/secrets in the file
# 4. Consider the old credentials compromised
```

**Better:** Rotate all credentials immediately!

---

**Ready to push? Follow STEP 1-5 above! 🚀**
