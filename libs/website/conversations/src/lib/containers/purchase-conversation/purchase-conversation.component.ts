import { loadUser } from './../../../../../shared/state/src/lib/user/user.actions';
import { getUserSellers } from './../../../../../shared/state/src/lib/user/user.selectors';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConversationsService } from '@bushtrade/website/shared/services';
import { IConversation } from '@bushtrade/website/shared/entites';

@Component({
  selector: 'bushtrade-web-purchase-conversation',
  templateUrl: './purchase-conversation.component.html',
  styleUrls: ['./purchase-conversation.component.scss'],
})
export class PurchaseConversationComponent implements OnInit {
  @ViewChild('scrollMe', { static: false }) scrollDiv;
  loading = false;
  loadMoreAvailable = true;
  perPage = 10;
  messages: any[] = [];
  conversationId: string;
  sellerId: string;
  conversation: IConversation;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private conversationsService: ConversationsService
  ) {}

  ngOnInit(): void {
    this.conversationId = this.route.snapshot.params?.conversationId;
    if (this.conversationId) {
      this.store.select(getUserSellers).subscribe((sellers: any) => {
        let isSellerUser = false;
        if (sellers.length > 0) {
          this.sellerId = sellers[0].id;
          isSellerUser = true;
        }

        this.conversationsService
        .loadPurchaseConversation(this.conversationId, isSellerUser)
        .subscribe((conversation) => {
          this.conversation = conversation;
          this.loadMoreMessages();
        });
      });
      this.store.dispatch(loadUser());
    }
  }

  loadMoreMessages() {
    this.loading = true;
    this.conversationsService
      .loadConversationMessages(
        this.conversationId,
        this.messages.length,
        this.perPage
      )
      .subscribe((messages) => {
        this.messages = messages.concat(this.messages);
        if (messages.length < this.perPage) {
          this.loadMoreAvailable = false;
        }
        this.loading = false;
      });
  }

  addMessage() {
    this.conversationsService
      .addPurchaseMessage(
        {
          conversationId: this.conversationId,
          content: this.message,
        },
        this.sellerId
      )
      .subscribe((message) => {
        this.message = null;
        this.messages.push(message);
      });
  }
}
