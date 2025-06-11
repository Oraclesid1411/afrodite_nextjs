'use client';

import { Suspense  } from "react";

import { usePathname } from 'next/navigation'; // 👈 pour connaître la route

// import './globals.css';
import '../public/assets/css/new_styles.scss';
import '../public/assets/css/vendor.css';
import '../public/assets/css/style_main-min.css';
import '../public/assets/css/style.scss';
// import { Inter } from 'next/font/google';
// import { ThemeProvider } from 'next-themes';
// import Navigation from '@/components/Navigation';
import Header_menu from '../components/Header_menu';
import FixedMenu from '../components/FixedMenu';
import  AuthProvider  from '../Context/AuthenticateContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); // 👈 récupère la route actuelle

  // 👇 liste des routes sans header/fixed menu
  const isAuthPage = ['/login', '/register', '/forgotpass'].includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
    <title>Afrodites</title>

    <meta name="description" content="Professional platform for managing models, photographers, stylists and creative contributors" />
    {/* <link rel="stylesheet" href="/assets/css/vendor.css"/>     
    <link rel="stylesheet" href="/assets/css/style_main-min.css"/> 
    <link rel="stylesheet" href="/assets/css/style-min.scss"/>   
    <link rel="stylesheet" href="/assets/css/new_styles-min.scss"/>    
    <link rel="stylesheet" href="/assets/css/admin.scss"/>    */}
     <link rel="preconnect" href="https://fonts.googleapis.com/" />
     <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="true" />
     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap" rel="preload" />
    
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"/>
    
      </head>
      <body>
      <AuthProvider>
      <div id="root">
      {!isAuthPage && <Header_menu />}
           <main>
      

               <ToastContainer className="toast_style"/>
               <Suspense fallback={<div>Chargement...</div>}>

                    {children}

              </Suspense>
          
         
            </main>
            {!isAuthPage && <FixedMenu />}
      {/* <MainContent /> */}
 
         
       
        
        </div>
        </AuthProvider>

          <script src="/assets/js/vendor-min.js"></script>
          <script src="/assets/js/main-min.js"></script>
     
      </body>
    </html>
  );
}