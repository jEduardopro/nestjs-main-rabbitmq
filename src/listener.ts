import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
			options: {
				urls: ['amqps://froazala:W2D8rw128V9aSkx5GWi5xfljmIMmlMyH@gull.rmq.cloudamqp.com/froazala'],
				queue: 'main_queue',
				queueOptions: {
					durable: false
				},
			},
    },
	);
	
	await app.listen();
	console.log('MS is listening');
	
}
bootstrap();
