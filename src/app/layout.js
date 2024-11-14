
import "./globals.css";

import NavBar from "@/components/NavBar";
import { AuthProvider } from "./Provider";

export const metadata = {
  title: "To Do App",
  description: "App by Leyuh made with Next, Mongo, and Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
