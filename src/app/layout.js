import { ModalProvider } from "@/components/ModalProvider";
import "./globals.css";

export const metadata = {
  title: "Robert Lewis Portfolio",
  description: "Showcasing projects, skills, and more.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-background text-foreground">
        <ModalProvider>
          <main>{children}</main>
        </ModalProvider>
      </body>
    </html>
  );
}
