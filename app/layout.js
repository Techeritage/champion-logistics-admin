import { Toaster } from "react-hot-toast";
import "../public/ClashDisplay_Complete/Fonts/WEB/css/clash-display.css";
import SideNavBar from "./components/SideNavBar";
import "./globals.css";

export const metadata = {
  title: "Champion Logistics - Admin",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-clash">
        <SideNavBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
