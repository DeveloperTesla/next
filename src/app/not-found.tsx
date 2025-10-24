"use client";

import { NotFoundPageContent } from "@/components/page/NotFound";

export default function NotFoundPage() {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <NotFoundPageContent />
            </div>
        </div>
    );
}
