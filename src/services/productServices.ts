import { ProductModel } from "@/models/ProductModel";
import { PagedInfoModel } from "@/models/PagedInfoModel";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import https from "https";

const API_BASE_URL = "https://localhost:44331/api";

// Create a custom Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // This is necessary for self-signed certificates in development
  }),
});

export class ProductService {
  async getProducts(
    filter?: string,
    order?: string,
    pageNumber?: number,
    pageSize?: number
  ): Promise<{ products: ProductModel[]; pagedInfo?: PagedInfoModel }> {
    try {
      const response: AxiosResponse = await axiosInstance.get("/Products", {
        params: { filter, order, pageNumber, pageSize },
      });

      if (response.data.success) {
        return {
          products: response.data.result.products || [],
          pagedInfo: response.data.result.pagedInfo,
        };
      } else {
        throw new Error(
          response.data.errors?.join(", ") || "Failed to fetch products"
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<ProductModel> {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `/Products/${id}`
      );

      if (response.data.success && response.data.result) {
        return response.data.result;
      } else {
        throw new Error(
          response.data.errors?.join(", ") || "Failed to fetch product"
        );
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  async createProduct(
    product: Omit<ProductModel, "id">,
    files: File[]
  ): Promise<ProductModel> {
    try {
      const formData = new FormData();

      formData.append("Name", product.name);
      formData.append("Description", product.description);
      formData.append("Category", product.category);
      formData.append("Price", product.price.toString());
      formData.append("StockQuantity", product.stockQuantity.toString());
      formData.append("SKU", product.sku);
      formData.append("Brand", product.brand);

      //formData.append("product", JSON.stringify(product));
      files.forEach((file) => {
        formData.append("files", file);
      });

      // Adicione cada campo do produto individualmente ao FormData

      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response: AxiosResponse = await axiosInstance.post(
        "/Products",
        formData,
        config
      );

      if (response.data.success && response.data.result) {
        return response.data.result;
      } else {
        throw new Error(
          response.data.errors?.join(", ") || "Falha ao criar produto"
        );
      }
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  }

  async updateProduct(product: ProductModel): Promise<ProductModel> {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        "/Products",
        product
      );

      if (response.data.success && response.data.result) {
        return response.data.result;
      } else {
        throw new Error(
          response.data.errors?.join(", ") || "Failed to update product"
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const response: AxiosResponse = await axiosInstance.delete(
        `/Products/${id}`
      );

      if (response.data.success) {
        return true;
      } else {
        throw new Error(
          response.data.errors?.join(", ") || "Failed to delete product"
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();
