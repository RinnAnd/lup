import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  isCompleted?: boolean;

  createdAt?: string;
}
