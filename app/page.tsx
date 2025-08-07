"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion"
import { ChevronRight, Star, Award, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageSlider } from "@/components/image-slider"
import { BestSellers } from "@/components/best-sellers"

// Sample slider images
const sliderImages = [
  {
    url: "/pict1.jpg",
    alt: "Pâtisseries fines tunisiennes",
    title: "L'Art de la Pâtisserie Fine",
  },
  {
    url: "/pict2.jpg",
    alt: "Gâteaux modernes",
    title: "Créations Modernes & Élégantes",
  },
  {
    url: "/pict3.jpg",
    alt: "Spécialités orientales",
    title: "Saveurs Authentiques d'Orient",
  },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const aboutRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.42, 0, 1, 1),
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with Image Slider */}
      <section className="w-full h-screen relative">
        <ImageSlider images={sliderImages} />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-3xl w-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 sm:mb-6 inline-block"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 relative">
                <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-2 border-gold/60"></div>
                <div className="absolute inset-2 rounded-full bg-gold/20 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-serif text-lg sm:text-xl">S</div>
              </div>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6">
              <span className="block">Soltana</span>
              <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-light block mt-2 sm:mt-4 uppercase tracking-widest">
                L&apos;Excellence des Pâtisseries Tunisiennes
              </span>
            </h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
              <div className="w-16 sm:w-24 h-0.5 bg-gold mx-auto my-4 sm:my-6"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button size="lg" className="mt-4 sm:mt-6 bg-gold hover:bg-gold/90 text-white rounded-none px-6 sm:px-8 text-sm sm:text-base" asChild>
                <Link href="/menu">
                  Découvrir nos délices
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center text-white">
            <div className="text-xs uppercase tracking-widest mb-2">Découvrir</div>
            <div className="w-0.5 h-8 sm:h-10 bg-white/30 relative">
              <motion.div
                className="absolute top-0 w-full h-1/3 bg-gold"
                animate={{
                  top: ["0%", "66%", "0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 sm:py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              {
                icon: <Star className="h-6 w-6 sm:h-8 sm:w-8 text-gold" />,
                title: "Qualité Premium",
                description: "Des ingrédients soigneusement sélectionnés pour des saveurs authentiques et raffinées.",
              },
              {
                icon: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-gold" />,
                title: "Savoir-faire Artisanal",
                description: "L'expertise de nos maîtres pâtissiers perpétue la tradition tunisienne depuis 2025.",
              },
              {
                icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-gold" />,
                title: "Fraîcheur Garantie",
                description:
                  "Nos pâtisseries sont préparées quotidiennement pour vous garantir une expérience gustative incomparable.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 text-center flex flex-col items-center fancy-border"
              >
                <div className="mb-4 rounded-full bg-gold/10 p-3 sm:p-4 inline-flex">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-navy">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-grid"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div style={{ opacity, y }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 border-t-2 border-l-2 border-gold"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 border-b-2 border-r-2 border-gold"></div>
                <Image
                  src="/orig.jpg"
                  alt="Pâtisserie Soltana"
                  width={600}
                  height={600}
                  className="rounded-sm shadow-lg relative z-10 w-full h-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <h4 className="text-gold uppercase tracking-wider font-medium mb-2 text-sm sm:text-base">Notre Histoire</h4>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-navy mb-4 sm:mb-6">
                  L&apos;Héritage de la Pâtisserie Tunisienne
                </h2>
                <div className="w-16 sm:w-20 h-0.5 bg-gold mb-4 sm:mb-6"></div>
              </div>
              <p className="text-base sm:text-lg text-gray-700">
                Pâtisserie Soltana est née en 2025 de la passion et du savoir-faire d'Eya, forte de trois années d'expérience dans une autre pâtisserie. Animée par sa passion et son savoir-faire, elle décide de créer son propre projet innovant et unique.
              </p>
              <p className="text-base sm:text-lg text-gray-700">
                Chaque création est élaborée avec des ingrédients soigneusement sélectionnés, dans le respect des recettes ancestrales qui font la renommée de notre maison.
              </p>
              <Button
                variant="outline"
                className="mt-4 sm:mt-6 border-gold text-gold hover:bg-gold/10 rounded-none px-6 sm:px-8 text-sm sm:text-base"
                asChild
              >
                <Link href="/about">
                  En savoir plus
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h4 className="text-gold uppercase tracking-wider font-medium mb-2 text-sm sm:text-base">Découvrez</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-navy mb-4 sm:mb-6">Nos Créations Signatures</h2>
            <div className="w-16 sm:w-20 h-0.5 bg-gold mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos créations les plus appréciées, des classiques intemporels aux innovations gourmandes.
            </p>
          </motion.div>

          <BestSellers />

          <div className="text-center mt-12 sm:mt-16">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-white rounded-none px-6 sm:px-8 text-sm sm:text-base" asChild>
              <Link href="/menu">
                Voir tout notre menu
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-grid"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h4 className="text-gold uppercase tracking-wider font-medium mb-2 text-sm sm:text-base">Témoignages</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 sm:mb-6">Ce que disent nos clients</h2>
            <div className="w-16 sm:w-20 h-0.5 bg-gold mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg max-w-2xl mx-auto opacity-90">
              La satisfaction de nos clients est notre plus grande récompense.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-gold/20 h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col h-full">
                      <div className="text-gold text-3xl sm:text-4xl font-serif mb-4">"</div>
                      <p className="text-white/90 mb-6 flex-grow text-sm sm:text-base">
                        {i === 1 &&
                          "Les pâtisseries de Soltana sont tout simplement divines. Le goût authentique qui me rappelle mon enfance en Tunisie."}
                        {i === 2 &&
                          "J'ai commandé pour un événement familial et tous mes invités ont été impressionnés par la qualité et la finesse des gâteaux."}
                        {i === 3 &&
                          "Un service impeccable et des créations qui sont aussi belles que délicieuses. Soltana est devenue notre pâtisserie de référence."}
                      </p>
                      <div className="flex items-center mt-auto">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/20 mr-3 flex items-center justify-center text-gold font-bold text-sm sm:text-base">
                          {i === 1 && "S"}
                          {i === 2 && "K"}
                          {i === 3 && "L"}
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm sm:text-base">
                            {i === 1 && "Sarah M."}
                            {i === 2 && "Karim B."}
                            {i === 3 && "Leila T."}
                          </p>
                          <p className="text-sm text-gold">Client fidèle</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-grid"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <h4 className="text-gold uppercase tracking-wider font-medium mb-2 text-sm sm:text-base">Contactez-nous</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-navy">Envie de déguster nos créations ?</h2>
            <div className="w-16 sm:w-20 h-0.5 bg-gold mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Visitez notre boutique ou commandez en ligne pour vos événements spéciaux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 sm:mt-8">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-white rounded-none px-6 sm:px-8 text-sm sm:text-base" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10 rounded-none px-6 sm:px-8 text-sm sm:text-base"
                asChild
              >
                <Link href="/menu">Commander en ligne</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

