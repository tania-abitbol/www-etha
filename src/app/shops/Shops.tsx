"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSearchParams } from "next/navigation";

import { ClockSVG } from "~/assets/icons/clock";
import { PreOrderButton } from "~/components/PreOrderButton";
import { ProgressBar } from "~/components/progressBar";
import CartModal from "~/components/Cart";
import { addLineItem, createCheckout, getCheckout } from "~/api/checkout";
import "~/app/globals.css";
import { Card } from "~/components/Card";
import { CartSVG } from "~/assets/icons/cart";
import { Footer } from "~/components/Footer";

import { Paginator } from "~/components/Paginator";
import { trackEvent } from "~/utils/firebase";

export default function Shops() {
  const buttonRef = useRef(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [state, setState] = useState<"bae" | "vouv">("bae");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [checkoutId, setCheckoutId] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const searchParams = useSearchParams();
  const scrollTracked = useRef({ 25: false, 50: false, 75: false, 95: false });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;

      // Tracker les seuils de scroll
      if (scrolled >= 25 && !scrollTracked.current[25]) {
        trackEvent("scroll_depth", { depth: 25 });
        scrollTracked.current[25] = true;
      }
      if (scrolled >= 50 && !scrollTracked.current[50]) {
        trackEvent("scroll_depth", { depth: 50 });
        scrollTracked.current[50] = true;
      }
      if (scrolled >= 75 && !scrollTracked.current[75]) {
        trackEvent("scroll_depth", { depth: 75 });
        scrollTracked.current[75] = true;
      }
      if (scrolled >= 95 && !scrollTracked.current[95]) {
        trackEvent("scroll_depth", { depth: 100 });
        scrollTracked.current[95] = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const urlState = searchParams?.get("app");
    if (urlState === "bae" || urlState === "vouv") {
      setState(urlState);
    } else {
      setState("bae");
    }
  }, [searchParams]);

  const toggleCart = () => {
    const newState = !isCartOpen;
    setIsCartOpen(newState);

    trackEvent(newState ? "cart_open" : "cart_close", {
      modal: "cart",
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    beforeChange: (_unused: any, newIndex: number) => setCurrentSlide(newIndex),
  };

  const logo = state === "bae" ? "bae" : "vérité";

  const handlePreOrder = async () => {
    try {
      const variantId =
        state === "bae"
          ? "gid://shopify/ProductVariant/53723262746950"
          : "gid://shopify/ProductVariant/53723292762438";

      trackEvent("preorder_attempt", { product: state, variantId });

      let currentCheckoutId = localStorage.getItem("checkoutId");

      if (currentCheckoutId) {
        const existingCheckout = await getCheckout(currentCheckoutId);
        const existingItem = existingCheckout.lineItems.edges.find(
          (edge: any) => edge.node.variant.id === variantId
        );

        if (existingItem) {
          toggleCart();
          trackEvent("item_already_in_cart", { product: state, variantId });
          return;
        }

        const updatedCheckout = await addLineItem(
          currentCheckoutId,
          variantId,
          1
        );
        setCheckoutId(updatedCheckout.id);
        setCheckoutUrl(updatedCheckout.webUrl);

        localStorage.setItem("checkoutId", updatedCheckout.id);
        localStorage.setItem("checkoutUrl", updatedCheckout.webUrl);
      } else {
        const newCheckout = await createCheckout(variantId, 1);
        setCheckoutId(newCheckout.id);
        setCheckoutUrl(newCheckout.webUrl);

        localStorage.setItem("checkoutId", newCheckout.id);
        localStorage.setItem("checkoutUrl", newCheckout.webUrl);
      }

      trackEvent("item_added_to_cart", { product: state, variantId });
      toggleCart();
    } catch (error) {
      trackEvent("preorder_error", { error: error });
      console.error("Erreur lors de la commande :", error);
    } finally {
    }
  };

  const handleClick = (value: "bae" | "vouv") => {
    setState(value);
    trackEvent("state_change", { state: value });
  };

  useEffect(() => {
    const savedCheckoutId = localStorage.getItem("checkoutId");
    const savedCheckoutUrl = localStorage.getItem("checkoutUrl");

    if (savedCheckoutId && savedCheckoutUrl) {
      setCheckoutId(savedCheckoutId);
      setCheckoutUrl(savedCheckoutUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`min-h-screen  ${
        state === "bae" ? "bg-bae-primaryLight" : "bg-vouv-primaryLight"
      } text-white md:pt-12`}
    >
      <ProgressBar
        color={`${state === "bae" ? "bg-bae-primary" : "bg-vouv-primary"} `}
        bg={`${
          state === "bae" ? "bg-bae-primaryLighter" : "bg-vouv-primaryLighter"
        } `}
      />
      <div className="bg-black h-6 fixed z-50 top-2 w-full flex flex-col justify-center align-middle">
        <p className="text-center font-baloo">
          Offre black friday : -20% sur tout nos jeux !
        </p>
      </div>

      <div className="relative max-w-4xl lg:max-w-6xl mx-auto px-4">
        <div
          className="fixed top-10 right-4 w-12 h-12 rounded-full bg-black bg-opacity-60 hover:bg-opacity-100 backdrop-blur-md flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 z-50"
          style={{
            maxWidth: "calc(100vw - 16px)",
            right: "max(16px, calc((100vw - 1200px) / 2))",
          }}
          onClick={toggleCart}
        >
          <CartSVG width={24} />
        </div>

        {/* Header */}
        <div className="relative text-center mb-8 md:mb-16 pt-8 md:pt-0">
          <div className="relative flex items-center justify-center transition-all duration-500  h-24 lg:h-32">
            {/* BAE */}
            <h1
              className={`absolute top-1/2 transition-all -translate-y-1/2 duration-500 cursor-pointer font-bold font-baloo ${
                state === "bae"
                  ? "text-bae-primary text-5xl md:text-6xl lg:text-8xl left-1/2 transform -translate-x-1/2"
                  : "text-gray-400 text-5xl md:text-4xl left-[7%] sm:left-[20%] md:left-[30%] hover:text-bae-primary"
              }`}
              onClick={() => handleClick("bae")}
            >
              BAE
            </h1>

            {/* VouV */}
            <h1
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer font-bold font-baloo ${
                state === "vouv"
                  ? "text-vouv-primary text-5xl md:text-6xl lg:text-8xl"
                  : "text-gray-400 text-5xl md:text-4xl left-[80%] sm:left-[70%] md:left-[65%] top-1/2 transform -translate-y-1/2 hover:text-vouv-primary"
              }`}
              onClick={() => handleClick("vouv")}
            >
              VouV
            </h1>
          </div>
          <p className="text-gray-800 font-semibold font-inter text-base md:text-lg lg:text-xl ">
            Commander cette première édition
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 mt-6 mb-10 md:flex-row md:gap-20 lg:mb-40">
          <img
            className={`md:flex-1 min-w-full md:min-w-fit h-72 object-cover md:h-[440px] border-solid border-4 ${
              state === "bae" ? "border-bae-primary" : "border-vouv-primaryDark"
            } rounded-2xl`}
            src={
              state === "bae"
                ? "/images/bae/test1.jpg"
                : "/images/vouv/test1.jpg"
            }
            alt=""
          />

          <div className="flex flex-col text-center md:text-left text-base font-semibold max-w-lg">
            <div className="relative">
              <p className="text-gray-800 text-4xl mb-8 md:text-5xl lg:text-6xl leading-normal md:leading-normal lg:leading-normal font-pacifico">
                PREMIERE EDITION
              </p>
              <img
                src={
                  state === "bae"
                    ? "/images/bae/icon.svg"
                    : "/images/vouv/icon.svg"
                }
                alt=""
                className="absolute -right-3 xl:-right-32  top-14 xl:top-0 w-24 lg:w-48"
              />
            </div>
            <div
              className="flex items-center gap-4 justify-between md:items-center mb-6"
              ref={buttonRef}
            >
              <div className="flex flex-row gap-2  items-center">
                <p className="text-xl line-through text-gray-500 md:text-2xl">
                  14,95 €{" "}
                </p>
                <p className="text-xl text-black md:text-2xl">
                  11,96 €{" "}
                  <span className="text-xs text-gray-800 self-end justify-end align-top">
                    *
                  </span>
                </p>
                <div className="bg-black rounded-lg flex flex-col justify-center h-6 px-1 align-middle">
                  <p className="text-xs">-20%</p>
                </div>
              </div>

              <PreOrderButton onPress={handlePreOrder} hasIcon type={state}>
                Commander
              </PreOrderButton>
            </div>
            <div className="border-[1px] border-gray-500 p-4 rounded-lg flex items-center gap-4 md:gap-6 mb-4">
              <ClockSVG width={50} height={50} className="text-gray-800" />
              <p className="font-inter font-normal text-sm leading-normal text-left text-gray-800 md:text-base">
                Les packs seront expédiés à partir du 1er décembre et livrés
                sous 3 à 5 jours ouvrés, selon votre localisation.
              </p>
            </div>
            <span className="text-xs text-gray-800 text-left">
              *frais de livraison inclus
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-20 mt-6 mb-10 md:flex-row md:gap-20 lg:mb-40">
          <div className="flex flex-col text-base font-semibold max-w-lg text-left">
            <p className="text-gray-800 font-baloo text-2xl leading-snug mb-4 md:text-3xl lg:text-4xl">
              {state === "bae"
                ? "Redécouvrez votre couple"
                : "Découvrez une nouvelle facette de vos amitiés"}
            </p>
            <p className="text-gray-800 flex-1 font-inter font-normal text-sm md:text-base lg:text-lg">
              {state === "bae" ? (
                <>
                  Plongez dans des discussions <strong>profondes</strong> ou{" "}
                  <strong>légères</strong>, apprenez à connaître l’autre sous un{" "}
                  <strong>nouvel angle</strong>, et laissez la{" "}
                  <strong>complicité</strong> se renforcer. Ce jeu, conçu pour
                  vous <strong>surprendre</strong>, vous invite à{" "}
                  <strong>partager</strong>, à <strong>rire</strong>, et à faire
                  grandir votre <strong>amour</strong> à chaque carte.
                </>
              ) : (
                <>
                  Défiez vos amis avec des vérités <strong>amusantes</strong>,
                  des révélations <strong>inattendues</strong> et des
                  discussions <strong>mémorables</strong>. Ce jeu, pensé pour{" "}
                  <strong>bousculer les habitudes</strong>, vous invite à{" "}
                  <strong>rire</strong>, à <strong>partager des secrets</strong>
                  , et à renforcer vos <strong>liens</strong> à chaque carte.
                </>
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 ">
            <Card
              state={state}
              content={
                state === "bae"
                  ? "Aimes-tu les discussions coquines ou les sextos ?"
                  : "Confesse la chose la plus stupide que tu aies faite par amour ou par amitié."
              }
            />
            <Card
              state={state}
              content={
                state === "bae"
                  ? "Si tu pouvais me décrire en trois qualités, lesquelles seraient-elles ?"
                  : "Donne une chose que peu de gens savent sur toi."
              }
            />
            <Card
              state={state}
              content={
                state === "bae"
                  ? "Avoue si tu as déjà été attiré(e) par un(e) ami(e) proche."
                  : "Avoue qui ici serait le pire choix pour garder un secret."
              }
            />
            <Card
              state={state}
              content={
                state === "bae"
                  ? "Si tu pouvais m'emmener dans un endroit spécial pour une soirée romantique, où irions-nous ?"
                  : "Avoue qui ici te plaît le plus physiquement."
              }
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-12 mt-8 mb-12 md:flex-row md:gap-24 md:mb-40 ">
          {/* Image */}
          <div className=" relative flex-1 w-full sm:w-5 px-6 sm:px-0">
            <img
              src={
                state === "bae"
                  ? "/images/bae/icon.svg"
                  : "/images/vouv/icon.svg"
              }
              alt=""
              className="absolute left-10 md:left-24 xl:-right-32  -top-20 xl:-top-36 w-24 lg:w-48 -rotate-45"
            />
            <Slider {...settings}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <img
                    src={`/images/${logo}/image_${i}.png`}
                    className="w-full md:w-60"
                  />
                </div>
              ))}
            </Slider>
            <Paginator
              currentSlide={currentSlide}
              totalSlides={4}
              color={state === "bae" ? "bg-bae-primary" : "bg-vouv-primary"}
            />
          </div>

          {/* Texte */}
          <div className="order-1 md:order-2 flex flex-col text-lg font-semibold max-w-lg text-left">
            <p className="text-gray-800 font-baloo text-3xl leading-normal mb-4 md:text-4xl">
              L'application qui devient réalité
            </p>
            <p className="text-gray-800 flex-1 font-inter font-normal text-base md:text-normal">
              {state === "bae" ? (
                <>
                  Après le succès de notre <strong>application mobile</strong>,
                  découvrez maintenant sa <strong>version physique</strong> ! Ce
                  jeu de cartes offre une expérience <strong>immersive</strong>{" "}
                  et <strong>ludique</strong> inédite grâce à{" "}
                  <strong>100 questions exclusives</strong> jamais vues dans
                  l'application. Retrouvez vos <strong>thèmes préférés</strong>{" "}
                  et plongez dans une <strong>aventure unique</strong> à deux,
                  où que vous soyez, avec le plaisir tactile des{" "}
                  <strong>cartes en main</strong>.
                </>
              ) : (
                <>
                  Découvrez la <strong>version physique</strong> de notre{" "}
                  <strong>application mobile</strong> et redonnez vie à vos{" "}
                  <strong>soirées entre amis</strong> ! Avec{" "}
                  <strong>100 vérités inédites et amusantes</strong>, ce jeu de
                  cartes vous promet des <strong>fous rires</strong>, des{" "}
                  <strong>confessions surprenantes</strong>, et des{" "}
                  <strong>moments inoubliables</strong>. Transformez chaque
                  instant partagé en un <strong>souvenir mémorable</strong>,
                  avec le plaisir authentique des{" "}
                  <strong>cartes en main</strong>.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Section finale */}
        <div className="mt-6 mb-10">
          <h3 className="relative text-center mb-8 md:mb-20 text-3xl font-baloo font-semibold text-gray-800 md:text-4xl lg:text-5xl z-10">
            Pour plus de fun
            <span
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-0  ${
                state === "bae"
                  ? "bg-bae-primaryLighter"
                  : "bg-vouv-primaryLighter"
              } h-4 w-60 md:w-60 lg:w-96 z-[-1]`}
            />
          </h3>

          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
            <div className="flex flex-col text-base font-semibold max-w-lg text-left">
              <p className="text-gray-800 font-baloo text-2xl leading-snug mb-4 md:text-3xl lg:text-4xl">
                {state === "bae" ? "Vérité ou Vérité" : "Baez"}
              </p>
              <p className="text-gray-800 flex-1 font-inter font-normal text-sm md:text-base lg:text-lg mb-8">
                {state === "bae" ? (
                  <>
                    Découvrez aussi nos <strong>autres jeux</strong> qui sauront{" "}
                    <strong>animer vos soirées</strong> et créer des{" "}
                    <strong>moments inoubliables</strong>. Laissez-vous tenter
                    par <strong>'Vérité ou Vérité'</strong>, le jeu qui{" "}
                    <strong>révèle tout</strong>, et bien plus encore.
                    Préparez-vous à <strong>rire</strong>, à{" "}
                    <strong>partager</strong> et à{" "}
                    <strong>vous surprendre</strong>, à chaque carte.
                  </>
                ) : (
                  <>
                    Explorez nos <strong>autres jeux</strong> qui donneront une{" "}
                    <strong>nouvelle dimension</strong> à vos soirées. Plongez
                    dans <strong>'Bae'</strong>, conçu pour{" "}
                    <strong>renforcer vos liens</strong> et{" "}
                    <strong>raviver votre complicité</strong>.{" "}
                    <strong>Rires</strong>, discussions et{" "}
                    <strong>moments uniques</strong> garantis, à chaque carte.
                  </>
                )}
              </p>

              <div>
                <PreOrderButton onPress={() => {}} type={state}>
                  Découvrir
                </PreOrderButton>
              </div>
            </div>
            <div className="relative md:flex-1 min-w-full md:min-w-fit h-72 object-cover md:h-96">
              <img
                src={
                  state === "bae"
                    ? "/images/bae/icon.svg"
                    : "/images/vouv/icon.svg"
                }
                alt=""
                className="absolute right-0 -top-20 xl:-top-36 w-24 lg:w-48 "
              />
              <img
                className={`relative md:flex-1 min-w-full h-72 object-cover md:h-96 border-solid border-4 z-10 ${
                  state === "bae"
                    ? "border-bae-primary"
                    : "border-vouv-primaryDark"
                } rounded-2xl`}
                src="/images/twice-products.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <CartModal
          isOpen={isCartOpen}
          onClose={toggleCart}
          checkoutId={checkoutId}
          checkoutUrl={checkoutUrl}
        />

        {/* Élément fixe */}
        {!isButtonVisible && !isCartOpen && (
          <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 px-4">
            <div className="bg-black bg-opacity-70 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-full max-w-sm sm:max-w-lg md:max-w-4xl lg:max-w-6xl">
              {/* Texte */}
              <div className="md:flex flex-col hidden">
                <p className="text-sm font-bold font-baloo sm:text-base md:text-lg">
                  Première édition de{" "}
                  {state === "bae" ? "BAE ❤️" : "Vérité ou Vérité"}
                </p>
                <div className="flex flex-row gap-2">
                  <p className="text-xs sm:text-sm md:text-base line-through text-gray-500">
                    14,95 €
                  </p>
                  <p className="text-xs sm:text-sm md:text-base ">11,96 €</p>
                  <div className="bg-black rounded-lg flex flex-col justify-center h-6 px-1 align-middle">
                    <p className="text-xs">-20%</p>
                  </div>
                </div>
              </div>

              {/* Bouton */}
              <PreOrderButton
                onPress={handlePreOrder}
                hasIcon
                fullWidth
                type={state}
              >
                Commander
              </PreOrderButton>
            </div>
          </div>
        )}
      </div>
      <Footer color={state === "bae" ? "bg-bae-primary" : "bg-vouv-primary"} />
    </div>
  );
}
