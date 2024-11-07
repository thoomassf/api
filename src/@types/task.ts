import type { Status } from "@prisma/client";

export interface TaskProps {
  id: string;
  title?: string;
  description?: string;
  status?: Status;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id?: string;
}
