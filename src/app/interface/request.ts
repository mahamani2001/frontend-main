export interface Request {

  id: number;
  user_id: number;
  job_id: number;
  category_id: number;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  time: string;
  location: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  
}
