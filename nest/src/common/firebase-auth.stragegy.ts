import { Strategy} from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './myfirebase-service-account.json'
@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor() {
    super();
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });
  }

  async validate(req: Request):Promise<admin.auth.DecodedIdToken>{
    let token: string = req.headers["authorization"] ;
    if(!token) throw new UnauthorizedException();
    token = token.replace('Bearer ', '')
    const decodedToken = await admin.auth().verifyIdToken(token).catch(() => {
        throw new UnauthorizedException();
    })
    return decodedToken
  }
}