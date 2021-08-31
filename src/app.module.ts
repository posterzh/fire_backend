import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MONGO_DB_CONNECTION } from './config/configuration';
import { InspectionModule } from './modules/inspection/inspection.module';
import { ReportModule } from './modules/report/report.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import {join} from "path";
import { TemplateModule } from './modules/template/template.module';

@Module({
  imports: [
    MONGO_DB_CONNECTION,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'fire-inspection-web', 'build'),
      exclude: ['/api*'],
    }),
    AuthModule,
    UserModule,
    InspectionModule,
    TemplateModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {

  }
}
