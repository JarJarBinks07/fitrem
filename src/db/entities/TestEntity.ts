import { Blob } from "buffer";
import { Column, Entity, PrimaryColumn } from "typeorm/browser";

@Entity("test")
export class TestEntity {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "boolean" })
  isActive: boolean;

  // @Column({ type: "boolean" })
  // isActive2: boolean;

  // @Column({ type: "varchar", length: 255 })
  // name: string;

  // @Column({ type: "text", length: 255 })
  // jsonTest: string;

  @Column({ type: "blob", length: 255 })
  file: Blob;
}
