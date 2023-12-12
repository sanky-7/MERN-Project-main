import { Navbar, Footer } from "@/components";
import "/app/globals.css";

export const metadata = {
  title: "Bike Hub",
  description: "Online Bike Showroom",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-slate-300">
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
