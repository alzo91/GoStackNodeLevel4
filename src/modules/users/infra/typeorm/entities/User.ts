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

  avatar_url: string;

  @AfterLoad()
  getAvatar() {
    // this.avatar_url = `http://localhost:3333/files/${this.avatar}`;
    this.avatar_url = `http://localhost:3333/files/`;
  }
}

export default User;
