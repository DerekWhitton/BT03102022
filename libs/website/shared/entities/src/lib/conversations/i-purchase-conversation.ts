export interface IConversationParticipant {
  id: string,
  isOwner: string,
  isSeller: string,
  name: string
}

export interface IPurchaseConversation {
  id: string,
  listingName: string,
  isClosed: string,
  isSellerConversation: string,
  createdAt: string,
  participants: IConversationParticipant[]
}