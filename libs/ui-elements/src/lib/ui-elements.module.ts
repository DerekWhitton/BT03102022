import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MegaMenuModule } from 'primeng/megamenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  imports: [
    CommonModule,
    RadioButtonModule,
    ToastModule,
    MegaMenuModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ToolbarModule,
    TableModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    ChartModule,
    InputTextModule,
    CarouselModule,
    AccordionModule,
    SliderModule,
    FormsModule,
    CheckboxModule
  ],
  exports: [
    RadioButtonModule,
    InputSwitchModule,
    MegaMenuModule,
    ToastModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ToolbarModule,
    TableModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    ChartModule,
    InputTextModule,
    CarouselModule,
    AccordionModule,
    SliderModule,
    FormsModule,
    CheckboxModule
  ],
})
export class UiElementsModule {}
