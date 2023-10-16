import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { PostModule } from './post/post.module';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { MyConfigModule } from './my-config/my-config.module';

@Module({
  imports: [
    // for .env files
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    // other modules
    DatabaseModule,
    SharedModule,
    PostModule,
    UserModule,
    BlogModule,
    AuthModule,
    ConfigModule,
    MyConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
