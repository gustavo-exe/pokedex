import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
  <div class=" bg-brand-red min-h-screen flex flex-col" >
    <div>
      <img class=" h-20" src="https://i.ibb.co/THc9JQ2/Pokemon-Logo.png">
    </div>

    <div class="flex justify-center items-center relative flex-1 max-w-7xl mx-auto my-0" >
      <p class=" text-7xl top-32  lg:text-[12rem]  font-bold text-white absolute lg:top-1 " >
      POKEDEX
      </p>
      <img src="https://i.ibb.co/F7wmZqJ/hero-img.png" class="z-10">
    </div>
    <p class="text-right text-xs mb-2 mr-4 text-white" >Gotta Catch 'Em All</p>
  </div>
  `
})
export class HeroComponent {

}
