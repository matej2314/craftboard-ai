import { ReactNode } from "react"

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='w-screen h-screen bg-black flex justify-center items-center'
      >
        {children}
      </body>
    </html>
  );
}
