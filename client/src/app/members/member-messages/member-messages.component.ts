import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() username!: string;
  @Input() messages: Message[] | any;
  messageContent!: string;
  member!: Member | undefined | any; 


  constructor(public messageService: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data['member'];
    })
  }

  sendMessage() {
    this.messageService.sendMessage(this.member.userName, this.messageContent).then(() => {
      this.messageForm.reset();
    })
  }

 

}
