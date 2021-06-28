import { IThread } from './i-thread';

export interface ITopic {
  id: string;
  name: string;
  threads: IThread[];
}
