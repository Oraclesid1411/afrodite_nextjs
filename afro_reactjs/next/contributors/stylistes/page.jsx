'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Calendar, Palette, Award, Shirt } from 'lucide-react';
import Image from 'next/image';

const stylists = [
  {
    id: 1,
    name: 'Emma Rousseau',
    specialty: 'Mode & Editorial',
    location: 'Paris, France',
    experience: '6 ans',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    brands: ['Chanel', 'Dior', 'Saint Laurent'],
    languages: ['Français', 'Anglais', 'Italien'],
    availability: 'Disponible',
    priceRange: '€€€',
    portfolio: 4.8,
    specialties: ['Editorial', 'Runway', 'Celebrity Styling']
  },
  {
    id: 2,
    name: 'Julien Moreau',
    specialty: 'Personal Shopping & Conseil',
    location: 'Lyon, France',
    experience: '4 ans',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    brands: ['Zara', 'H&M', 'COS', 'Arket'],
    languages: ['Français', 'Anglais'],
    availability: 'Disponible',
    priceRange: '€€',
    portfolio: 4.7,
    specialties: ['Personal Shopping', 'Conseil en Image', 'Garde-robe']
  },
  {
    id: 3,
    name: 'Léa Dubois',
    specialty: 'Styling Commercial',
    location: 'Nice, France',
    experience: '5 ans',
    rating: 4.9,
    reviews: 167,
    image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    brands: ['Nike', 'Adidas', 'Levi\'s', 'Tommy Hilfiger'],
    languages: ['Français', 'Anglais', 'Espagnol'],
    availability: 'Occupée',
    priceRange: '€€€',
    portfolio: 4.9,
    specialties: ['Commercial', 'Sportswear', 'Lifestyle']
  },
  {
    id: 4,
    name: 'Alexandre Martin',
    specialty: 'Styling Homme',
    location: 'Bordeaux, France',
    experience: '7 ans',
    rating: 4.7,
    reviews: 89,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    brands: ['Hugo Boss', 'Armani', 'Ralph Lauren'],
    languages: ['Français', 'Anglais'],
    availability: 'Disponible',
    priceRange: '€€',
    portfolio: 4.6,
    specialties: ['Menswear', 'Business', 'Formal Wear']
  }
];

export default function StylistsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterAvailability, setFilterAvailability] = useState('all');

  const filteredStylists = stylists
    .filter(stylist => {
      const matchesSearch = stylist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stylist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAvailability = filterAvailability === 'all' || 
                                 (filterAvailability === 'available' && stylist.availability === 'Disponible') ||
                                 (filterAvailability === 'busy' && stylist.availability === 'Occupée');
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
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Shirt className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Stylistes Professionnels
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Découvrez notre sélection de stylistes experts en mode, conseil en image et personal shopping
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
            {filteredStylists.length} styliste{filteredStylists.length > 1 ? 's' : ''} trouvé{filteredStylists.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStylists.map((stylist, index) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={stylist.availability === 'Disponible' ? 'default' : 'secondary'}
                      className={stylist.availability === 'Disponible' ? 'bg-green-500' : 'bg-orange-500'}
                    >
                      {stylist.availability}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-white/90 text-gray-900">
                      {stylist.priceRange}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{stylist.rating}</span>
                      <span className="ml-1 text-sm opacity-75">({stylist.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{stylist.name}</h3>
                      <p className="text-gray-600">{stylist.specialty}</p>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-orange-500 mr-1" />
                      <span className="text-sm font-medium text-orange-600">{stylist.portfolio}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {stylist.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {stylist.experience} d'expérience
                    </div>
                    <div className="flex items-center">
                      <Palette className="h-4 w-4 mr-2" />
                      {stylist.brands.slice(0, 2).join(', ')}...
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {stylist.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      Langues: {stylist.languages.join(', ')}
                    </p>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    Voir le Portfolio
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredStylists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun styliste trouvé pour ces critères.</p>
          </div>
        )}
      </div>
    </div>
  );
}