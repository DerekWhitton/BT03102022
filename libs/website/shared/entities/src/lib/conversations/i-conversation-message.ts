import { IConversationParticipant } from "./i-purchase-conversation";

export interface IConversationMessage {
  id: string,
  content: string,
  createdAt: Date,
  userId: string,
  sellerId: string,
  name: string
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
export interface ISellerListingConversationMessage extends IConversationMessage {
  children?: ISellerListingConversationMessage[], //  children are optional since there may or may not be other questions listed for a conversation
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