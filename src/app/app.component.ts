import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { FullPokemonDetail, PokemonDetail } from './app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  pokemons: FullPokemonDetail[] = [];
  isLoading: boolean = true;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      this.loadAllPokemonDetails(); // Cargar más Pokémon cuando llegas al fondo
    }
  }

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.loadAllPokemonDetails();
  }

  loadAllPokemonDetails(): void {
    this.isLoading = true;
    this.appService.getAllPokemonDetails()
      .subscribe(
        (next) => {

          this.isLoading = false;
          this.pokemons = [...this.pokemons, ...next];
        },
      );
  }
}
