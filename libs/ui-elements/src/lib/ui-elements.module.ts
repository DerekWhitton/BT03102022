import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
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
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    MenubarModule,
    MenuModule,
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
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    MenubarModule,
    MenuModule,
  ],
})
export class UiElementsModule {}
