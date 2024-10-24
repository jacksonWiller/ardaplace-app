import { PagedInfo } from "./PagedInfo";

export interface ApiResponse<T> {
    result: {
      pagedInfo?: PagedInfo;
      [key: string]: T[] | PagedInfo | undefined;
    };
    success: boolean;
    successMessage: string;
    statusCode: number;
    errors: string[];
  }