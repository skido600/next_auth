import type { Metadata } from "next";
import { Provider } from "./provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body>
          {children} <Toaster />
        </body>
      </Provider>
    </html>
  );
}
