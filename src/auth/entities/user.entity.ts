import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PostDocument } from 'src/post/entities/post.entity';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] }) // Reference to the User entity
  posts: PostDocument[];
}
export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
