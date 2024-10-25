"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PagedInfoModel } from "@/models/PagedInfoModel";

export function PaginationComponent(pagedInfo: PagedInfoModel) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNumber", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      pagedInfo.pageNumber - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(
      pagedInfo.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={createPageURL(i)}
            isActive={i === pagedInfo.pageNumber}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageLinks;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              pagedInfo.pageNumber > 1
                ? createPageURL(pagedInfo.pageNumber - 1)
                : "#"
            }
            aria-disabled={pagedInfo.pageNumber === 1}
          />
        </PaginationItem>

        {pagedInfo.pageNumber > 3 && (
          <>
            <PaginationItem>
              <PaginationLink href={createPageURL(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {renderPageLinks()}

        {pagedInfo.pageNumber < pagedInfo.totalPages - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={createPageURL(pagedInfo.totalPages)}>
                {pagedInfo.totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={
              pagedInfo.pageNumber < pagedInfo.totalPages
                ? createPageURL(pagedInfo.pageNumber + 1)
                : "#"
            }
            aria-disabled={pagedInfo.pageNumber === pagedInfo.totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
