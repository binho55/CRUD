import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html'
})
export class ProductAddComponent implements OnInit {

    productForm: FormGroup;
    prodNome: string;
    prodDesc: string;
    prodPreco: number;
    product: Product = new Product();
    isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.productForm = this.formBuilder.group({
            prodNome : [null],
            prodDesc : [null],
            prodPreco : [null]
        });
    }

  onFormSubmit(form: NgForm) {
        this.isLoadingResults = true;
        this.product.nome = form['prodNome'];
        this.product.desc = form['prodDesc'];
        this.product.preco = form['prodPreco'];

        let done = this.api.addProduct(this.product)
            .subscribe(
            
            
            res => {
            this.product = res;
            this.isLoadingResults = false;
            this.router.navigate(['/product-details/', this.product.id]);
        },
        
         (err) => {
            console.log(err);
            this.isLoadingResults = false;
        }
        
        );
    }

}
