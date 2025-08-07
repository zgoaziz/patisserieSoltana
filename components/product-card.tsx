"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Eye, ShoppingBag, Share2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context";

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categories: string[]
  ingredients: string[]
  allergens?: string[]
  gallery?: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart();

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Ici vous pouvez ajouter la logique pour sauvegarder en localStorage ou API
    if (!isFavorite) {
      // Ajouter aux favoris
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      if (!favorites.find((fav: any) => fav.id === product.id)) {
        favorites.push(product)
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    } else {
      // Retirer des favoris
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== product.id)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: `${window.location.origin}/product/${product.id}`,
        })
      } catch (error) {
        console.log('Erreur lors du partage:', error)
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      const url = `${window.location.origin}/product/${product.id}`
      navigator.clipboard.writeText(url).then(() => {
        alert('Lien copié dans le presse-papiers!')
      }).catch(() => {
        // Fallback si clipboard n'est pas disponible
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Lien copié dans le presse-papiers!')
      })
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden border-0 shadow-md h-full group">
        <div
          className="relative aspect-square overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />

          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-col gap-3 items-center justify-center">
              <Link href={`/product/${product.id}`}>
                <Button variant="secondary" size="sm" className="bg-white hover:bg-gray-100 text-navy px-6">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </Button>
              </Link>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-gold hover:bg-gold/90 text-white px-6" 
                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Ajouter au panier
              </Button>
            </div>
          </div>

          {product.categories[0] && (
            <Badge className="absolute top-3 left-3 bg-gold hover:bg-gold/90 text-white">{product.categories[0]}</Badge>
          )}

          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`bg-white/80 hover:bg-white rounded-full h-8 w-8 transition-colors ${
                isFavorite ? 'text-red-500' : 'text-gold'
              }`}
              onClick={handleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white text-gold rounded-full h-8 w-8"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4 bg-white">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-medium text-lg text-navy group-hover:text-gold transition-colors">{product.name}</h3>
          </Link>

          <p className="text-gray-600 text-sm line-clamp-2 mt-1 mb-3">{product.description}</p>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gold">{product.price.toFixed(2)}dt</span>
            <div className="h-px w-12 bg-gray-200"></div>
            <div className="flex items-center text-sm text-gray-500">
              {product.ingredients.slice(0, 2).map((ingredient, index) => (
                <span key={index} className="inline-block">
                  {index > 0 && ", "}
                  {ingredient}
                </span>
              ))}
              {product.ingredients.length > 2 && "..."}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

