export const Footer = ({ color }: { color: string }) => {
  return (
    <footer
      className={` ${color} px-12 py-9 flex justify-between items-start md:px-44 pt-12 mt-20 md:mt-40 m-auto`}
    >
      <div className="md:flex md:gap-24">
        <div className="md:flex-col">
          <p className="text-white text-xl font-bold mb-2">Etha</p>
          <div className="flex flex-col gap-1 mb-8">
            <a href="mailto:contact@etha.app" className="underline text-white">
              Nous contacter
            </a>
            <a href="" className="underline text-white">
              Qui sommes-nous ?
            </a>
            <a href="" className="underline text-white">
              International
            </a>
          </div>
        </div>
        <div className="md:flex-col">
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
      </div>
      <img src="/logo-white.svg" alt="" className="w-16" />
    </footer>
  );
};
