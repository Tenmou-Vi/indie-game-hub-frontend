# 🔐 Google OAuth 环境变量配置

## 📝 需要配置的环境变量

### 前端环境变量 (.env.local)
在 `indie-game-hub-frontend` 目录下创建 `.env.local` 文件：

```bash
# Google OAuth 2.0 Configuration
REACT_APP_GOOGLE_CLIENT_ID=你的Google客户端ID
REACT_APP_GOOGLE_REDIRECT_URI=https://indie-game-hub-2024.uc.r.appspot.com/auth/google/callback

# Backend API URL
REACT_APP_API_URL=https://indie-game-hub-backend-346389979835.us-central1.run.app
```

### 后端环境变量 (.env)
在 `indie-game-hub-backend` 目录下创建 `.env` 文件：

```bash
# Google OAuth 2.0 Configuration
GOOGLE_CLIENT_ID=你的Google客户端ID
GOOGLE_CLIENT_SECRET=你的Google客户端密钥
GOOGLE_REDIRECT_URI=https://indie-game-hub-2024.uc.r.appspot.com/auth/google/callback

# Server Configuration
PORT=8080
NODE_ENV=production
```

## 🚀 配置完成后重新部署

### 1. 重新构建前端
```bash
cd indie-game-hub-frontend
npm run build
```

### 2. 重新部署前端
```bash
gcloud app deploy --quiet
```

### 3. 重新部署后端
```bash
cd ../indie-game-hub-backend
gcloud run deploy indie-game-hub-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## ⚠️ 重要提醒

- **永远不要** 将 `.env` 文件提交到GitHub
- **客户端密钥** 只存在于后端，前端只需要客户端ID
- 确保重定向URI完全匹配Google Console中的配置
- 环境变量更改后需要重新部署应用

## 🔍 验证配置

配置完成后，访问你的应用：
https://indie-game-hub-2024.uc.r.appspot.com

点击 "Sign in with Google" 按钮，应该能正常打开Google登录弹窗，不再出现 "invalid_client" 错误。


## 📝 需要配置的环境变量

### 前端环境变量 (.env.local)
在 `indie-game-hub-frontend` 目录下创建 `.env.local` 文件：

```bash
# Google OAuth 2.0 Configuration
REACT_APP_GOOGLE_CLIENT_ID=你的Google客户端ID
REACT_APP_GOOGLE_REDIRECT_URI=https://indie-game-hub-2024.uc.r.appspot.com/auth/google/callback

# Backend API URL
REACT_APP_API_URL=https://indie-game-hub-backend-346389979835.us-central1.run.app
```

### 后端环境变量 (.env)
在 `indie-game-hub-backend` 目录下创建 `.env` 文件：

```bash
# Google OAuth 2.0 Configuration
GOOGLE_CLIENT_ID=你的Google客户端ID
GOOGLE_CLIENT_SECRET=你的Google客户端密钥
GOOGLE_REDIRECT_URI=https://indie-game-hub-2024.uc.r.appspot.com/auth/google/callback

# Server Configuration
PORT=8080
NODE_ENV=production
```

## 🚀 配置完成后重新部署

### 1. 重新构建前端
```bash
cd indie-game-hub-frontend
npm run build
```

### 2. 重新部署前端
```bash
gcloud app deploy --quiet
```

### 3. 重新部署后端
```bash
cd ../indie-game-hub-backend
gcloud run deploy indie-game-hub-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## ⚠️ 重要提醒

- **永远不要** 将 `.env` 文件提交到GitHub
- **客户端密钥** 只存在于后端，前端只需要客户端ID
- 确保重定向URI完全匹配Google Console中的配置
- 环境变量更改后需要重新部署应用

## 🔍 验证配置

配置完成后，访问你的应用：
https://indie-game-hub-2024.uc.r.appspot.com

点击 "Sign in with Google" 按钮，应该能正常打开Google登录弹窗，不再出现 "invalid_client" 错误。
