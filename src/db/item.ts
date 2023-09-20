import { Column, Entity, PrimaryColumn } from "typeorm/browser";

@Entity("item")
export class ItemEntity {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "boolean" })
  isActive: boolean;

  @Column({ type: "boolean" })
  isActive2: boolean;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", length: 255 })
  jsonTest: string;
}
