import { Todo } from 'src/contexts/todo/domain/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];
}
