import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;
}
export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
