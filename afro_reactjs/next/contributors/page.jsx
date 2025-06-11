'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Palette, Scissors, Brush, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const contributorCategories = [
  {
    title: 'Photographes',
    description: 'Photographes professionnels spécialisés en mode, portrait et événementiel',
    icon: Camera,
    count: '80+',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    href: '/contributors/photographers',
    specialties: ['Portrait', 'Mode', 'Événementiel', 'Commercial']
  },
  {
    title: 'Infographes',
    description: 'Designers graphiques et créateurs visuels pour tous vos besoins',
    icon: Palette,
    count: '45+',
    color: 'bg-gradient-to-br from-purple-500 to-pink-600',
    href: '/contributors/infographes',
    specialties: ['Design Graphique', 'Retouche Photo', 'Branding', 'Web Design']
  },
  {
    title: 'Coiffeurs',
    description: 'Coiffeurs et hair stylists pour shootings et événements',
    icon: Scissors,
    count: '35+',
    color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    href: '/contributors/coiffeurs',
    specialties: ['Coiffure Mode', 'Maquillage', 'Styling', 'Événementiel']
  },
  {
    title: 'Stylistes',
    description: 'Stylistes mode et consultants en image pour tous projets',
    icon: Brush,
    count: '60+',
    color: 'bg-gradient-to-br from-orange-500 to-red-600',
    href: '/contributors/stylistes',
    specialties: ['Mode', 'Editorial', 'Personal Shopping', 'Conseil en Image']
  }
];

export default function ContributorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Contributeurs Créatifs
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Découvrez notre réseau de professionnels créatifs : photographes, infographes, coiffeurs et stylistes
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {contributorCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={category.href}>
                <Card className="h-full cursor-pointer group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <div className={`h-2 ${category.color}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {category.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Spécialités :</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-sm">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium">
                        Découvrir <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Réseau en Chiffres
            </h2>
            <p className="text-gray-600 text-lg">
              Une communauté grandissante de professionnels créatifs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">220+</div>
              <div className="text-gray-600">Contributeurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1,500+</div>
              <div className="text-gray-600">Projets Réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Note Moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Client</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}