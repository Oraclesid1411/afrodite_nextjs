'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Star, MapPin, Calendar, Users } from 'lucide-react';
import Image from 'next/image';

const models = [
  {
    id: 1,
    name: 'Sophie Laurent',
    category: 'mannequin',
    specialty: 'Fashion & Commercial',
    location: 'Paris, France',
    experience: '5 ans',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    height: '175 cm',
    languages: ['Français', 'Anglais', 'Espagnol'],
    availability: 'Disponible'
  },
  {
    id: 2,
    name: 'Camille Dubois',
    category: 'hotesse',
    specialty: 'Événementiel & Corporate',
    location: 'Lyon, France',
    experience: '3 ans',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    height: '168 cm',
    languages: ['Français', 'Anglais'],
    availability: 'Occupée'
  },
  {
    id: 3,
    name: 'Emma Chen',
    category: 'vlogueuse',
    specialty: 'Beauty & Lifestyle',
    location: 'Nice, France',
    experience: '4 ans',
    rating: 4.9,
    reviews: 203,
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    height: '162 cm',
    languages: ['Français', 'Anglais', 'Mandarin'],
    availability: 'Disponible'
  },
  {
    id: 4,
    name: 'Léa Martin',
    category: 'mannequin',
    specialty: 'Haute Couture',
    location: 'Paris, France',
    experience: '7 ans',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    height: '180 cm',
    languages: ['Français', 'Anglais', 'Italien'],
    availability: 'Disponible'
  },
  {
    id: 5,
    name: 'Julie Moreau',
    category: 'hotesse',
    specialty: 'Salons & Congrès',
    location: 'Marseille, France',
    experience: '2 ans',
    rating: 4.7,
    reviews: 67,
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
    height: '170 cm',
    languages: ['Français', 'Anglais'],
    availability: 'Disponible'
  },
  {
    id: 6,
    name: 'Chloé Bernard',
    category: 'vlogueuse',
    specialty: 'Fashion & Travel',
    location: 'Bordeaux, France',
    experience: '3 ans',
    rating: 4.8,
    reviews: 134,
    image: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=400',
    height: '165 cm',
    languages: ['Français', 'Anglais'],
    availability: 'Disponible'
  }
];

const categoryLabels = {
  all: 'Tous les Modèles',
  mannequin: 'Mannequins',
  hotesse: 'Hôtesses d\'Accueil',
  vlogueuse: 'Vlogueuses'
};

export default function ModelsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredModels = models
    .filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          model.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
      return matchesSearch && matchesCategory;
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
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Modèles Professionnels
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Découvrez notre sélection de mannequins, hôtesses d'accueil et vlogueuses professionnelles
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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="mannequin">Mannequins</SelectItem>
                  <SelectItem value="hotesse">Hôtesses d'Accueil</SelectItem>
                  <SelectItem value="vlogueuse">Vlogueuses</SelectItem>
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

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="all">Tous ({models.length})</TabsTrigger>
            <TabsTrigger value="mannequin">
              Mannequins ({models.filter(m => m.category === 'mannequin').length})
            </TabsTrigger>
            <TabsTrigger value="hotesse">
              Hôtesses ({models.filter(m => m.category === 'hotesse').length})
            </TabsTrigger>
            <TabsTrigger value="vlogueuse">
              Vlogueuses ({models.filter(m => m.category === 'vlogueuse').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredModels.length} résultat{filteredModels.length > 1 ? 's' : ''} trouvé{filteredModels.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={model.availability === 'Disponible' ? 'default' : 'secondary'}
                      className={model.availability === 'Disponible' ? 'bg-green-500' : 'bg-orange-500'}
                    >
                      {model.availability}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{model.rating}</span>
                      <span className="ml-1 text-sm opacity-75">({model.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{model.name}</h3>
                      <Badge variant="outline" className="capitalize">
                        {categoryLabels[model.category]}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{model.specialty}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {model.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {model.experience} d'expérience
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {model.height} • {model.languages.join(', ')}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Voir le Profil
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun modèle trouvé pour ces critères.</p>
          </div>
        )}
      </div>
    </div>
  );
}