'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Calendar, Camera, Award } from 'lucide-react';
import Image from 'next/image';

const photographers = [
  {
    id: 1,
    name: 'Marc Dubois',
    specialty: 'Portrait & Fashion',
    location: 'Paris, France',
    experience: '8 ans',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    equipment: 'Canon EOS R5, Sony A7R IV',
    languages: ['Français', 'Anglais', 'Allemand'],
    availability: 'Disponible',
    priceRange: '€€€',
    portfolio: 4.8,
    specialties: ['Portrait', 'Mode', 'Beauté']
  },
  {
    id: 2,
    name: 'Thomas Laurent',
    specialty: 'Événementiel & Corporate',
    location: 'Lyon, France',
    experience: '6 ans',
    rating: 4.8,
    reviews: 134,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    equipment: 'Nikon D850, Canon 5D Mark IV',
    languages: ['Français', 'Anglais'],
    availability: 'Occupé',
    priceRange: '€€',
    portfolio: 4.7,
    specialties: ['Événementiel', 'Corporate', 'Reportage']
  },
  {
    id: 3,
    name: 'Sarah Chen',
    specialty: 'Mode & Editorial',
    location: 'Nice, France',
    experience: '5 ans',
    rating: 4.9,
    reviews: 189,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    equipment: 'Fujifilm GFX 100S, Leica SL2',
    languages: ['Français', 'Anglais', 'Mandarin'],
    availability: 'Disponible',
    priceRange: '€€€',
    portfolio: 4.9,
    specialties: ['Mode', 'Editorial', 'Lifestyle']
  },
  {
    id: 4,
    name: 'Antoine Martin',
    specialty: 'Commercial & Produit',
    location: 'Marseille, France',
    experience: '7 ans',
    rating: 4.7,
    reviews: 98,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    equipment: 'Canon EOS R6, Profoto B10',
    languages: ['Français', 'Anglais', 'Espagnol'],
    availability: 'Disponible',
    priceRange: '€€',
    portfolio: 4.6,
    specialties: ['Commercial', 'Produit', 'Architecture']
  }
];

export default function PhotographersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterAvailability, setFilterAvailability] = useState('all');

  const filteredPhotographers = photographers
    .filter(photographer => {
      const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          photographer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAvailability = filterAvailability === 'all' || 
                                 (filterAvailability === 'available' && photographer.availability === 'Disponible') ||
                                 (filterAvailability === 'busy' && photographer.availability === 'Occupé');
      return matchesSearch && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Camera className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Photographes Professionnels
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Découvrez notre sélection de photographes experts en mode, portrait, événementiel et commercial
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom ou spécialité..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Disponibilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="available">Disponibles</SelectItem>
                  <SelectItem value="busy">Occupés</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="experience">Expérience</SelectItem>
                  <SelectItem value="reviews">Avis</SelectItem>
                  <SelectItem value="name">Nom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredPhotographers.length} photographe{filteredPhotographers.length > 1 ? 's' : ''} trouvé{filteredPhotographers.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Photographers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotographers.map((photographer, index) => (
            <motion.div
              key={photographer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={photographer.image}
                    alt={photographer.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={photographer.availability === 'Disponible' ? 'default' : 'secondary'}
                      className={photographer.availability === 'Disponible' ? 'bg-green-500' : 'bg-orange-500'}
                    >
                      {photographer.availability}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-white/90 text-gray-900">
                      {photographer.priceRange}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{photographer.rating}</span>
                      <span className="ml-1 text-sm opacity-75">({photographer.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{photographer.name}</h3>
                      <p className="text-gray-600">{photographer.specialty}</p>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm font-medium text-blue-600">{photographer.portfolio}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {photographer.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {photographer.experience} d'expérience
                    </div>
                    <div className="flex items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      {photographer.equipment}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {photographer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      Langues: {photographer.languages.join(', ')}
                    </p>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Voir le Portfolio
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPhotographers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun photographe trouvé pour ces critères.</p>
          </div>
        )}
      </div>
    </div>
  );
}