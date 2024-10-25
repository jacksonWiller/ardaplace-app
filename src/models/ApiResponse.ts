import { PagedInfoModel } from "./PagedInfoModel";

export interface ApiResponse<T> {
  result: {
    pagedInfo?: PagedInfoModel;
    [key: string]: T[] | PagedInfoModel | undefined;
  };
  success: boolean;
  successMessage: string;
  statusCode: number;
  errors: string[];
}
