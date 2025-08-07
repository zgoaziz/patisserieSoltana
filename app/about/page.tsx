import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-navy mb-8 text-center">À propos de Soltana</h1>
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="flex-1">
          <Image src="/orig.jpg" alt="Pâtisserie Soltana" width={400} height={400} className="rounded-lg shadow" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gold mb-4">L'Excellence des Pâtisseries Tunisiennes et Orientales</h2>
          <p className="text-lg text-gray-700 mb-4">
            Pâtisserie Soltana est née de la passion et du savoir-faire d'Eya, qui a su transformer son expérience en une aventure culinaire unique. Notre équipe s'engage à vous offrir des créations gourmandes alliant authenticité et modernité.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Chaque création est élaborée avec des ingrédients soigneusement sélectionnés, dans le respect des recettes ancestrales qui font la renommée de notre maison.
          </p>
          <p className="text-lg text-gray-700">
            Notre équipe passionnée s'engage à vous offrir une expérience gourmande inoubliable, que ce soit en boutique ou lors de vos événements spéciaux.
          </p>
        </div>
      </div>

      {/* Timeline de l'histoire */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gold mb-6 text-center">Notre Histoire</h3>
        <div className="relative border-l-4 border-gold pl-8">
          <div className="mb-10">
            <div className="text-gold font-bold text-lg mb-1">2025</div>
            <div className="text-navy font-semibold mb-1">Naissance de Pâtisserie Soltana</div>
            <div className="text-gray-600">
              L'aventure de Pâtisserie Soltana commence en 2025, née de l'idée d'Eya, forte de trois années d'expérience dans une autre pâtisserie. Animée par sa passion et son savoir-faire, elle décide de créer son propre projet innovant et unique.
            </div>
          </div>
          <div className="mb-10">
            <div className="text-gold font-bold text-lg mb-1">2025</div>
            <div className="text-navy font-semibold mb-1">Création de l'équipe</div>
            <div className="text-gray-600">
              Dès le départ, elle s'entoure de partenaires et met en place une organisation qui lui permet de concrétiser sa vision : offrir des créations gourmandes alliant authenticité et modernité.
            </div>
          </div>
          <div>
            <div className="text-gold font-bold text-lg mb-1">Aujourd'hui</div>
            <div className="text-navy font-semibold mb-1">Une équipe passionnée</div>
            <div className="text-gray-600">
              Notre équipe perpétue la tradition et innove chaque jour pour vous offrir le meilleur de la pâtisserie tunisienne et orientale, guidée par la vision d'Eya.
            </div>
          </div>
        </div>
      </div>

      {/* Section équipe */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gold mb-6 text-center">Notre Équipe</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Image src="/placeholder-user.jpg" alt="Chef Pâtissière" width={100} height={100} className="rounded-full mb-4" />
            <div className="font-bold text-navy">Eya Ridene</div>
            <div className="text-gold text-sm mb-2">Chef Pâtissière</div>
            <div className="text-gray-600 text-center text-sm">Fondatrice de Soltana, passionnée par l'art de la pâtisserie et l'innovation culinaire.</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Image src="/placeholder-user.jpg" alt="Chef Oriental" width={100} height={100} className="rounded-full mb-4" />
            <div className="font-bold text-navy">Ibtissem Ben Hamed</div>
            <div className="text-gold text-sm mb-2">Chef Oriental</div>
            <div className="text-gray-600 text-center text-sm">Créatrice de nouvelles saveurs et experte des pâtisseries orientales.</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Image src="/placeholder-user.jpg" alt="Responsable Service" width={100} height={100} className="rounded-full mb-4" />
            <div className="font-bold text-navy">Saber Ridene</div>
            <div className="text-gold text-sm mb-2">Responsable Service</div>
            <div className="text-gray-600 text-center text-sm">Toujours à l'écoute pour garantir une expérience client inoubliable.</div>
          </div>
        </div>
      </div>

      {/* Valeurs visuelles */}
      <div className="bg-gold/10 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gold mb-2">Nos valeurs</h3>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          <div className="flex flex-col items-center">
            <span className="text-gold text-3xl mb-2">🍯</span>
            <span className="font-semibold text-navy">Qualité</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gold text-3xl mb-2">🧑‍🍳</span>
            <span className="font-semibold text-navy">Tradition</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gold text-3xl mb-2">✨</span>
            <span className="font-semibold text-navy">Créativité</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gold text-3xl mb-2">🤝</span>
            <span className="font-semibold text-navy">Satisfaction client</span>
          </div>
        </div>
      </div>
    </div>
  );
}