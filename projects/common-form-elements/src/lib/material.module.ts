import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import { MatPseudoCheckboxModule } from '@angular/material/core';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [],
    exports: [MatTooltipModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule,
        MatButtonModule, MatCheckboxModule, MatRadioModule, MatPseudoCheckboxModule]
})
export class MaterialModule { }
