import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from '../stocks/stocks.module';
import { StockSymbol } from '../entities/stockSymbol.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'stock_prices',
      entities: [StockSymbol],
      subscribers: [],
      migrations: [],
      logging: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    StocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
