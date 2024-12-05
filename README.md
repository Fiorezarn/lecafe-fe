# Le Café
![Lecafe](https://github.com/Fiorezarn/lecafe-fe/blob/main/public/Lecafe-Animated.gif)

Le Cafe is a coffee shop ordering platform that provides two types of services: dine-in and delivery. Our flagship features include
interactive map integration to monitor delivery routes as well as automatic delivery fee calculation based on distance.

## 📋 Table of Contents
- [🎥 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [✨ Features](#-features)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Installation](#-installation)

## 🎥 Demo
https://github.com/user-attachments/assets/13c592eb-c72b-4fff-af9f-33db95cca9b7

Check out the live version of Le Café: 🌐[Le Café Deployment](https://lecafe-fe.vercel.app/)
## 🛠️ Tech Stack
![Lecafe](https://github.com/Fiorezarn/lecafe-fe/blob/main/public/stack.png)
![Open in Visual Studio Code](https://img.shields.io/badge/Open%20in%20VS%20Code-blue?logo=visualstudiocode)

## ✨ Features

| Feature     | Description                                                                                   |
|-------------|-----------------------------------------------------------------------------------------------|
| **🔐 Auth**    | - 📝 Register and login with email or Google.<br>- 🔑 Forgot password functionality.<br>- ✉️ Email verification.<br>- 🍪 "Remember Me" feature. |
| **🛒 Cart**    | - ➕ Add items to the cart.<br>- ➖ Remove items from the cart.<br>- 🔄 Update item quantities in the cart. |
| **📦 Order**   | - 📝 Place orders.<br>- 🕒 Check order status in real-time.<br>- 📄 Download invoices.                |
| **🗺️ Maps**    | - 💰 Calculate shipping fees using the Haversine formula.<br>- 📍 Map-based address selection.<br>- 🚚 Route tracking for deliveries. |
| **💳 Payment** | - 🔗 Integration with Midtrans payment gateway.                                                 |
| **👨‍💼 Admin**   | - ✏️ Full CRUD operations for managing menus.<br>- 👀 Monitor and manage orders.<br>- 📊 View order history and export orders.<br>- 📈 Access a dashboard with analytics. |

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```env
VITE_BASE_URL_BE=your_backend_url
VITE_CLIENT_KEY_MIDTRANS=your_midtrans_client_key
VITE_SNAP_URL_MIDTRANS=your_snap_url_midtrans
VITE_API_KEY_FIREBASE=your_firebase_api_key
VITE_AUTH_DOMAIN_FIREBASE=your_firebase_auth_domain
VITE_PROJECT_ID_FIREBASE=your_firebase_project_id
VITE_STORAGE_BUCKET_FIREBASE=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID_FIREBASE=your_firebase_messaging_sender_id
VITE_APP_ID_FIREBASE=your_firebase_app_id
VITE_GEOCODE_SERVICE_URL=your_geocode_service_url
```
## 🚀 Installation
1. Clone the repository

```bash
git clone https://github.com/Fiorezarn/lecafe-fe
```

2. Install the dependencies

```bash
npm install
```

3. Start the Project

```bash
npm run dev
```

**Notes:**
You can go through this link for the [Backend Configuration](https://github.com/Fiorezarn/lecafe-be)
