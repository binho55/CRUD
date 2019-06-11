import { Product } from '../model/product';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = '/api/v1/products/';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

    aProduct: Array<Product> = new Array<Product>();

    constructor(private http: HttpClient) { }

    getProducts() {
        try {
            return this.http.get<Product[]>(apiUrl);
        } catch (err) {
            console.log(err);
            return new Observable<Product[]>();
        }
    }

    getProduct(pId: string) {
        const url = `${apiUrl}${pId}/`;
        try {
            return this.http.get<Product>(url);
        } catch (err) {
            console.log(err);
            return new Observable<Product>();
        }
    }

    addProduct(product: Product) {
        try {
            return this.http.post<Product>(apiUrl, product);
        } catch (err) {
            console.log(err);
            return new Observable<Product>();
        }
    }

    updateProduct(product: Product) {
        try {
            return this.http.put<Product>(apiUrl, product);
        } catch (err) {
            console.log(err);
            return new Observable<Product>();
        }
    }

    deleteProduct(pId: string) {
        const url = `${apiUrl}${pId}/`;
        try {
            return this.http.delete<Product>(url);
        } catch (err) {
            console.log(err);
            return new Observable<Product>();
        }
    }

}

