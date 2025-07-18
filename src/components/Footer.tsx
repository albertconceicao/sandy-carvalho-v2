import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-gray-100 dark:bg-gray-900 text-center text-sm text-muted-foreground">
      <div className="container px-4 md:px-6 space-y-2">
        <p className="font-semibold text-red-600 dark:text-red-400">
          Atenção: Este site não oferece atendimento imediato a pessoas em crise suicida.
        </p>
        <p>
          Em caso de crise ligue para o CVV – <span className="font-bold">188</span>
        </p>
        <p>
          Em caso de emergência, procure o hospital mais próximo. Havendo risco de morte, ligue imediatamente para o SAMU (telefone <span className="font-bold">192</span>).
        </p>
      </div>
    </footer>
  );
};

export default Footer;