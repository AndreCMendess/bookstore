import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-livros-read-all',
  standalone: true,
  imports: [MatListModule,MatTableModule,RouterModule],
  templateUrl: './livros-read-all.component.html',
  styleUrl: './livros-read-all.component.css'
})
export class LivrosReadAllComponent implements OnInit {

  displayedColumns: string[] = ["id","titulo","livros","acoes"];

  id_cat: String = "";

  livros: Livro[] = [];

  constructor(private service : LivroService , private route: ActivatedRoute , private router : Router) {

  }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
     this.findAll(); 
  }

  findAll(){
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta)=>{
      this.livros = resposta;
      console.log(this.livros); 
    });
  }

  criarNovoLivro(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`]);
  }



}
