export interface Review {
        id: number;
        rating: number;
        comment: string;
        jobber_id: number;
        user_id: number;
        created_at: string;
        updated_at: string;
        user: {
          id: number;
          firstname: string;
          email: string;
          email_verified_at: string;
          created_at: string;
          updated_at: string;
        };  
        
}
