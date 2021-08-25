import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MONGO_DB_CONNECTION } from './config/configuration';
import { InspectionModule } from './modules/inspection/inspection.module';

@Module({
  imports: [
    MONGO_DB_CONNECTION,
    AuthModule,
    UserModule,
    InspectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {

  }
}
