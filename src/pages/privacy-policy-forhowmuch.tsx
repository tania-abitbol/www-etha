import React from "react";
import { ProgressBar } from "~/components/progressBar";
import "~/app/globals.css";

const PrivacyPolicyForHowMuch = () => (
  <main>
    <div className="min-h-screen px-8 md:px-32 pt-12 max-w-5xl m-auto">
      <ProgressBar />
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-blue-700">
        Politique de Confidentialité Pour Combien
      </h1>
      <p className="text-lg mb-6 text-gray-700 leading-relaxed">
        Pour Combien, (ci-après « nous », « notre », ou « nos ») respecte la vie
        privée de ses utilisateurs (ci-après « utilisateur », « vous » ou «
        votre ») et s'engage à protéger les données personnelles collectées
        lorsque vous utilisez notre application de jeu entre amis alcoolisées
        (ci-après « l'Application »). Cette Politique de Confidentialité
        explique comment nous collectons, utilisons, divulguons, et sécurisons
        vos informations lorsque vous utilisez notre Application.
      </p>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          1. Collecte d'Informations
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Nous collectons des informations qui ne vous identifient pas
          personnellement. L'Application peut collecter des informations
          relatives à votre utilisation, comme les fonctionnalités utilisées et
          le temps passé sur l'Application.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          2. Utilisation des Informations
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Les informations collectées peuvent être utilisées pour :
        </p>
        <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
          <li>Fournir, maintenir et améliorer l'Application.</li>
          <li>Personnaliser votre expérience de jeu.</li>
          <li>
            Communiquer avec vous, y compris pour vous envoyer des mises à jour
            de l'Application et des informations marketing, si vous l'avez
            autorisé.
          </li>
          <li>Réaliser des analyses pour améliorer l'Application.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          3. Partage des Informations
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Nous ne partageons vos informations personnelles avec des tiers que
          dans les cas suivants :
        </p>
        <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
          <li>Avec votre consentement.</li>
          <li>
            Pour se conformer à la loi ou répondre à des procédures légales.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          4. Sécurité des Données
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Nous prenons des mesures de sécurité pour protéger vos informations
          personnelles contre l'accès non autorisé, la modification, la
          divulgation ou la destruction. Cependant, aucun système n'est
          totalement sécurisé, et nous ne pouvons garantir la sécurité absolue
          de vos informations.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">5. Vos Droits</h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Vous avez le droit d'accéder, de corriger, de supprimer vos données
          personnelles, ou de vous opposer à leur traitement en nous contactant
          via les coordonnées fournies dans cette politique.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          6. Modifications de la Politique de Confidentialité
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Nous pouvons mettre à jour cette Politique de Confidentialité de temps
          à autre. Nous vous informerons de tout changement en publiant la
          nouvelle politique sur cette page.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          7. Contactez-Nous
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Pour toute question ou préoccupation concernant cette Politique de
          Confidentialité, veuillez nous contacter à{" "}
          <a href="mailto:tania@etha.app" className="text-blue-500 underline">
            tania@etha.app
          </a>
          .
        </p>
      </section>
      <p className="text-lg mb-3 text-gray-700 leading-relaxed">
        En utilisant l'Application, vous consentez à la collecte, l'utilisation,
        la divulgation et la protection de vos informations comme décrit dans
        cette Politique de Confidentialité.
      </p>
    </div>
  </main>
);

export default PrivacyPolicyForHowMuch;
