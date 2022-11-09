import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PurchaseList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real' })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  summary: string;
}
