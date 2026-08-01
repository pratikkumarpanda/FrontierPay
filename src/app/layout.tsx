import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrontierPay | Modern Global Treasury",
  description: "Enterprise-grade cross-border payments and treasury management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GitHub Pages deep-link restore: reads path saved by 404.html and
            applies it via history.replaceState before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var redirect = sessionStorage.getItem('ghpages_redirect');
                if (redirect) {
                  sessionStorage.removeItem('ghpages_redirect');
                  if (redirect !== location.pathname + location.search + location.hash) {
                    history.replaceState(null, null, redirect);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
