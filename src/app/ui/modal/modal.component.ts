import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService, HostComponent } from 'src/app/modal.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements HostComponent{

  @ViewChild("container", { read: ViewContainerRef }) container:ViewContainerRef;
  isOpen=false;

  constructor(modalService: ModalService,
    private resolver:ComponentFactoryResolver
    ){
      modalService.register(this);
    }

  open<T>(type: { new (...args: any[]): T }): T
  {
    this.isOpen=true;
    const factory = this.resolver.resolveComponentFactory(type);
    return <T>(this.container.createComponent(factory).instance);
  }

  close(){
    this.isOpen=false;
    this.container.clear();
  }
}