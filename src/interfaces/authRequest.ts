import { Request } from "express";

// interfaces
export interface AuthRequest extends Request {
  user?: any;
  file?: any;
  files?: any;
  parsedFilterParams?: any;
  query: any;
  locals?: any;
  user_timezone?: any;
}