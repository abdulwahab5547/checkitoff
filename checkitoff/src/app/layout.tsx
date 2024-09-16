import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../app/functions/auth-context';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "checkitoff - a minimal to-do list app",
  description: "minimal to-do list app to keep track of your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <head>
      <link rel="icon" href="https://res.cloudinary.com/dhyshxpc1/image/upload/fl_preserve_transparency/v1726420219/favicon.ico_1_hnwfwq.jpg?_s=public-apps"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark text-white pb-10`}
      >
        <Toaster />
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}
