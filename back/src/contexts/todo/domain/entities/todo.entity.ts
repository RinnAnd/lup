import { User } from 'src/contexts/user/domain/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.todos)
  user: User;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column() 
  description: string;

  @Column()
  isCompleted: boolean;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  completedAt: Date;
}
