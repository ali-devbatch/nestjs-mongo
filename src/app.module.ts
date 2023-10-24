import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { PostModule } from './post/post.module';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { MyConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { EmailService } from './email/email.service';

// to add env variables dynamically
const envFilePath =
  process.env.NODE_ENV === 'production'
    ? '.production.env'
    : process.env.NODE_ENV === 'staging'
    ? '.staging.env'
    : '.development.env';

@Module({
  imports: [
    // for .env files
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    // other modules
    AuthModule,
    DatabaseModule,
    SharedModule,
    UserModule,
    PostModule,
    BlogModule,
    ConfigModule,
    MyConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
