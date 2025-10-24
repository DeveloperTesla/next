// src/components/page/NotFound.tsx
import Link from "next/link";
import {
    Empty,
    EmptyContent,
    EmptyMedia,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPageContent() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <CircleAlert />
                </EmptyMedia>
                <EmptyTitle>404 - Page Not Found</EmptyTitle>
                <EmptyDescription>
                    Oops! The page you&apos;re looking for doesn&apos;t exist or
                    has been moved.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" asChild>
                    <Link href="/">Go Home</Link>
                </Button>
            </EmptyContent>
        </Empty>
    );
}
