import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.css'],
})
export class ParticlesComponent {
  @ViewChild("container", { read: ViewContainerRef }) container:ViewContainerRef;

  constructor( private resolver: ComponentFactoryResolver) { 
  }

  spawn(type:any){
    const factory = this.resolver.resolveComponentFactory(type);
    const component =  <any>this.container.createComponent(factory);
    component.instance.destroy.subscribe(_=>this.destroy(component));
    return component
  }

  destroy(component){
    this.container.remove(this.container.indexOf(component.hostView));
  }
}