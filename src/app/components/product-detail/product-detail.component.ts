import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  product: Product = { id: '0', nome: '', desc: '', preco: null };
  isLoadingResults = true;

  constructor(  private route: ActivatedRoute,
                private api: ApiService,
                private router: Router) { }

  ngOnInit() {
      this.getProductDetails(this.route.snapshot.params.id);
  }

  getProductDetails(id: any) {
            this.api.getProduct(id)
                .subscribe(res => {
                this.product = res;
                this.isLoadingResults = false;
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });

    }

    deleteProduct(id: any) {
        this.isLoadingResults = true;
        this.api.deleteProduct(id)
            .subscribe(res => {
            this.isLoadingResults = false;
        }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
        });
        this.router.navigate(['/products']);
    }

}






