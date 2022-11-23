import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  short_name: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  unit_measurement: string;

  @Column({ type: 'real' })
  unit_price: number;

  @Column({ type: 'real' })
  total_price: number;

  @Column()
  supermarket: string;

  @CreateDateColumn()
  imported_at: Date;

  @Column()
  invoice_date: string;
}
