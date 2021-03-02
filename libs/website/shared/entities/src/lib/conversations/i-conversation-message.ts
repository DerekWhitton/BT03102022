export interface IConversationMessage {
  id: string,
  content: string,
  createdAt: Date,
  userId: string,
  sellerId: string,
  name: string
}