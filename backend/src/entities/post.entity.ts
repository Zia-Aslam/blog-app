import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column('text', { nullable: true })
  excerpt: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  publishedAt: Date;

  @Column({ default: true })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
