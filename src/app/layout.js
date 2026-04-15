import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import { LangProvider } from '../components/Langcontext';
import Footer from '../components/Footer'
import Sticky from '../components/Sticky'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tarinoks | Professional Kitchen Equipment",
  description: "Georgia's #1 supplier of professional kitchen equipment. Browse our full range of commercial-grade appliances, tools, and solutions for restaurants, hotels, and catering businesses.",
  keywords: "professional kitchen equipment, commercial kitchen, restaurant equipment, Georgia, Tarinoks",
  openGraph: {
    title: "Tarinoks | Professional Kitchen Equipment",
    description: "Georgia's #1 supplier of professional kitchen equipment.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LangProvider>
          <Header />
          {children}
          <Footer/>
          <Sticky />
        </LangProvider>
        
      </body>
    </html>
  );
}