import { Product, ProductsResponse, ResponseApi } from "@/models";
import apiService from "../axiosConfig";
import { API_BASE_URL, DEFAULT_CACHE_DURATION, Products_Key } from "../constants";

const appServices = {
  getProducts: () => apiService.get("/products"),
  getProductById: (id: string) =>
    apiService.get(`/products`, {
      params: { id },
    }),

  getProductFilterCSR: (filter?: string) => () => apiService.get<ResponseApi<Product[]>>(`/products/${filter}`),

  getProductFilterSRR: async (filter: string): Promise<ProductsResponse> => {
    const res = await fetch(`${API_BASE_URL}/products/${filter}`, {
      next: {
        revalidate: DEFAULT_CACHE_DURATION,
        tags: [Products_Key],
      },
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  },
  getCategories: () => apiService.get("/categories"),

  getCategoryById: (id: string) =>
    apiService.get(`/categories`, {
      params: { id },
    }),

  getProductsOfCategory: (categoryId: string) => apiService.get(`/categories/${categoryId}/products`),

  getArticles: () => apiService.get("/articles"),

  getArticleById: (id: string) =>
    apiService.get(`/articles`, {
      params: { id },
    }),

  getArticleFilter: (filter: string) => apiService.get("/articles", { params: filter }),
};
export default appServices;
