import { Category } from "./category";

    export interface Job {
        id: number;
        title: string;
        description: string;
        price_max: number;
        price_min: number;
        pictureUrl: string;
        categoryId: number;
        category?: Category;
        categoryName?: string; 
        jobber_id: string; //
      }
      

