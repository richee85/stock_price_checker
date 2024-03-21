import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockSymbol } from '../entities/stockSymbol.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [StocksService],
  controllers: [StocksController],
  imports: [TypeOrmModule.forFeature([StockSymbol]), ScheduleModule],
})
export class StocksModule {}
