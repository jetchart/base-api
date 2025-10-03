import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { RaceDistanceEntity } from './race-distance.entity';

@Entity('race')
export class RaceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;


  @Column({ type: 'bytea' })
  image: Buffer;

  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: true })
  imageUrl?: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 255, nullable: true })
  country?: string;

  @Column({ name: 'website', length: 255 })
  website: string;

  @Column({ name: 'start_location', length: 500 })
  startLocation: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;

  @OneToMany(() => RaceDistanceEntity, (raceDistance) => raceDistance.race)
  distances: RaceDistanceEntity[];
}
