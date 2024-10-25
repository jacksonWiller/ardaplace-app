import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from '@/app/(dashboard)/products/products-table';
import { productService } from '@/services/productServices';
import Link from 'next/link';

export default async function ProductsPage(
  props: {
    searchParams: { q?: string; pageNumber?: string; pageSize?: string };
  }
) {
  const { q, pageNumber, pageSize } = props.searchParams;
  const search = q ?? '';
  const page = parseInt(pageNumber ?? '1', 10);
  const size = parseInt(pageSize ?? '5', 10);

  const { products, pagedInfo } = await productService.getProducts(search, undefined, page, size);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Link href="/products/create">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all">
      {pagedInfo && (
        <ProductsTable
          products={products}
          pagedInfo={pagedInfo}
        />
      )}
      </TabsContent>
    </Tabs>
  );
}