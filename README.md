<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Aide Sans Frontières - Humanitarian Aid Dashboard

A comprehensive humanitarian aid platform built with React, TypeScript, and Vite. This application provides a complete dashboard for managing humanitarian projects, accepting donations, and promoting transparency in aid operations.

## 🌍 About

Aide Sans Frontières is an independent humanitarian organization inspired by the work of Médecins Sans Frontières (MSF). Our platform enables cross-border humanitarian assistance initiatives with a focus on transparency, accountability, and effective aid delivery.

## ✨ Key Features

### 📋 Project Management
- View active humanitarian projects across different crisis zones
- Detailed project information including goals, funding progress, and impact metrics
- Real-time updates from field operations
- Dynamic needs assessment and resource tracking

### 💰 Donation System
- Secure one-time and monthly donation processing
- Multiple giving options including general donations and project-specific sponsorships
- Integration with Stripe for secure payment processing
- Patreon integration for ongoing community support

### 🔍 Transparency Hub
- Annual reports and financial statements
- Funding allocation breakdown
- Independent audit certifications
- Open data API for researchers and journalists
- Donation history tracking
- **NEW**: Project impact visualization with interactive charts

### 🤖 AI-Powered Assistance
- Gemini-powered AI chat for answering questions about projects
- Voice input support for accessibility
- Multilingual AI responses based on user's language preference

### 🌐 Multi-language Support
Full localization support for:
- English, French, Spanish, German, Italian
- Portuguese, Russian, Arabic, Simplified Chinese, Traditional Chinese

### 📱 Responsive Design
- Mobile-first approach with touch-friendly interactions
- Image lazy loading for improved performance
- Optimized for all device sizes

## 🚀 Recent Enhancements

### Social Sharing
- Added WhatsApp sharing option alongside Twitter, Facebook, and LinkedIn
- Easy sharing of humanitarian projects to expand awareness

### Performance Improvements
- Implemented image lazy loading using Intersection Observer API
- Enhanced mobile touch interactions for better user experience

### Accessibility Features
- Voice input support for AI chat
- Improved screen reader compatibility
- Better keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: React 19.2 + TypeScript 5.8
- **Build Tool**: Vite 6.2
- **AI Integration**: Google Gemini API (@google/genai v1.29.1)
- **Styling**: Tailwind CSS
- **Internationalization**: Custom multi-language context system
- **State Management**: React Context API
- **Data Visualization**: HTML5 Canvas

## ▶️ Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. Run the app:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000

## 🏗️ Build for Production

```bash
npm run build
```

## 👁️ Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

We welcome contributions to improve humanitarian aid technology. Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions about the platform or humanitarian work, please contact us at:
AthenDrakomin@proton.me

© 2024 Aide Sans Frontières. All Rights Reserved.