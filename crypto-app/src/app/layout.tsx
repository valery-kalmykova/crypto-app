import "./globals.css";
import styles from "./page.module.css";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { CurrencyProvider } from "@/context/currencies";

export const metadata: Metadata = {
  title: "Crypto Price Alert",
  description: "Telegram notifications when target crypto price reached",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CurrencyProvider>
          <div className={styles.section}>
            <div className={styles.item__header}>
              <Header />
            </div>
            <div className={styles.item__main}>{children}</div>
            <div className={styles.item__sidebar}>
              <Sidebar />
            </div>
          </div>
        </CurrencyProvider>
      </body>
    </html>
  );
}
