import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms'; 
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-livro-read',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,CommonModule,ReactiveFormsModule,MatIconModule,MatCardModule],
  templateUrl: './livro-read.component.html',
  styleUrl: './livro-read.component.css'
})

export class LivroReadComponent implements OnInit{
  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: ""
  }

 constructor(private router:Router , private service:LivroService, private route:ActivatedRoute , ){}


  ngOnInit(): void {
      this.id_cat = this.route.snapshot.paramMap.get("id_cat") || "";
      this.livro.id = this.route.snapshot.paramMap.get("id")!;
      this.findById();
  }


  findById():void{
    this.service.findById(this.livro.id!).subscribe((resposta:Livro) => {
    this.livro = resposta;
    });
  }

  cancel(){
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
