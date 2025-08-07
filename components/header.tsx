"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, ShoppingBag, Phone, ChevronDown } from "lucide-react"
import { useCart } from "@/components/cart-context"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Accueil", href: "/" },
    {
      name: "Nos Pâtisseries",
      href: "/menu",
      submenu: [
        { name: "Pâtisseries Traditionnelles", href: "/menu?category=Traditionnelle" },
        { name: "Pâtisseries Modernes", href: "/menu?category=Moderne" },
        { name: "Spécialités Orientales", href: "/menu?category=Orientale" },
      ],
    },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <div className="flex items-center">
            <Image
              src="/logoarab.png"
              alt="Soltana Pâtisserie Fine"
              width={120}
              height={60}
              className="h-12 sm:h-14 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.submenu ? (
                <div className="relative">
                  <Link
                    href={item.href}
                    className={`flex items-center font-medium transition-colors text-sm xl:text-base ${
                      pathname === item.href || pathname.startsWith('/menu') ? "text-gold" : "text-navy hover:text-gold"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180" />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white/95 backdrop-blur-sm border border-gold/20 rounded-lg shadow-lg min-w-[200px] py-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-navy hover:bg-gold/10 hover:text-gold transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`relative font-medium transition-colors text-sm xl:text-base ${
                    pathname === item.href ? "text-gold" : "text-navy hover:text-gold"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div layoutId="underline" className="absolute left-0 right-0 h-0.5 bg-gold bottom-[-4px]" />
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
          <Link href="/panier">
            <Button variant="ghost" size="icon" className="text-navy hover:text-gold relative">
              <ShoppingBag className="h-4 w-4 xl:h-5 xl:w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          <a href="tel:56170165">
            <Button className="bg-gold hover:bg-gold/90 text-white text-sm xl:text-base px-3 xl:px-4">
              <Phone className="mr-2 h-3 w-3 xl:h-4 xl:w-4" />
              Commander
            </Button>
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center lg:hidden">
          <Link href="/panier">
            <Button variant="ghost" size="icon" className="text-navy hover:text-gold mr-2 relative">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-navy hover:text-gold">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b border-gold/20">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/logoarab.png"
                      alt="Soltana Pâtisserie Fine"
                      width={100}
                      height={50}
                      className="h-10 w-auto"
                    />
                  </Link>
                </div>

                <nav className="flex flex-col space-y-4 sm:space-y-6 py-6 sm:py-8">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={`text-base sm:text-lg font-medium ${pathname === item.href || (item.href === '/menu' && pathname.startsWith('/menu')) ? "text-gold" : "text-navy"}`}
                      >
                        {item.name}
                      </Link>

                      {item.submenu && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="block text-sm text-navy/80 hover:text-gold py-1 transition-colors"
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-auto py-4 sm:py-6 border-t border-gold/20">
                  <a href="tel:56170165">
                    <Button className="w-full bg-gold hover:bg-gold/90 text-white text-sm sm:text-base">
                      <Phone className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Commander
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

