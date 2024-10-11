import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-categoria-read',
  standalone: true,
  imports: [MatListModule,RouterOutlet,MatTableModule , RouterModule],
  templateUrl: './categoria-read.component.html',
  styleUrl: './categoria-read.component.css'
})
export class CategoriaReadComponent implements OnInit {
 
  categorias: Categoria[] = []
  private subscription: Subscription = new Subscription();

  displayedColumns: string[] =['id','nome','descricao','livros','acoes'];

  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.service.findAll().subscribe(resposta => {
      console.log(resposta); 
      this.categorias = resposta; 
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }
  }

  navegarParaCategoriaCreate(){
    this.router.navigate(["categorias/create"])
  }
 

}
