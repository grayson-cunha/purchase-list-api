import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  short_name: string;

  @Column()
  name: string;

  @Column()
  unit_measurement: string;

  @Column({ type: 'real' })
  price: number;

  @Column()
  supermarket: string;
}
