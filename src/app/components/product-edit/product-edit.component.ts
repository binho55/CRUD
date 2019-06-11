import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

    productForm: FormGroup;
    product: Product;
    isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params.id);
    this.productForm = this.formBuilder.group({
        prodNome : [null],
        prodDesc : [null],
        prodPreco : [null]
    });
  }

    getProduct(id: any) {
        this.api.getProduct(id)
            .subscribe(res => {
                this.product = res;
                this.isLoadingResults = false;
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

    onFormSubmit(form: NgForm) {
        this.isLoadingResults = true;

        this.product.nome = form['prodNome'] == null ?
                            this.product.nome :
                            form['prodNome'];

        this.product.desc = form['prodDesc'] == null ?
                    this.product.desc :
                    form['prodDesc'];

        this.product.preco = form['prodPreco'] == null ?
            this.product.preco :
            form['prodPreco'];

        this.api.updateProduct(this.product)
            .subscribe(res => {
                this.product = res;
                this.isLoadingResults = false;
                this.router.navigate(['/product-details/' + this.product.id ]);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }
}
