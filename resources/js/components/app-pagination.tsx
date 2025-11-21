import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type AppPaginationProps = {
    links: {
        url: string;
        page: number;
        active: boolean;
    }[];
    current_page: number;
};

function AppPagination({ links, current_page }: AppPaginationProps) {
    if (links.length < 4 && current_page == 1) {
        return;
    }

    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, i) => {
                    if (i == 0) {
                        return (
                            <PaginationItem>
                                <PaginationPrevious href={link.url} />
                            </PaginationItem>
                        );
                    }

                    if (i == links.length - 1) {
                        return (
                            <PaginationItem>
                                <PaginationNext href={link.url} />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem>
                            <PaginationLink
                                href={link.url}
                                isActive={link.active}
                            >
                                {link.page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}

export default AppPagination;
