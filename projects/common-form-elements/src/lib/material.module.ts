import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
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
