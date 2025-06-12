'use client';

import React , { useState, useEffect } from 'react';

import { Camera, Users, Palette } from 'lucide-react';

import MainContent from "../components/MainContent"


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