import { ReactNode } from 'react';

export const metadata = {
  title: 'My Next.js App',
  description: 'Industrial-standard Next.js App Router setup',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
