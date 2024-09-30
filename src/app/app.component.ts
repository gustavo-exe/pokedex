import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FullPokemonDetail, PokemonDetail } from './app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  pokemons: FullPokemonDetail[] = [];
  isLoading: boolean = true;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.loadAllPokemonDetails();
  }

  loadAllPokemonDetails(): void {
    this.appService.getAllPokemonDetails()
    .subscribe(
    (next)=> {

        this.pokemons = next;
        this.isLoading = false;


    }
    );
  }
}
