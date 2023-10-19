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
    UserModule,
    PostModule,
    BlogModule,
    AuthModule,
    ConfigModule,
    MyConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
