import type { SiteContent } from "@/lib/content/types";

type FooterProps = {
  global: SiteContent["global"];
};

const Footer = ({ global }: FooterProps) => {
  return (
    <footer className="w-full py-8 bg-gray-100 dark:bg-gray-900 text-center text-sm text-muted-foreground">
      <div className="container px-4 md:px-6 space-y-2">
        <p className="font-semibold text-red-600 dark:text-red-400">{global.footerWarning}</p>
        <p>{global.footerCvv}</p>
        <p>{global.footerEmergency}</p>
      </div>
    </footer>
  );
};

export default Footer;
