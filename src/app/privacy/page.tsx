import { PrivacyPageContent } from "@/components/page/Privacy";

export default function PrivacyPage() {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <PrivacyPageContent />
            </div>
        </div>
    );
}
