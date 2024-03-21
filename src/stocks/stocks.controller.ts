import { Controller, Get, Param, Put } from '@nestjs/common';
import { SymbolDTO } from '../dto/SymbolDTO';
import { ResponseDTO } from '../dto/ResponseDTO';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get(':symbol')
  async get(@Param() dto: SymbolDTO): Promise<ResponseDTO> {
    return this.stocksService.getPrice(dto.symbol);
  }

  @Put(':symbol')
  handleCron(@Param() dto: SymbolDTO): boolean {
    this.stocksService.startCron(dto.symbol);
    return true;
  }
}
