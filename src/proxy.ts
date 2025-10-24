import { NextResponse, NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const whitelist = [
    "/",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/privacy",
    "/terms",
    "/otp",
];

export async function proxy(req: NextRequest) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const pathname = req.nextUrl.pathname;
    const isWhitelisted = whitelist.includes(pathname);

    // 🚫 Uživatel není přihlášený a není na whitelist stránce
    if (!session && !isWhitelisted) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // ✅ Uživatel je přihlášen
    if (session) {
        const user = session.user;
        const otpVerified = user.user_metadata?.otp_verified === true;

        // ⛔ Pokud není ověřený, pošleme ho na /otp
        if (!otpVerified && pathname !== "/otp") {
            const otpUrl = new URL("/otp", req.url);
            otpUrl.searchParams.set("email", user.email ?? "");
            return NextResponse.redirect(otpUrl);
        }

        // ✅ Je ověřený a je na root ("/") → pošli ho na /dashboard
        if (otpVerified && pathname === "/") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    return res;
}

export const config = {
    matcher: ["/((?!_next|static|.*\\..*|favicon.ico).*)"],
};
