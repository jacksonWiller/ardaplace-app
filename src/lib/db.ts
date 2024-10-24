import 'server-only';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export function productsList() {
  return [
    {
      id: 1,
      imageUrl: 'https://example.com/image1.jpg',
      name: 'Produto 1',
      status: 'active',
      price: 99.99,
      stock: 10,
      availableAt: new Date('2023-01-01T00:00:00Z')
    },
    {
      id: 2,
      imageUrl: 'https://example.com/image2.jpg',
      name: 'Produto 2',
      status: 'inactive',
      price: 199.99,
      stock: 5,
      availableAt: new Date('2023-02-01T00:00:00Z')
    },
    {
      id: 3,
      imageUrl: 'https://example.com/image3.jpg',
      name: 'Produto 3',
      status: 'archived',
      price: 299.99,
      stock: 0,
      availableAt: new Date('2023-03-01T00:00:00Z')
    },
    {
      id: 4,
      imageUrl: 'https://example.com/image4.jpg',
      name: 'Produto 4',
      status: 'active',
      price: 49.99,
      stock: 20,
      availableAt: new Date('2023-04-01T00:00:00Z')
    },
    {
      id: 5,
      imageUrl: 'https://example.com/image5.jpg',
      name: 'Produto 5',
      status: 'inactive',
      price: 149.99,
      stock: 15,
      availableAt: new Date('2023-05-01T00:00:00Z')
    },
    {
      id: 6,
      imageUrl: 'https://example.com/image6.jpg',
      name: 'Produto 6',
      status: 'archived',
      price: 249.99,
      stock: 8,
      availableAt: new Date('2023-06-01T00:00:00Z')
    },
    {
      id: 7,
      imageUrl: 'https://example.com/image7.jpg',
      name: 'Produto 7',
      status: 'active',
      price: 79.99,
      stock: 12,
      availableAt: new Date('2023-07-01T00:00:00Z')
    },
    {
      id: 8,
      imageUrl: 'https://example.com/image8.jpg',
      name: 'Produto 8',
      status: 'inactive',
      price: 179.99,
      stock: 7,
      availableAt: new Date('2023-08-01T00:00:00Z')
    },
    {
      id: 9,
      imageUrl: 'https://example.com/image9.jpg',
      name: 'Produto 9',
      status: 'archived',
      price: 279.99,
      stock: 3,
      availableAt: new Date('2023-09-01T00:00:00Z')
    },
    {
      id: 10,
      imageUrl: 'https://example.com/image10.jpg',
      name: 'Produto 10',
      status: 'active',
      price: 89.99,
      stock: 25,
      availableAt: new Date('2023-10-01T00:00:00Z')
    },
    {
      id: 11,
      imageUrl: 'https://example.com/image11.jpg',
      name: 'Produto 11',
      status: 'inactive',
      price: 189.99,
      stock: 18,
      availableAt: new Date('2023-11-01T00:00:00Z')
    },
    {
      id: 12,
      imageUrl: 'https://example.com/image12.jpg',
      name: 'Produto 12',
      status: 'archived',
      price: 289.99,
      stock: 6,
      availableAt: new Date('2023-12-01T00:00:00Z')
    },
    {
      id: 13,
      imageUrl: 'https://example.com/image13.jpg',
      name: 'Produto 13',
      status: 'active',
      price: 59.99,
      stock: 22,
      availableAt: new Date('2024-01-01T00:00:00Z')
    },
    {
      id: 14,
      imageUrl: 'https://example.com/image14.jpg',
      name: 'Produto 14',
      status: 'inactive',
      price: 159.99,
      stock: 9,
      availableAt: new Date('2024-02-01T00:00:00Z')
    },
    {
      id: 15,
      imageUrl: 'https://example.com/image15.jpg',
      name: 'Produto 15',
      status: 'archived',
      price: 259.99,
      stock: 4,
      availableAt: new Date('2024-03-01T00:00:00Z')
    }
  ];
}

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  const allProducts = productsList();

  if (search) {
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    return {
      products: filteredProducts,
      newOffset: null,
      totalProducts: filteredProducts.length
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  const paginatedProducts = allProducts.slice(offset, offset + 5);
  const newOffset = paginatedProducts.length >= 5 ? offset + 5 : null;

  return {
    products: paginatedProducts,
    newOffset,
    totalProducts: allProducts.length
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}