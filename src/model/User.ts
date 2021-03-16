import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: Date;

  @Column("varchar")
  password: string;

  @Column("varchar")
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterLoad()
  getAvatar() {
    this.avatar = `http://localhost:3333/files/${this.avatar}`;
  }
}

export default User;
