import { AppSection } from "~/components/AppSection";
import { ProgressBar } from "~/components/progressBar";

export default function Home() {
  return (
    <main className="min-h-screen px-12 pt-12">
      <ProgressBar />
      <header className="flex justify-between items-center mb-16">
        <img src="/logo.svg" alt="" className="w-10 h-10" />
        <a
          href="mailto:hespelenzo@gmail.com"
          className="text-sm text-yellow uppercase font-semibold hover:underline"
        >
          Nous contacter
        </a>
      </header>
      <p className="text-2xl font-semibold text-center px-6 leading-normal mb-14">
        LE STUDIO DE CRÉATION{" "}
        <span className="text-white rotating-background">D’APPLICATIONS</span>{" "}
        MOBILE DE DIVERTISSEMENTS
      </p>

      <AppSection
        name="Bae : Jeu de couple"
        logo="bae"
        description="Si vous êtes à la recherche d'une application qui vous permettra de
        redécouvrir votre relation amoureuse, de renforcer votre lien émotionnel
        et de briser la routine quotidienne, vous serez ravis de découvrir Bae,
        l'application de quiz pour couples !"
        iosLink=""
        androidLink=""
      />

      <AppSection
        name="VÉRITÉ ou VÉRITÉ"
        logo="vérité"
        description="Découvrez Vérité ou Vérité, une application qui transforme votre smartphone en l'accessoire ultime pour animer vos soirées entre amis. Plongez dans une aventure sociale captivante avec Vérité ou Vérité, l'application dynamique qui redéfinit le divertissement en groupe !"
        iosLink=""
        androidLink=""
        reversed
      />
      <AppSection
        name="Pour Combien ?"
        logo="pcb"
        description="Pour Combien est une application sociale innovante qui pimente chaque rassemblement en mettant à l'épreuve la bravoure et l'esprit d'aventure de vos amis. Idéale pour les soirées, cette application vous permet de lancer des défis audacieux ou humoristiques à vos amis, en leur demandant : 'Pour combien tu ferais ça ?'"
        iosLink=""
        androidLink=""
      />
      <img src="/images/map.svg" alt="" className="w-full mt-20 mb-5" />
      <h3 className="text-3xl font-bold mb-4">International</h3>
      <p className="text-sm leading-normal mb-24 text-gray text-justify">
        Nos applications connaissent un grand succès et sont actuellement
        disponibles et activement utilisées dans de nombreux pays à travers le
        monde, notamment dans les régions hispanophones, anglophones et
        francophones. Que ce soit en Espagne, au Mexique, aux États-Unis, au
        Royaume-Uni, en France ou au Canada, nos applications continuent de
        divertir des millions de personnes.
      </p>

      <div className="flex flex-col mb-6">
        <h3 className="text-6xl font-bold mb-2">
          5<span className="text-yellow">+</span>
        </h3>
        <p className="font-bold text-gray">Nouvelles applications en 1 an</p>
      </div>

      <div className="flex flex-col mb-6">
        <div className="self-end">
          <h3 className="text-6xl font-bold mb-2 self-end">
            500K<span className="text-yellow">+</span>
          </h3>
          <p className="font-bold text-gray self-end">Téléchargements</p>
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <h3 className="text-6xl font-bold mb-2">
          240<span className="text-yellow">+</span>
        </h3>
        <p className="font-bold text-gray">Notes positives</p>
      </div>

      <div className="flex flex-col mb-10">
        <div className="self-end">
          <h3 className="text-6xl font-bold mb-2 self-end">
            50<span className="text-yellow">+</span>
          </h3>
          <p className="font-bold text-gray self-end">Pays touchées</p>
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-4">Les chiffres</h3>
      <p className="text-sm leading-normal mb-24 text-gray text-justify">
        Nous sommes transparents quant à nos chiffres et fiers de voir que des
        personnes du monde entier passent des moments de qualité avec leurs
        proches grâce à nos applications. Nous nous engageons à offrir des
        expériences enrichissantes et divertissantes, renforçant les liens entre
        amis et familles.
      </p>
      <div className="flex justify-between mb-9">
        <img
          src="/images/enzo.png"
          alt="image de Enzo"
          className="grayscale w-32"
        />
        <img
          src="/images/tania.png"
          alt="image de Tania"
          className="grayscale w-32"
        />
      </div>

      <h3 className="text-3xl font-bold mb-4">
        Qui sommes nous <span className="text-yellow`">?</span>
      </h3>
      <p className="text-sm leading-normal mb-24 text-gray text-justify">
        Nous sommes transparents quant à nos chiffres et fiers de voir que des
        personnes du monde entier passent des moments de qualité avec leurs
        proches grâce à nos applications. Nous nous engageons à offrir des
        expériences enrichissantes et divertissantes, renforçant les liens entre
        amis et familles.
      </p>
      <h3 className="font-medium text-3xl mb-12 leading-normal">
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

      <button className="bg-black text-white w-full text-xl font-semibold uppercase py-3 px-4 rounded-xl mb-24">
        Nous contacter
      </button>

      <footer className="bg-black mx-[-48px] px-12 py-9 flex justify-between items-start">
        <div>
          <p className="text-white text-xl font-bold mb-2">Etha</p>
          <div className="flex flex-col gap-1 mb-8">
            <a href="" className="underline text-white">
              Nous contacter
            </a>
            <a href="" className="underline text-white">
              Qui sommes-nous ?
            </a>
            <a href="" className="underline text-white">
              International
            </a>
          </div>

          <p className="text-white text-xl font-bold mb-2">Nos applications</p>

          <div className="flex flex-col gap-1">
            <a href="" className="underline text-white">
              Bae : jeu de couple
            </a>
            <a href="" className="underline text-white">
              Vérité ou Vérité
            </a>
            <a href="" className="underline text-white">
              Pour combien ?
            </a>
          </div>
        </div>
        <img src="/logo-white.svg" alt="" className="w-16" />
      </footer>
    </main>
  );
}
