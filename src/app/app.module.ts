import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './ui/card/card.component';
import { ParticlesComponent } from './ui/particles/particles.component';
import { DamageTextComponent } from './ui/particles/damage-text/damage-text.component';
import { ExplosionComponent } from './ui/particles/explosion/explosion.component';
import { StoreScreenComponent } from './ui/store-screen/store-screen.component';
import { RemoveWrapperDirective } from './remove-wrapper.directive';
import { ModalComponent } from './ui/modal/modal.component';
import { IntroComponent } from './ui/intro/intro.component';
import { BattleScreenComponent } from './ui/screens/battle-screen/battle-screen.component';
import { PlayerShipComponent } from './ui/screens/battle-screen/player-ship/player-ship.component';
import { ShieldComponent } from './ui/screens/battle-screen/shield/shield.component';
import { MapScreenComponent } from './ui/screens/map-screen/map-screen.component';
import { ViewCardsComponent } from './ui/view-cards/view-cards.component';

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
    ModalComponent,
    IntroComponent,
    ViewCardsComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DamageTextComponent,ExplosionComponent,IntroComponent, ViewCardsComponent]
})
export class AppModule { }
