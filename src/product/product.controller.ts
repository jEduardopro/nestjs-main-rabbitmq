import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {

	constructor(
		private productService: ProductService
	) {}

	@Get()
	async all() {
		return this.productService.all()
	}

	@EventPattern('product_created')
	async product_created(product: any) {
		this.productService.create(product)
		// console.log('data here from RabbitMQ: ', data);
		
	}

	@EventPattern('product_updated')
	async product_updated(product: any) {
		this.productService.update(product.id, product)		
	}

	@EventPattern('product_deleted')
	async product_deleted(id: number) {
		await this.productService.delete(id)		
	}

}
