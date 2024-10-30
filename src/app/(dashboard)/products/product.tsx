"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductModel } from "@/models/ProductModel";

export function Product({ product }: { product: ProductModel }) {
  const imageUrl = product.images[0]?.url
    ? `http://s3.localhost.localstack.cloud:4566/jacksonlocal/${product.images[0].url}`
    : "/product-not-found.png";
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.category} {/* Assuming category represents status */}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price.toFixed(
        2
      )}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.stockQuantity}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {/* Add created at date if available in your Product type */}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form>
                <input type="hidden" name="id" value={product.id} />
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
