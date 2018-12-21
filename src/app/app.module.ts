import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './ui/card/card.component';
import { ParticlesComponent } from './ui/particles/particles.component';
import { BattleScreenComponent } from './ui/battle-screen/battle-screen.component';
import { DamageTextComponent } from './ui/particles/damage-text/damage-text.component';
import { PlayerShipComponent } from './ui/player-ship/player-ship.component';
import { ShieldComponent } from './ui/shield/shield.component';
import { ExplosionComponent } from './ui/particles/explosion/explosion.component';
import { StoreScreenComponent } from './ui/store-screen/store-screen.component';
import { MapScreenComponent } from './ui/map-screen/map-screen.component';
import { RemoveWrapperDirective } from './remove-wrapper.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ParticlesComponent,
    BattleScreenComponent,
    DamageTextComponent,
    PlayerShipComponent,
    ShieldComponent,
    ExplosionComponent,
    StoreScreenComponent,
    MapScreenComponent,
    RemoveWrapperDirective,
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DamageTextComponent,ExplosionComponent]
})
export class AppModule { }
