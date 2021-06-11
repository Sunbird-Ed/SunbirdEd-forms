import { Observable } from 'rxjs';
import { DialcodeResponse } from './common-form-config';

export abstract class DialcodeCursor {

  abstract updateDialCode(dialcode: String | Array<String>): Observable<DialcodeResponse>;
  abstract clearDialCode(): void;
  abstract changeDialCode(dialcode: String | Array<String>): void;
  abstract validateDialCode(dialcode: String | Array<String>): Observable<DialcodeResponse>;

}
