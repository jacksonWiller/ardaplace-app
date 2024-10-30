"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { productService } from "@/services/productServices";
import { toast } from "@/hooks/use-toast";
import DragAndDrop from "@/components/upload";

const productSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do produto deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  category: z.string().min(2, {
    message: "A categoria deve ter pelo menos 2 caracteres.",
  }),
  price: z.number().min(0, {
    message: "O preço deve ser um número positivo.",
  }),
  stockQuantity: z.number().int().min(0, {
    message: "A quantidade em estoque deve ser um número inteiro não negativo.",
  }),
  sku: z.string().min(2, {
    message: "O SKU deve ter pelo menos 2 caracteres.",
  }),
  brand: z.string().min(2, {
    message: "A marca deve ter pelo menos 2 caracteres.",
  }),
});

export function RegisterProductForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      stockQuantity: 0,
      sku: "",
      brand: "",
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setIsLoading(true);
    try {
      await productService.createProduct(values, files);
      toast({
        title: "Produto registrado com sucesso",
        description: "O novo produto foi adicionado ao banco de dados.",
      });
      router.push("/products");
    } catch (error) {
      toast({
        title: "Erro",
        description:
          "Houve um problema ao registrar o produto. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="files"
          render={() => (
            <FormItem>
              <FormLabel>Upload de Arquivos</FormLabel>
              <FormControl>
                <DragAndDrop onFilesChange={setFiles} />
              </FormControl>
              <FormDescription>
                Arraste e solte arquivos ou clique para selecionar arquivos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do produto" {...field} />
              </FormControl>
              <FormDescription>
                O nome do produto como aparecerá para os clientes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite a descrição do produto"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Uma descrição detalhada do produto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Digite a categoria do produto" {...field} />
              </FormControl>
              <FormDescription>
                A categoria a que este produto pertence.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Digite o preço do produto"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>O preço de venda do produto.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stockQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade em Estoque</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Digite a quantidade em estoque"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormDescription>O número de itens em estoque.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="Digite o SKU do produto" {...field} />
              </FormControl>
              <FormDescription>
                A Unidade de Manutenção de Estoque (SKU) para este produto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input placeholder="Digite a marca do produto" {...field} />
              </FormControl>
              <FormDescription>A marca do produto.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrar Produto"}
        </Button>
      </form>
    </Form>
  );
}
