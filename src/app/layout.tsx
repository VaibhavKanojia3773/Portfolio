import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaibhav Kanojia",
  description:
    "Building reliable, production-grade ML systems. Published at IJCNLP-AACL 2025. Top 1% Amazon ML Challenge.",
  keywords: [
    "Machine Learning",
    "ML Engineer",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Portfolio",
    "Vaibhav Kanojia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('portfolio-theme');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased
          bg-slate-50 text-slate-900
          dark:bg-[#030712] dark:text-slate-100
          transition-colors duration-300`}
      >
        <ThemeProvider>
          <CustomCursor />
          <div className="noise">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
