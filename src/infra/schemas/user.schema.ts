import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ autoCreate: true })
export class User {
  @Prop({ default: randomUUID(), type: String })
  id?: string;

  @Prop({ required: true, type: String })
  first_name: string;

  @Prop({ required: true, type: String })
  last_name: string;

  @Prop(String)
  email: string;

  @Prop(String)
  avatar: string;

  @Prop(Number)
  external_id: number;

  @Prop(Date)
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
