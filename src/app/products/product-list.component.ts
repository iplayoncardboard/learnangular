import {Component, OnInit} from '@angular/core'
import {IProduct} from "./product"
import {ProductService} from './product.service'

@Component({
    // selector: 'pm-products', (Not needed once router was added)
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
    
    //We would only do this if we needed to inject the service outside of root
    // providers: [ProductService] 
})

export class ProductListComponent implements OnInit  {
    pageTitle: string = 'Product List'
    imageWidth: number = 50;
    imageMargin: number = 2;
    _listFilter: string;
    get listFilter():string {
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    showImage: boolean = false;
    errorMessage: string;
    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
       
        // this.listFilter = 'hammer'
    }

    ngOnInit(): void {
        console.log("On Init");
        this.productService.getProducts().subscribe(
            products => {this.products = products
            this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
        
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !==-1)

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}