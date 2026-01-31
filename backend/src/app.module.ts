import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import config from './config/app.config';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    DataBaseModule,
    UserModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: config().app.jwtSecret,
      // i was treating func. as an object therfore it didint work
      signOptions: { expiresIn: '10m' },
    }),
    NewsModule,
  ],
})
export class AppModule {}
