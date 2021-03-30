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
}
}

// This model is called via a 'ListingId' and returns a reference to the messages
export interface ISellerListingConversation {
  id: string, // this Id is passed to a request with returns an array of 'ISellerConversationMessage'
  listingName: string,
  isSellerConversation: boolean,
  participants: IConversationParticipant[],
  isClosed: boolean,
  createdAt: string,
}

// This is called with a conversation reference and return a list of these messages
export interface ISellerListingConversationMessage {
  id: string,
  content: string,
  createdAt: string,
  userId: string,
  sellerId: string,
  name: string,
  children: ISellerListingConversationMessage[],
}

export interface ICreateListingQuestion {
  parentId: string,
  content: string,
  listingId: string
}

// Ostensibly the same as 'ICreateListingQuestion' but may change in future so for now keeping them as different classes
export interface ICreateListingAnswer {
  parentId: string,
  content: string,
  listingId: string
}
