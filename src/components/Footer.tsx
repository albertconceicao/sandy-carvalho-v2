import type { SiteContent } from "@/content/types";

type FooterProps = {
  global: SiteContent["global"];
};

const Footer = ({ global }: FooterProps) => {
  return (
    <footer className="w-full border-t border-border/60 bg-background text-center text-sm text-muted-foreground">
      <div className="container space-y-2 py-10">
        <p className="font-semibold text-destructive">{global.footerWarning}</p>
        <p>{global.footerCvv}</p>
        <p>{global.footerEmergency}</p>
      </div>
    </footer>
  );
};

export default Footer;
