import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface, UserRoles } from './interfaces';

@Entity({ schema: 'test', name: 'user' })
export class UsersEntity extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'varchar', select: false })
  public password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    array: true,
  })
  public roles: UserRoles[];
}
