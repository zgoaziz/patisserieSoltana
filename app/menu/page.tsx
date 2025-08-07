"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Filter, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data"

export default function MenuPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Synchroniser la catégorie de l'URL au chargement
  useEffect(() => {
    if (categoryFromUrl && ["Traditionnelle", "Moderne", "Orientale"].includes(categoryFromUrl)) {
      setSelectedCategories([categoryFromUrl]);
    }
  }, [categoryFromUrl]);

  // All available categories and ingredients for filters
  const categories = ["Traditionnelle", "Moderne", "Orientale", "Chocolat", "Fruits"]
  const ingredients = ["Amandes", "Pistaches", "Miel", "Chocolat", "Dattes", "Fleur d'oranger"]

  // Apply filters
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Category filter
      let matchesCategory = true;
      if (selectedCategories.length === 1) {
        // Si une seule catégorie sélectionnée, on veut un match exact
        matchesCategory = product.categories.length === 1 && product.categories[0] === selectedCategories[0];
      } else if (selectedCategories.length > 1) {
        matchesCategory = selectedCategories.some((cat) => product.categories.includes(cat));
      }

      // Ingredient filter
      const matchesIngredient =
        selectedIngredients.length === 0 || selectedIngredients.some((ing) => product.ingredients.includes(ing))

      return matchesSearch && matchesPrice && matchesCategory && matchesIngredient
    })

    setFilteredProducts(filtered)
  }, [searchQuery, priceRange, selectedCategories, selectedIngredients])

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((i) => i !== ingredient) : [...prev, ingredient],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 50])
    setSelectedCategories([])
    setSelectedIngredients([])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Filter sidebar content
  const FilterContent = () => (
    <div className="py-4 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-secondary">Filtres</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-primary">
          Réinitialiser
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="price" className="w-full">
        {/* Price Range Filter */}
        <AccordionItem value="price" className="border-b border-primary/20">
          <AccordionTrigger className="text-secondary hover:text-primary py-3">Prix (dt)</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 py-2">
              <Slider
                defaultValue={[0, 50]}
                max={50}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2 h-2 rounded-full bg-[#d4b483]"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{priceRange[0]}dt</span>
                <span>{priceRange[1]}dt</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Categories Filter */}
        <AccordionItem value="categories" className="border-b border-primary/20">
          <AccordionTrigger className="text-secondary hover:text-primary py-3">Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                    className="border-[#d4b483] data-[state=checked]:bg-[#d4b483] data-[state=checked]:text-white focus:ring-[#d4b483]"
                  />
                  <Label htmlFor={`category-${category}`} className="ml-2 cursor-pointer text-secondary">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Ingredients Filter */}
        <AccordionItem value="ingredients" className="border-b border-primary/20">
          <AccordionTrigger className="text-secondary hover:text-primary py-3">Ingrédients</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              {ingredients.map((ingredient) => (
                <div key={ingredient} className="flex items-center">
                  <Checkbox
                    id={`ingredient-${ingredient}`}
                    checked={selectedIngredients.includes(ingredient)}
                    onCheckedChange={() => toggleIngredient(ingredient)}
                    className="border-[#d4b483] data-[state=checked]:bg-[#d4b483] data-[state=checked]:text-white focus:ring-[#d4b483]"
                  />
                  <Label htmlFor={`ingredient-${ingredient}`} className="ml-2 cursor-pointer text-secondary">
                    {ingredient}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h4 className="text-primary uppercase tracking-wider font-medium mb-2">Découvrez</h4>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">Notre Menu</h1>
        <div className="w-20 h-0.5 bg-primary mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez notre sélection de pâtisseries fines tunisiennes et orientales, préparées avec passion et des
          ingrédients de qualité.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 fancy-border p-6 bg-white shadow-sm">
            <FilterContent />
          </div>
        </div>

        {/* Mobile Filters Button and Sheet */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 border-primary/50 text-secondary">
                <Filter className="h-4 w-4" />
                Filtres
                {(selectedCategories.length > 0 ||
                  selectedIngredients.length > 0 ||
                  priceRange[0] > 0 ||
                  priceRange[1] < 50) && (
                  <Badge className="ml-1 bg-primary hover:bg-primary/90 text-white">
                    {selectedCategories.length +
                      selectedIngredients.length +
                      (priceRange[0] > 0 || priceRange[1] < 50 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <FilterContent />
            </SheetContent>
          </Sheet>

          {/* Search Input for Mobile */}
          <div className="relative w-full max-w-sm ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-primary/20 focus:border-primary focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1">
          {/* Desktop Search */}
          <div className="hidden lg:flex mb-8 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher une pâtisserie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-primary/20 focus:border-primary focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedIngredients.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((category) => (
                <Badge
                  key={`cat-${category}`}
                  variant="secondary"
                  className="bg-accent text-secondary hover:bg-accent/80"
                >
                  {category}
                  <button onClick={() => toggleCategory(category)} className="ml-1">
                    <X className="h-3 w-3" style={{ color: '#d4b483' }} />
                  </button>
                </Badge>
              ))}
              {selectedIngredients.map((ingredient) => (
                <Badge
                  key={`ing-${ingredient}`}
                  variant="secondary"
                  className="bg-accent text-secondary hover:bg-accent/80"
                >
                  {ingredient}
                  <button onClick={() => toggleIngredient(ingredient)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-6">
            {filteredProducts.length} {filteredProducts.length > 1 ? "résultats" : "résultat"} trouvés
          </p>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Aucun produit ne correspond à vos critères.</p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4 border-primary text-primary hover:bg-primary/10"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

