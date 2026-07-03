import { useCallback, useEffect, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { MapPin, Wifi, Car, Bike, Utensils, Baby, Waves, Mountain, ChevronDown, X, Menu, ChevronLeft, ChevronRight} from "lucide-react";

import imgExterior from "@/imports/Gîte Collines du matin.png";
import imgFleurs from "@/imports/fleurs.jpeg";
import imgCuisine from "@/imports/cuisine_1.jpeg";
import imgCoinRepas from "@/imports/Coin_repas_enhanced.png";
import imgChVintage from "@/imports/ch_Vintage.jpeg";
import imgChSoleil from "@/imports/ch_Soleil_.jpeg";
import imgChChampetre1 from "@/imports/utf-8ch_Champetre_1.jpeg";
import imgChBleue1 from "@/imports/ch_Bleue_1.jpeg";
import imgBuanderie from "@/imports/buanderie.jpeg"
import imgSdbBas from "@/imports/s d douche bas .jpeg"
import imgWCBas from "@/imports/wc bas.jpeg"
import imgSdbHaut1 from "@/imports/sdb haut .jpeg"
import imgSdbHaut2 from "@/imports/sdb haut 2 .jpeg"
import imgCoinSalonExt from "@/imports/salon jardin.png"
import imgSejour1 from "@/imports/séjour 1.jpeg"
import imgSejour2 from "@/imports/séjour 2.jpeg"
import imgSejour3 from "@/imports/séjour 3.jpeg"
import imgSejour4 from "@/imports/séjour 4.jpeg"
import imgSejour5 from "@/imports/séjour 5 .jpeg"
import imgSejour6 from "@/imports/séjour 6 .jpeg"
import imgSejour7 from "@/imports/séjour 7 .jpeg"



function Carousel({ images, height = "420px" }: { images: { src: string; alt: string }[]; height?: string }) {
  const [index, setIndex] = useState(0);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  // Auto-advance every 15 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 7000);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <div className="relative overflow-hidden rounded-sm bg-muted group" style={{ height }}>
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map(({ src, alt }) => (
          <div key={alt} className="w-full flex-shrink-0 h-full flex items-center justify-center">
            <ImageWithFallback src={src} alt={alt} className="h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        aria-label="Photo précédente"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        aria-label="Photo suivante"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === index ? "bg-white w-4" : "bg-white/50"}`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm text-foreground text-xs px-2.5 py-1 rounded-sm">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}



const NAV_LINKS = [
  { href: "#gite", label: "Le Gîte" },
  { href: "#chambres", label: "Chambres" },
  { href: "#exterieur", label: "Extérieur" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#acces", label: "Accès" },
];

const ROOMS = [
  {
    name: "Chambre Vintage",
    img: imgChVintage,
    desc: "Lit double 140 · Salle d'eau attenante · Coin toilette",
  },
  {
    name: "Chambre Soleil",
    img: imgChSoleil,
    desc: "Lit double 140 · Tête de lit en bois · Ambiance chaleureuse",
  },
  {
    name: "Chambre Champêtre",
    img: imgChChampetre1,
    desc: "Lit double 140 · Lit 90 · La plus spacieuse",
  },
  {
    name: "Chambre Bleue",
    img: imgChBleue1,
    desc: "Lit double 140 · Décor naturel et apaisant",
  },
];

const AMENITIES = [
  { icon: Wifi, label: "Wi-Fi inclus" },
  { icon: Utensils, label: "Cuisine équipée" },
  { icon: Car, label: "Parking couvert" },
  { icon: Bike, label: "Abri vélos" },
  { icon: Waves, label: "Rivière (1re catégorie)" },
  { icon: Mountain, label: "GR panoramiques" },
  { icon: Baby, label: "Équipement bébé" },
  { icon: MapPin, label: "Feurs à 10 min" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, "#hero")}
            className="flex flex-col leading-none"
          >
            <span
              className="text-primary font-semibold tracking-wide text-sm uppercase"
              style={{ fontFamily: "'Lato', sans-serif", letterSpacing: "0.12em" }}
            >
              Gîte
            </span>
            <span
              className="text-foreground text-xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Collines du Matin
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:contact@collinesdumatin.fr"
              className="bg-primary text-primary-foreground px-5 py-2 text-sm rounded-sm hover:opacity-90 transition-opacity"
            >
              Réserver
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="text-foreground text-base py-1"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:contact@collinesdumatin.fr"
              className="bg-primary text-primary-foreground px-5 py-2.5 text-sm text-center rounded-sm"
            >
              Réserver
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative h-screen min-h-[560px] flex items-end">
        <div className="absolute inset-0 bg-foreground/10">
          <ImageWithFallback
            src={imgCoinRepas}
            alt="Cour extérieure du gîte avec table en bois sous une arche en pierre, vue sur les collines"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <p
            className="text-white/80 text-sm uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Gîte rural · Forez · Loire
          </p>
          <h1
            className="text-white text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Collines<br />
            <em className="font-normal italic">du Matin</em>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
            Un ancien corps de ferme rénové, 160 m² pour 8 personnes, face aux douces collines du Forez.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#tarifs"
              onClick={(e) => scrollTo(e, "#tarifs")}
              className="bg-primary text-primary-foreground px-8 py-3.5 text-sm tracking-wide hover:opacity-90 transition-opacity rounded-sm"
            >
              Voir les tarifs
            </a>
            <a
              href="#gite"
              onClick={(e) => scrollTo(e, "#gite")}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-3.5 text-sm tracking-wide hover:bg-white/30 transition-colors rounded-sm"
            >
              Découvrir
            </a>
          </div>
        </div>

        <a
          href="#gite"
          onClick={(e) => scrollTo(e, "#gite")}
          className="absolute bottom-6 right-8 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ── PRÉSENTATION ── */}
      <section id="gite" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4 font-semibold">
                Le Gîte
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Rustique & moderne,
                <br />
                <em className="font-normal italic">paisible & confortable</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Une nature douce et vallonnée s'offre à vous depuis le gîte «&nbsp;Collines du matin&nbsp;». Dans un ancien corps de ferme rénové, alliant le rustique et le moderne, un logement paisible et confortable de <strong>160 m²</strong> pour <strong>8 personnes</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                C'est un lieu très calme, idéal pour le repos, les retrouvailles, les randonnées panoramiques dans les collines avoisinantes grâce aux nombreux GR (dont le GRP «&nbsp;Terre de Tisseurs&nbsp;») et pour la découverte du patrimoine local forézien.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Pour votre confort, <strong>les lits seront faits à l'arrivée</strong>, un drap de douche fourni par personne et vous trouverez les essentiels pour démarrer votre séjour (papier toilette, torchons, produits toilette, huile, sel, poivre…).
              </p>
            </div>

            <div className="relative">
              <ImageWithFallback
                src={imgExterior}
                alt="Façade extérieure du corps de ferme rénové avec parking couvert"
                className="w-full h-[420px] object-cover rounded-sm"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-5 shadow-lg max-w-[200px]">
                <div className="text-4xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>160</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">m² · 8 personnes</div>
                <div className="text-xs text-muted-foreground mt-1">4 chambres doubles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÉQUIPEMENTS BANDE ── */}
      <section className="bg-card border-y border-border py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-accent/10 rounded-sm flex-shrink-0">
                  <Icon size={16} className="text-accent" />
                </div>
                <span className="text-sm text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTÉRIEUR ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <Carousel
                images={[
                  { src: imgSejour1, alt: "Table à manger en bois avec chaises et corbeille de fruits " },
                  { src: imgSejour2, alt: "Séjour avec canapé vert, fauteuils moutarde et suspension en rotin sous les poutres" },
                  { src: imgSejour3, alt: "Coin salon avec plantes vertes et buffet en bois" },
                  { src: imgSejour4, alt: "Détail canapé vert et table basse avec noix et décorations" },
                  { src: imgSejour5, alt: "Détail canapé vert et table basse avec noix et décorations" },
                  { src: imgSejour6, alt: "Vue d'ensemble du séjour et salle à manger ouverts" },
                  { src: imgSejour7, alt: "Vue d'ensemble depuis la salle à manger vers le salon" },
                  { src: imgBuanderie, alt: "Buanderie et électroménager" },
                  { src: imgSdbBas, alt: "Salle de douche rez-de-chaussée" },
                  { src: imgWCBas, alt: "WC rez-de-chaussée" },
                  { src: imgSdbHaut1, alt: "Salle d'eau à l'étage — vue intérieure" },
                  { src: imgSdbHaut2, alt: "Salle d'eau à l'étage — détails" },
                ]}
                height="420px"
              />
            </div>

            <div className="order-1 md:order-2">
              <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4 font-semibold">Intérieur</p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Tout le confort du foyer
              </h2>

              <div className="space-y-5">
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Rez-de-chaussée</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Séjour / salle à manger cosy bien équipé (jeux de sociétés, bibliothèque, télévision, Wi-Fi), cuisine entièrement équipée, buanderie avec tout l'électroménager, salle de douche, coin toilette et 2 WC séparés.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Étage</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Quatre chambres avec lit double 140. La plus grande dispose en plus d'un coin toilette et d'un lit 90. Salle d'eau et WC séparés partagés à l'étage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAMBRES ── */}
      <section id="chambres" className="py-24 md:py-32 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-accent text-xs uppercase tracking-[0.2em] mb-3 font-semibold">Les Chambres</p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Quatre univers, <em className="font-normal italic">une même quiétude</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOMS.map((room) => (
              <div
                key={room.name}
                className="group bg-background rounded-sm overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300"
              >
                <div className="overflow-hidden h-52">
                  <ImageWithFallback
                    src={room.img}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold text-lg text-foreground mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {room.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{room.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXTÉRIEUR ── */}
      <section id="exterieur" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4 font-semibold">Extérieur</p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Une vaste cour plein sud
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Une vaste cour fermée, orientée <strong>plein sud</strong>, avec vue sur la Charpassonne (1re catégorie piscicole) et les collines du matin. L'endroit idéal pour profiter du soleil du matin au soir.
              </p>

              <ul className="space-y-3">
                {[
                  "Coin salon & coin repas en plein air",
                  "Transats pour se prélasser au soleil",
                  "Coin barbecue",
                  "Abri couvert pour les vélos",
                  "Parking couvert pour 2 voitures",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ImageWithFallback
                src={imgCoinSalonExt}
                alt="Cour extérieure avec table et chaises en bois sous l'arche en pierre, vue sur les collines du Forez"
                className="w-full object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-primary-foreground/60 text-xs uppercase tracking-[0.2em] mb-3 font-semibold">Tarifs</p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Réservez votre séjour
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Week-end */}
            <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm p-8">
              <p className="text-primary-foreground/70 text-xs uppercase tracking-[0.15em] mb-3">Week-end</p>
              <div className="flex items-end gap-2 mb-1">
                <span
                  className="text-5xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  380 €
                </span>
              </div>
              <p className="text-primary-foreground/60 text-sm mb-6">Du vendredi 17h au dimanche 17h</p>
              <ul className="space-y-2.5 text-sm">
                {["Draps et linge maison fournis", "Ménage en supplément : 60 €", "8 personnes maximum"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-primary-foreground/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Long week-end */}
            <div className="bg-primary-foreground/20 border border-primary-foreground/30 rounded-sm p-8 relative">
              <div className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-sm font-semibold uppercase tracking-wide">
                3 nuits
              </div>
              <p className="text-primary-foreground/70 text-xs uppercase tracking-[0.15em] mb-3">Long week-end</p>
              <div className="flex items-end gap-2 mb-1">
                <span
                  className="text-5xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  550 €
                </span>
              </div>
              <p className="text-primary-foreground/60 text-sm mb-6">Du jeudi 17h au dimanche 17h</p>
              <ul className="space-y-2.5 text-sm">
                {["Draps et linge maison fournis", "Ménage en supplément : 60 €", "8 personnes maximum"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-primary-foreground/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-primary-foreground/50 text-xs">
              Supplément possible en cas de surconsommation d'électricité, d'eau ou de gaz. · Paiement : chèque, espèces ou paiement en ligne.
            </p>
          </div>

          <div className="mt-10 text-center">
            <a
              href="mailto:contact@collinesdumatin.fr"
              className="inline-block bg-primary-foreground text-primary px-10 py-4 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity rounded-sm"
            >
              Contacter le propriétaire
            </a>
          </div>
        </div>
      </section>

      {/* ── ACCÈS ── */}
      <section id="acces" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4 font-semibold">Accès & Localisation</p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Au cœur du Forez
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Le gîte est idéalement situé pour rayonner dans toute la région — facilement accessible depuis les grandes villes.
              </p>

              <div className="space-y-4">
                {[
                  { lieu: "Feurs", distance: "10 min" },
                  { lieu: "Autoroutes A72 & A89", distance: "15 min" },
                  { lieu: "Saint-Étienne", distance: "~1 h" },
                  { lieu: "Lyon", distance: "~1 h" },
                  { lieu: "Clermont-Ferrand", distance: "~1 h" },
                ].map(({ lieu, distance }) => (
                  <div key={lieu} className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <MapPin size={14} className="text-accent flex-shrink-0" />
                      <span className="text-foreground text-sm">{lieu}</span>
                    </div>
                    <span className="text-muted-foreground text-sm font-medium">{distance}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-80 md:h-full min-h-[360px] bg-muted rounded-sm overflow-hidden">
              <ImageWithFallback
                src={imgFleurs}
                alt="Champs de coquelicots et bleuets dans les collines du Forez"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/90 backdrop-blur-sm border border-border rounded-sm px-6 py-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Région</p>
                  <p
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Loire · Forez
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Collines du matin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Questions fréquentes
          </h2>
          {[
            {
              q: "L'équipement bébé est-il inclus ?",
              a: "L'équipement bébé (lit, chaise haute, baignoire, pot, matelas à langer, jeux…) est disponible sur demande, sans supplément.",
            },
            {
              q: "Les animaux sont-ils acceptés ?",
              a: "Merci de nous contacter directement pour discuter de l'accueil des animaux de compagnie.",
            },
            {
              q: "Comment se passe l'arrivée ?",
              a: "L'arrivée se fait à partir de 17h. Les lits sont faits à votre arrivée et les produits essentiels sont fournis pour démarrer votre séjour.",
            },
            {
              q: "Y a-t-il des randonnées accessibles à pied ?",
              a: "Oui, de nombreux sentiers GR partent directement du gîte ou à proximité, dont le GRP « Terre de Tisseurs », pour des vues panoramiques sur les collines du Forez.",
            },
          ].map((item, i) => (
            <div key={i} className="border-b border-border">
              <button
                className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-primary transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium text-sm">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background/80 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3
                className="text-background text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Collines du Matin
              </h3>
              <p className="text-sm leading-relaxed">
                Gîte rural pour 8 personnes au cœur des collines du Forez, Loire.
              </p>
            </div>
            <div>
              <h4 className="text-background text-sm font-semibold uppercase tracking-wide mb-3">Navigation</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => scrollTo(e, l.href)}
                      className="text-sm hover:text-background transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-background text-sm font-semibold uppercase tracking-wide mb-3">Contact</h4>
              <p className="text-sm mb-1">
                <a href="mailto:contact@collinesdumatin.fr" className="hover:text-background transition-colors">
                  contact@collinesdumatin.fr
                </a>
              </p>
              <p className="text-sm leading-relaxed mt-3">
                Feurs · Loire (42) · France
              </p>
            </div>
          </div>
          <div className="border-t border-background/10 pt-6 text-xs text-center text-background/40">
            © {new Date().getFullYear()} Gîte Collines du Matin · Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
}
