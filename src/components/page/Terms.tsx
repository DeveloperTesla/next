// src/components/page/Privacy.tsx
import Link from "next/link";
import { IconFolderCode } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";

export function TermsPageContent() {
    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconFolderCode />
                </EmptyMedia>
                <EmptyTitle>No Content Yet</EmptyTitle>
                <EmptyDescription>
                    There is currently no content to display on this page.
                    Please check back later.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Link href="/">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                    >
                        Go To Home
                    </Button>
                </Link>
            </EmptyContent>
        </Empty>
    );
}
