import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("state")
export class AppState {
  @PrimaryColumn({ type: "varchar" })
  id: string;
  @Column({ type: "json" })
  store: string;
}
