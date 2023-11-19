import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ default: 'active' })
  status: string;
}
