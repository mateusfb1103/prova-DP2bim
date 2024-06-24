import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonagemModule } from './personagens/personagem.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PersonagemMiddleware } from './personagens/middleware/personagem.middleware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    MongooseModule.forRoot('mongodb://0.0.0.0/dp-rpg'),
    PersonagemModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('books');
    consumer
      .apply(PersonagemMiddleware)
      .forRoutes({ path: 'personagem', method: RequestMethod.POST });
    consumer
      .apply(PersonagemMiddleware)
      .forRoutes({ path: 'personagem', method: RequestMethod.PATCH });
  }
}
