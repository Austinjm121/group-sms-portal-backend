# SMS Messaging Application Backend

## Overview
This is a backend application for an SMS messaging platform with Microsoft AD integration.

## Features
- User Authentication (Local & Microsoft AD)
- Group Messaging
- Direct SMS Messaging
- Twilio SMS Integration
- Microsoft Graph Integration

## Prerequisites
- Node.js (v14+)
- MongoDB
- Twilio Account
- Azure AD Application

## Environment Setup
1. Clone the repository
2. Copy `.env.example` to `.env`
3. Fill in required environment variables

## Installation
```bash
npm install
npm run dev  # For development
npm run build  # For production build
npm start  # Run production build
```

## Configuration
- Configure Twilio credentials
- Set up Microsoft AD application
- Configure MongoDB connection

## API Endpoints
- `/api/auth/register`
- `/api/auth/login`
- `/api/messages/direct`
- `/api/messages/group`
- `/api/groups`

## Testing
```bash
npm test
```

## Deployment
- Ensure all environment variables are set
- Use a process manager like PM2
- Set up proper MongoDB connection
- Configure HTTPS

## Security Considerations
- Use strong JWT secrets
- Enable HTTPS
- Implement rate limiting
- Validate and sanitize inputs