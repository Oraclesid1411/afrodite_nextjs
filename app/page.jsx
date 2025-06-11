'use client';

import React , { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '../components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
import { Camera, Users, Palette } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

import MainContent from "../components/MainContent"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useLocation } from 'react-router-dom';

// const categories = [
//   {
//     title: 'Models',
//     description: 'Mannequins, Hôtesses d\'accueil, Vlogueuses',
//     icon: Users,
//     count: '150+',
//     color: 'bg-gradient-to-br from-pink-500 to-purple-600',
//     href: '/models'
//   },
//   {
//     title: 'Photographers',
//     description: 'Professional photographers for all occasions',
//     icon: Camera,
//     count: '80+',
//     color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
//     href: '/contributors/photographers'
//   },
//   {
//     title: 'Stylists',
//     description: 'Fashion stylists and creative directors',
//     icon: Palette,
//     count: '60+',
//     color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
//     href: '/contributors/stylists'
//   }
// ];

// const featuredProfiles = [
//   {
//     name: 'Sophie Laurent',
//     category: 'Model',
//     specialty: 'Fashion & Commercial',
//     image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 4.9
//   },
//   {
//     name: 'Marc Dubois',
//     category: 'Photographer',
//     specialty: 'Portrait & Fashion',
//     image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 4.8
//   },
//   {
//     name: 'Emma Chen',
//     category: 'Stylist',
//     specialty: 'Editorial & Runway',
//     image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 4.9
//   }
// ];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
    {/* test */}
    <MainContent />
    </>
  );
}