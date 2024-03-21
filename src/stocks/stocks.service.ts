import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { StockSymbol } from '../entities/stockSymbol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class StocksService {
  apiBase = 'https://finnhub.io/api/v1/';
  cronSymbols = [];

  constructor(
    private config: ConfigService,
    @InjectRepository(StockSymbol)
    private symbolRepository: Repository<StockSymbol>,
  ) {}

  private async makeRequest(symbol: string) {
    const url =
      this.apiBase +
      'quote?symbol=' +
      symbol +
      '&token=' +
      this.config.get<string>('API_KEY');

    const options = {
      method: 'GET',
    };

    return fetch(url, options);
  }

  private async storeData(price: number, symbol: string) {
    await this.symbolRepository.save({
      symbol: symbol,
      price: price,
    });
  }

  async getPrice(symbol: string): Promise<any> {
    const response = await this.makeRequest(symbol);
    if (!response.ok) {
      console.error('request error:', response.status);
      return {
        error: true,
        reason: response.status,
      };
    }

    try {
      // process response
      const data = await response.json();

      // save current price
      await this.storeData(data.c, symbol);

      // get last 10 price
      const lastTen = await this.symbolRepository.find({
        where: {
          symbol,
        },
        order: {
          id: 'DESC',
        },
        take: 10,
      });
      const lastTenPrice = lastTen.map((item) => item.price);

      // calculate average
      const avg = this.getMovingAverage(lastTenPrice, 10);

      // return
      return {
        symbol,
        data,
        avg,
      };
    } catch (error) {
      console.error('process error:', error.message);
      return {
        error: true,
        reason: error.message,
      };
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async runEveryMinute(symbol: string) {
    if (symbol && this.cronSymbols.indexOf(symbol) === -1) {
      this.cronSymbols.push(symbol);
    }
    for (const symbol of this.cronSymbols) {
      console.log(symbol);
      console.log(this.cronSymbols);
      const response = await this.makeRequest(symbol);
      const data = await response.json();
      await this.storeData(data.c, symbol);
    }
  }

  startCron(symbol: string) {
    this.runEveryMinute(symbol);
  }

  getMovingAverage = (array, range) =>
    array.reduce(
      (p, n, i) =>
        i
          ? p.concat(
              (2 * n) / (range + 1) +
                (p[p.length - 1] * (range - 1)) / (range + 1),
            )
          : p,
      [array[0]],
    );
}
