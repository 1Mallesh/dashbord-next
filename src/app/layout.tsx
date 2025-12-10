import { ReactNode } from 'react';
import "../styles/globals.css";

export const metadata = {
  title: 'My Next.js App',
  description: 'Industrial-standard Next.js App Router setup',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
