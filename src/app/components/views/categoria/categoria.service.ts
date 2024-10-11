import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Categoria}  from "./categoria.model";
import { environment } from "../../../../environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class CategoriaService{

    constructor(private http: HttpClient , private _snack: MatSnackBar) { }

    baseUrl: string  =  environment.baseUrl;

    findAll():Observable<Categoria[]> {
        const url = `${this.baseUrl}/categorias`;
        console.log(`Chamando URL: ${url}`);
        return this.http.get<Categoria[]>(url);
    }

    findById(id: string) : Observable<Categoria>{

        const url = `${this.baseUrl}/categorias/${id}`
        return this.http.get<Categoria>(url);
    }

    create(categoria: Categoria) : Observable<Categoria>{
        const url = `${this.baseUrl}/categorias`;
        return this.http.post<Categoria>(url,categoria);
    }

    message(str: String): void{
        this._snack.open(`${str}`,'OK' ,{
            horizontalPosition:'end',
            verticalPosition: 'top',
            duration: 300
        }      
        );
    }

    delete(id : String):Observable<void>{
        const url = `${this.baseUrl}/categorias/${id}`
        return this.http.delete<void>(url);
    }

    update(categoria : Categoria):Observable<void>{
        const url = `${this.baseUrl}/categorias/${categoria.id}`;
        return this.http.put<void>(url,categoria);
    }

}   