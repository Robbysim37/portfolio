import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ModalProvider } from "@/app/providers/ModalProvider";
import { SongsPlayedProvider } from "@/app/providers/SongsPlayedProvider";

export const metadata = {
  title: "Robert Lewis Portfolio",
  description: "Showcasing projects, skills, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased scroll-smooth bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SongsPlayedProvider>
            <ModalProvider>
              <main>{children}</main>
            </ModalProvider>
          </SongsPlayedProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}