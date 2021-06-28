export interface IListing {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  isDeleted: boolean;
  isReported: boolean;
  deletedAt: Date;
  deleteReason: string;
}
