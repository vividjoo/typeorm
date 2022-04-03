import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Relation,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import { Album } from "./Album";
import { Author } from "./Author";
import { PhotoMetadata } from "./PhotoMetadata";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne((type) => PhotoMetadata, (metadata) => metadata.photo, {
    cascade: true,
  })
  metadata: Relation<PhotoMetadata>;

  @ManyToOne(() => Author, (au) => au.photos)
  author: Author;

  @ManyToMany(() => Album, (album) => album.photos)
  // @JoinTable()
  albums: Album[];

  @CreateDateColumn()
  createAt: Date;
}
