# 🔧 Fix CORS Issue - Allow Localhost Access

## The Problem
You're seeing **403 Forbidden** errors because Sanity needs to know which domains can access your data.

## Quick Fix (2 minutes)

### Step 1: Go to Sanity Dashboard
Visit: **https://www.sanity.io/manage/personal/project/7yt3l4pv/api**

### Step 2: Add CORS Origin
1. Scroll to **"CORS Origins"** section
2. Click **"Add CORS origin"**
3. Add these origins:

```
http://localhost:5173
http://localhost:3000
http://localhost:8080
```

4. For each origin:
   - ✅ Check "Allow credentials"
   - Click "Save"

### Step 3: Restart Your Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 4: Hard Refresh Browser
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

---

## Detailed Steps with Screenshots

### 1. Open Sanity Dashboard
Go to: https://www.sanity.io/manage/personal/project/7yt3l4pv

### 2. Navigate to API Settings
- Click on your project "Portfolio"
- Click "API" in the left sidebar
- Scroll down to "CORS Origins"

### 3. Add CORS Origins
Click "Add CORS origin" and add:

**Origin 1:**
```
http://localhost:5173
```
- ✅ Allow credentials: YES
- Click "Save"

**Origin 2:**
```
http://localhost:3000
```
- ✅ Allow credentials: YES
- Click "Save"

**Origin 3:**
```
http://localhost:8080
```
- ✅ Allow credentials: YES
- Click "Save"

### 4. For Production (Later)
When you deploy your portfolio, add your production URL:
```
https://your-portfolio-domain.com
```

---

## Alternative: Use CDN (Already Applied)

I've changed the config back to `useCdn: true`. This means:
- ✅ No CORS issues
- ✅ Fast image delivery
- ⏱️ Content updates take 1-2 minutes to appear (CDN cache)

This is the recommended approach for most cases!

---

## Why This Happened

When you use `useCdn: false`, Sanity requires:
1. CORS configuration for your domain
2. Or an API token for authentication

With `useCdn: true`:
- ✅ No CORS configuration needed
- ✅ Works immediately
- ✅ Faster performance
- ⏱️ Small delay for content updates (1-2 min)

---

## Test It Now

1. **Restart dev server**: `npm run dev`
2. **Hard refresh browser**: `Ctrl+Shift+R`
3. **Check console**: Should see no more 403 errors
4. **Your project should appear!**

---

## Still Not Working?

### Clear Browser Cache
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Check Sanity Studio
1. Go to: https://qspb4984ho4outp0zup8if5u.sanity.studio
2. Verify your project "Bas karo Yaar" is **Published** (not Draft)
3. Check it has:
   - ✅ Title
   - ✅ Category set to "Posters"
   - ✅ Order number (e.g., 1)

### Verify in Console
Open browser console and you should see:
```
Fetched projects: [...]
Active category: "All"
Formatted projects: [...]
```

---

## Quick Reference

**Sanity Dashboard**: https://www.sanity.io/manage/personal/project/7yt3l4pv/api  
**Your Studio**: https://qspb4984ho4outp0zup8if5u.sanity.studio  
**Project ID**: 7yt3l4pv  
**Dataset**: production

---

The CDN approach (now active) should work immediately without CORS configuration! 🎉
