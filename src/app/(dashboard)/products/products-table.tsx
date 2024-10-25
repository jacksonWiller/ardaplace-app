"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "./product";
import { PagedInfoModel } from "@/models/PagedInfoModel";
import { ProductModel } from "@/models/ProductModel";
import { PaginationComponent } from "@/components/pagination";

export function ProductsTable({
  products,
  pagedInfo,
}: {
  products: ProductModel[];
  pagedInfo: PagedInfoModel;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <div className="text-sm text-muted-foreground">
          Showing {(pagedInfo.pageNumber - 1) * pagedInfo.pageSize + 1} to{" "}
          {Math.min(
            pagedInfo.pageNumber * pagedInfo.pageSize,
            pagedInfo.totalRecords
          )}{" "}
          of {pagedInfo.totalRecords} products
        </div>
        <PaginationComponent {...pagedInfo} />
      </CardFooter>
    </Card>
  );
}
