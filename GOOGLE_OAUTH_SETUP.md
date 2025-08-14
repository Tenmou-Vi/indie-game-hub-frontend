# 🔐 Google OAuth 2.0 设置指南

本指南将帮助你设置真实的Google OAuth登录，替换当前的demo用户系统。

## 📋 前置要求

1. Google账户
2. Google Cloud Console访问权限
3. 已部署的前端和后端应用

## 🚀 设置步骤

### 步骤 1: 创建Google Cloud项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用Google+ API和Google OAuth2 API

### 步骤 2: 配置OAuth 2.0凭据

1. 在Google Cloud Console中，转到 **"API和服务" > "凭据"**
2. 点击 **"创建凭据" > "OAuth 2.0客户端ID"**
3. 选择应用类型：**"Web应用"**
4. 配置以下设置：

#### 授权重定向URI
```
https://indie-game-hub-2024.uc.r.appspot.com/auth/google/callback
```

#### 授权JavaScript来源
```
https://indie-game-hub-2024.uc.r.appspot.com
```

5. 点击 **"创建"**
6. 记录下 **客户端ID** 和 **客户端密钥**

### 步骤 3: 配置环境变量

#### 前端环境变量 (.env)
```bash
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
REACT_APP_GOOGLE_REDIRECT_URI=https://indie-game-hub-2024.uc.r.appspot.com/auth/google/callback
```

#### 后端环境变量 (.env)
```bash
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://indie-game-hub-2024.uc.r.appspot.com/auth/google/callback
```

### 步骤 4: 部署更新

1. **前端部署**:
   ```bash
   cd indie-game-hub-frontend
   npm run build
   gcloud app deploy
   ```

2. **后端部署**:
   ```bash
   cd indie-game-hub-backend
   gcloud run deploy indie-game-hub-backend \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080
   ```

## 🔧 测试OAuth登录

1. 访问你的应用: https://indie-game-hub-2024.uc.r.appspot.com
2. 点击 "Sign in with Google" 按钮
3. 选择Google账户并授权
4. 验证登录成功

## 🛡️ 安全注意事项

- **永远不要** 在客户端代码中暴露客户端密钥
- 使用HTTPS进行所有OAuth通信
- 定期轮换客户端密钥
- 限制OAuth范围到最小必要权限

## 🐛 常见问题

### 问题: "redirect_uri_mismatch" 错误
**解决方案**: 确保重定向URI完全匹配Google Console中的配置

### 问题: "invalid_client" 错误  
**解决方案**: 检查客户端ID和密钥是否正确

### 问题: CORS错误
**解决方案**: 确保后端CORS配置包含前端域名

## 📚 相关资源

- [Google OAuth 2.0 文档](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 安全最佳实践](https://oauth.net/2/security-best-practices/)

---

完成这些步骤后，你的应用将拥有真实的Google OAuth登录功能！🎉
