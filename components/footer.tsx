import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5 pattern-grid"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <Image
                src="/logoarab.png"
                alt="Soltana Pâtisserie Fine"
                width={140}
                height={70}
                className="h-12 sm:h-14 w-auto"
              />
            </div>
            <p className="text-white/80 mb-6">
              L&apos;excellence des pâtisseries tunisiennes et orientales depuis plus de 30 ans.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-gold hover:bg-white/10 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-gold hover:bg-white/10 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-gold hover:bg-white/10 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-gold">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/80 hover:text-gold transition-colors inline-block">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-white/80 hover:text-gold transition-colors inline-block">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-gold transition-colors inline-block">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-gold transition-colors inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-gold">Horaires</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span>8h - 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span>8h - 20h</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span>9h - 18h</span>
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-2 text-gold">Contact</h3>
            <p className="text-white/80">
              Rue Manzel Hor 8090<br />
              Kelibia, Nabeul<br />
              <a href="tel:56170165" className="text-gold hover:text-gold/80 transition-colors">
                +216 56 170 165
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-gold">Newsletter</h3>
            <p className="text-white/80 mb-4">Inscrivez-vous pour recevoir nos offres spéciales et nouveautés.</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold"
              />
              <Button className="bg-gold hover:bg-gold/90 text-white">S&apos;inscrire</Button>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Soltana. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Conditions d&apos;utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

