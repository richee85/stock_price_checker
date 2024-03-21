import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from 'typeorm';

@Entity()
export class StockSymbol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column({ type: 'float' })
  price: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;
}
