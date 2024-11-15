
import "./globals.css";

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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
