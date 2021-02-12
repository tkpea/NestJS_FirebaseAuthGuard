import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseStrategy } from './common/firebase.stragegy';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FirebaseStrategy],
})
export class AppModule {}
