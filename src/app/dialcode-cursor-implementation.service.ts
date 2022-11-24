import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DialcodeCursor } from 'common-form-elements';

@Injectable({
    providedIn: 'root'
})
export class DialcodeService implements DialcodeCursor {

    constructor() { }

    updateDialCode(dialcode) {
        if (dialcode) {
            return of({ isEditable: dialcode.length === 6 ? true : false, isValid: false }).pipe(delay(1000));
        } else {
            return of({ isEditable: false });
        }
    }

    clearDialCode() {
        console.log('Clear dialcode');
    }

    changeDialCode(dialcode) {
        console.log('changeDialCode', dialcode);
    }

    validateDialCode(dialcode) {
        const dialcodeTemp = 'ABC123';
        if (dialcodeTemp === dialcode) {
            return of({ isEditable: true, isValid: false, statusMsg: 'Duplicate QR code' }).pipe(delay(1000));
        } else if (String(dialcode).match(/^[A-Z0-9]{2,}$/)) {
            return of({ isEditable: true, isValid: true }).pipe(delay(1000));
        } else {
            return of({ isEditable: false });
        }
    }
}
