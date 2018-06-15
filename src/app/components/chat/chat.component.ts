import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Message } from '../../classes/Message';
import { NgForm } from '@angular/forms';

import Ws from '@adonisjs/websocket-client';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ws = Ws('ws://192.168.50.34:3333');

  sendingMsg: boolean = false;
  
  text: string = "";
  messages: Message[];
  resource: string = 'messages';

  constructor(private client: ClientService) { }

  ngOnInit() {
    this.client.getRequest(this.resource).subscribe(res => {
      this.messages = res.messages;

      this.setUpChat();
    });
  }

  isMyMessage(id: string){
    return localStorage.getItem('myid') == id;
  }

  setUpChat(){
    this.ws.connect();
    const chat = this.ws.subscribe('chat');

    chat.on('new:message', (data) => {

      console.log(' HOLAAA SOY UN MENSAJE ')

      this.messages.unshift(JSON.parse(data));
      console.log(data)
    })
  }

  onSubmit(f: NgForm){
    if(this.text && this.text != ''){
      this.sendingMsg = true;

      const myid = localStorage.getItem('myid');
      const myname = localStorage.getItem('myname');
      const mymsg = this.text;

      this.text = '';

      this.client.postRequest(this.resource, {
        senderid: myid, sendername: myname, text: mymsg
      }).subscribe(res => {
        this.sendingMsg = false;
        if(res.created){
          this.messages.unshift(res.created);

          const emiter = this.ws.getSubscription('chat');
          if(emiter){
            emiter.emit('message:added', JSON.stringify(res.created));
          } 
        }
      }, err => {
        this.sendingMsg = false;
        console.log(err)
      });
    }

  }

}
