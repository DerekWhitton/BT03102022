export interface IConversationParticipant {
  id: string,
  isOwner: string,
  isSeller: string,
  name: string
}

export interface IConversationSummary {
  id: string,
  listingName: string,
  isClosed: string,
  createdAt: string,
}

export interface IConversation extends IConversationSummary {
  isSellerConversation: string,  
  participants: IConversationParticipant[]
}

export interface IPurchaseConversation extends IConversationSummary {
  purchaseId: string;
  buyerName: string;
  isWinner: boolean;
  buyerProfilePicture: string;
  dateCancelled: Date;
}