"use client";
import { useEffect } from "react";

import { AppSection } from "~/components/AppSection";
import { ProgressBar } from "~/components/progressBar";
import { logEvent } from "firebase/analytics";
import { Footer } from "~/components/Footer";
import { BottomBanner } from "~/components/BottomBanner";

import { analytics } from "../utils/firebase";
import { PreOrderButton } from "~/components/PreOrderButton";
import Link from "next/link";

export default function Home() {
  const handleShopPress = () => {
    console.log("navigate on shop");
  };

  return (
    <main>
      <div className="min-h-screen px-12 md:px-44 pt-12 max-w-[1512px] m-auto">
        <ProgressBar color="bg-yellow" bg="bg-yellow-lighter" />

        <header className="flex justify-between items-center mb-16">
          <img src="/logo.svg" alt="" className="w-10 xl:w-20" />
          <a
            href="mailto:contact@etha.app"
            className="text-sm xl:text-xl text-yellow  uppercase font-semibold hover:underline xl:hover:no-underline xl:border-2 xl:rounded-xl xl:py-2 xl:px-9"
          >
            Nous contacter
          </a>
        </header>
        <div className="relative">
          <div className="flex">
            <p className="z-30 text-2xl md:text-8xl/normal font-semibold text-center px-6 mb-14 md:mb-28 font-title leading-relaxed">
              LE STUDIO DE CRÉATION{" "}
              <span className="text-white rotating-background md:text-8xl">
                D’APPLICATIONS
              </span>{" "}
              MOBILE DE DIVERTISSEMENTS
            </p>
          </div>
          <img
            src="/images/itemTitle1.svg"
            alt=""
            className="absolute w-10 top-0 left-12 md:w-32 md:left-52"
          />
          <img
            src="/images/itemTitle2.svg"
            alt=""
            className="absolute w-10 top-20 md:top-64 right-0 md:w-32 md:right-8"
          />
          <img
            src="/images/itemTitle3.svg"
            alt=""
            className="absolute w-10 bottom-20 left-20 md:bottom-52  md:w-32 md:left-80"
          />
        </div>

        <AppSection
          name="Bae : Jeu de couple"
          logo="bae"
          description="Si vous êtes à la recherche d'une application qui vous permettra de
        redécouvrir votre relation amoureuse, de renforcer votre lien émotionnel
        et de briser la routine quotidienne, vous serez ravis de découvrir Bae,
        l'application de quiz pour couples !"
          iosLink="https://apps.apple.com/fr/developer/enzo-hespel/id1574150151"
          androidLink=""
        />
        <AppSection
          name="VÉRITÉ ou VÉRITÉ"
          logo="vérité"
          description="Découvrez Vérité ou Vérité, une application qui transforme votre smartphone en l'accessoire ultime pour animer vos soirées entre amis. Plongez dans une aventure sociale captivante avec Vérité ou Vérité, l'application dynamique qui redéfinit le divertissement en groupe !"
          iosLink="https://apps.apple.com/fr/app/v%C3%A9rit%C3%A9-ou-v%C3%A9rit%C3%A9/id6480046704"
          androidLink=""
          reversed
        />
        <AppSection
          name="Pour Combien ?"
          logo="pcb"
          description="Pour Combien est une application sociale innovante qui pimente chaque rassemblement en mettant à l'épreuve la bravoure et l'esprit d'aventure de vos amis. Idéale pour les soirées, cette application vous permet de lancer des défis audacieux ou humoristiques à vos amis, en leur demandant : 'Pour combien tu ferais ça ?'"
          iosLink="https://apps.apple.com/fr/app/pour-combien-jeu-entre-amis/id6480013361"
          androidLink=""
        />
        <div className="lg:flex items-center gap-20 mb-24 md:mb-52">
          <div className="lg:min-w-max mt-20 mb-9 md:mb-0 order-1 md:order-2 relative">
            <img src="/images/map.svg" alt="" className="" />
            <img
              src="/images/point.svg"
              alt=""
              className="w-6 md:w-10 absolute top-12 left-6 md:top-28 md:left-14 animate-pulse"
            />
            <img
              src="/images/point.svg"
              alt=""
              className="w-6 md:w-10 absolute top-12 right-6 md:top-28 md:right-14 animate-pulse"
            />
            <img
              src="/images/point.svg"
              alt=""
              className="w-6 md:w-10 absolute top-20 right-36 md:top-52 md:right-52 animate-pulse"
            />
            <img
              src="/images/point.svg"
              alt=""
              className="w-6 md:w-10 absolute top-24 left-12 md:top-72 md:left-44 animate-pulse"
            />
            <img
              src="/images/point.svg"
              alt=""
              className="w-6 md:w-10 absolute top-24 left-44 md:top-44 md:left-72 animate-pulse"
            />
          </div>
          <div>
            <h3 className="text-3xl md:text-6xl font-body font-bold mb-4">
              International
            </h3>
            <p className="text-sm/normal md:text-xl/normal font-body font-normal text-gray-500-500 text-justify">
              Nos applications connaissent un grand succès et sont actuellement
              disponibles et activement utilisées dans de nombreux pays à
              travers le monde, notamment dans les régions hispanophones,
              anglophones et francophones. Que ce soit en Espagne, au Mexique,
              aux États-Unis, au Royaume-Uni, en France ou au Canada, nos
              applications continuent de divertir des millions de personnes.
            </p>
          </div>
        </div>

        <div className="md:flex mb-24 md:mb-52 md:gap-32">
          <div className="md:flex-col">
            <div className="md:flex md:gap-20">
              <div className="flex flex-col mb-6">
                <h3 className="text-6xl font-bold mb-2">
                  5<span className="text-yellow">+</span>
                </h3>
                <p className="font-bold text-gray-500">
                  Nouvelles applications en 1 an
                </p>
              </div>

              <div className="flex flex-col mb-6 ">
                <div className="self-end md:gap-20">
                  <h3 className="text-6xl font-bold mb-2 self-end">
                    500K<span className="text-yellow">+</span>
                  </h3>
                  <p className="font-bold text-gray-500 self-end">
                    Téléchargements
                  </p>
                </div>
              </div>
            </div>
            <div className="md:flex md:gap-20">
              <div className="flex flex-col mb-6">
                <h3 className="text-6xl font-bold mb-2">
                  500<span className="text-yellow">+</span>
                </h3>
                <p className="font-bold text-gray-500">Notes positives</p>
              </div>

              <div className="flex flex-col mb-10">
                <div className="self-end">
                  <h3 className="text-6xl font-bold mb-2 self-end">
                    50<span className="text-yellow">+</span>
                  </h3>
                  <p className="font-bold text-gray-500 self-end">
                    Pays touchées
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md-flex-col">
            <h3 className="text-3xl font-bold mb-4 md:text-6xl">
              Les chiffres
            </h3>
            <p className="text-sm/normal md:text-xl/normal font-body font-normal text-gray-500 text-justify">
              Nous sommes transparents quant à nos chiffres et fiers de voir que
              des personnes du monde entier passent des moments de qualité avec
              leurs proches grâce à nos applications. Nous nous engageons à
              offrir des expériences enrichissantes et divertissantes,
              renforçant les liens entre amis et familles.
            </p>
          </div>
        </div>

        <div className="mb-24 md:gap-24 md:flex md:mb-52">
          <div className="flex justify-between md:justify-center mb-9 md:w-1/3 md:gap-12 order-1 md:order-2">
            <img
              src="/images/enzo.png"
              alt="image de Enzo"
              className="grayscale w-32 h-32 md:w-40 md:h-40"
            />
            <img
              src="/images/tania.png"
              alt="image de Tania"
              className="grayscale w-32 h-32 md:w-40 md:h-40"
            />
          </div>
          <div className="md:w-2/3 md:flex-col">
            <h3 className="text-3xl md:text-6xl font-body font-bold mb-4">
              Qui sommes nous <span className="text-yellow">?</span>
            </h3>
            <p className="text-sm/normal md:text-xl/normal font-body font-normal text-gray-500 text-justify">
              Enzo Hespel et Tania Abitbol, tous deux développeurs Front-end de
              formation, ont mis à profit leurs compétences techniques et leur
              expérience pour créer des produits qui répondent aux besoins des
              utilisateurs modernes. Leur expertise en matière de design et de
              développement des interfaces utilisateur intuitives et engageantes
              leur a permis de se démarquer dans un marché compétitif.
            </p>
          </div>
        </div>

        <div className="md:flex md:justify-betwee">
          <h3 className="font-medium text-3xl mb-12 leading-normal md:w-1/2 md:text-4xl">
            Une{" "}
            <span className="font-extrabold">
              demande <span className="text-yellow">?</span>
            </span>{" "}
            Une{" "}
            <span className="font-extrabold">
              question <span className="text-yellow">?</span>
            </span>{" "}
            Des idées{" "}
            <span className="font-extrabold">
              d’amélioration <span className="text-yellow">?</span>
            </span>
          </h3>

          <a
            href="mailto:contact@etha.app"
            className="bg-black md:w-1/2  text-white w-full text-xl font-semibold uppercase py-3 px-4 rounded-xl mb-24 md:mb-28 md:max-w-72 text-center"
          >
            Nous contacter
          </a>
        </div>
      </div>
      <BottomBanner>
        <div className="md:flex flex-col hidden">
          <p className="text-sm font-bold font-baloo sm:text-base md:text-lg">
            Découvrez nos nouveaux jeux de société !
          </p>
          <p className="text-xs sm:text-sm md:text-base">
            Parfaits pour animer vos soirées entre couple ou partager des
            moments uniques entre amis.
          </p>
        </div>

        <PreOrderButton onPress={handleShopPress} fullWidth>
          <Link href="/shops"> Voir la boutique</Link>
        </PreOrderButton>
      </BottomBanner>
      <Footer color="bg-black" />
    </main>
  );
}
