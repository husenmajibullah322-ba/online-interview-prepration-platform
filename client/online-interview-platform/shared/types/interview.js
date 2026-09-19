export interface Interview {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number; // in minutes
  participants: string[]; // array of user IDs
  questions: string[]; // array of question IDs
  createdAt: Date;
  updatedAt: Date;
}