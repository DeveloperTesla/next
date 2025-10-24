"use client";

import { Dashboard } from "@/components/backend/Dashboard";

export default function DashboardPage() {
    return (
        <div>
            <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <Dashboard />
            </div>
        </div>
    );
}
