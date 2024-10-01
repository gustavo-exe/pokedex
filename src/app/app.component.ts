import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { FullPokemonDetail } from './app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  pokemons: FullPokemonDetail[] = [];
  isLoading: boolean = true;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      this.loadAllPokemonDetails();
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
        {
          next: (v) => {
            this.pokemons = [...this.pokemons, ...v];
          },
          error: (e) => {
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        }
      )
  }
}
