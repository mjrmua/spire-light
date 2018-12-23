import { Injectable } from '@angular/core';

export interface HostComponent {
  open<T>(type: { new (...args: any[]): T }): T;
  close();
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private host: HostComponent;
  constructor(){
  }
  close(): any {
    this.host.close();
  }

  register(host:HostComponent){
    this.host=host;
  }

  open<T>(type: { new (...args: any[]): T }): T
  {
    return this.host.open(type);
  }
}
