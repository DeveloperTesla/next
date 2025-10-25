import type { Metadata } from "next";
import "./globals.css";
import Logo from "@/components/content/Logo";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import SelfXSSWarning from "@/components/utils/SelfXSSWarning";
import { Navbar } from "@/components/content/Navbar";

export const metadata: Metadata = {
    title: "Next",
    description:
        "A boilerplate template for building modern websites with Next.js and Supabase, designed for fast development and easy customization.",
};

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html id="next-supabase" lang="en" dir="ltr" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="absolute left-[30px] top-[30px] w-10 h-10">
                        <Link href="/" className="block w-full h-full">
                            <Logo />
                        </Link>
                    </div>
                    {children}
                    <Navbar />
                </ThemeProvider>
                <SelfXSSWarning />
            </body>
        </html>
    );
}
