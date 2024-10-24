import { ProductType } from '@/models/ProductType';
import { PagedInfo } from '@/models/PagedInfo';
import axios, { AxiosResponse } from 'axios';
import https from 'https';

const API_BASE_URL = 'https://localhost:44331/api';

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

export class ProductService {
  async getProducts(filter?: string, order?: string, pageNumber?: number, pageSize?: number): Promise<{ products: ProductType[], pagedInfo?: PagedInfo }> {
    try {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/Products`, {
        params: { filter, order, pageNumber, pageSize }
      });

      if (response.data.success) {
        return {
          products: response.data.result.products || [],
          pagedInfo: response.data.result.pagedInfo
        };
      } else {
        throw new Error(response.data.errors?.join(', ') || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<ProductType> {
    try {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/Products/${id}`);

      if (response.data.success && response.data.result) {
        return response.data.result;
      } else {
        throw new Error(response.data.errors?.join(', ') || 'Failed to fetch product');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async createProduct(product: Omit<ProductType, 'id'>): Promise<ProductType> {
    try {
      const response: AxiosResponse = await axios.post(`${API_BASE_URL}/Products`, product);

      if (response.data.success && response.data.result) {
        return response.data.result;
      } else {
        throw new Error(response.data.errors?.join(', ') || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(product: ProductType): Promise<ProductType> {
    try {
      const response: AxiosResponse = await axios.put(`${API_BASE_URL}/Products`, product);

      if (response.data.success && response.data.result) {
        return response.data.result;
      } else {
        throw new Error(response.data.errors?.join(', ') || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.delete(`${API_BASE_URL}/Products/${id}`);

      if (response.data.success) {
        return true;
      } else {
        throw new Error(response.data.errors?.join(', ') || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();