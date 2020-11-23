import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setUiStyle } from '@boma/administration-portal/shared/state';
import { getUiStyle } from '@boma/administration-portal/shared/state';
import { IUiStyle } from '@boma/administration-portal/shared/entities';

@Component({
  selector: 'boma-settings-index',
  templateUrl: './settings-index.component.html',
  styleUrls: ['./settings-index.component.scss'],
})
export class SettingsIndexComponent implements OnInit {
  colorScheme: string;
  componentThemes: any[];
  menuThemes: any[];

  style$: Observable<IUiStyle>;

  uiSettingsFormGroup: FormGroup;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.style$ = this.store.select(getUiStyle);
    this.uiSettingsFormGroup = new FormGroup({
      id: new FormControl(1),
      menuMode: new FormControl(''),
      colorScheme: new FormControl(''),
      inputStyle: new FormControl(''),
      ripple: new FormControl(''),
      menuTheme: new FormControl(''),
      componentTheme: new FormControl(''),
    });

    let ctx = this;
    this.style$.subscribe({
      next(res) {
        if (res != null) {
          ctx.uiSettingsFormGroup.patchValue({ ...res });
          ctx.colorScheme = res.colorScheme;
        }
      },
    });
    this.componentThemes = [
      { name: 'blue', color: '#42A5F5' },
      { name: 'green', color: '#66BB6A' },
      { name: 'lightgreen', color: '#9CCC65' },
      { name: 'purple', color: '#AB47BC' },
      { name: 'deeppurple', color: '#7E57C2' },
      { name: 'indigo', color: '#5C6BC0' },
      { name: 'orange', color: '#FFA726' },
      { name: 'cyan', color: '#26C6DA' },
      { name: 'pink', color: '#EC407A' },
      { name: 'teal', color: '#26A69A' },
    ];

    this.menuThemes = [
      {
        name: 'white',
        color: '#ffffff',
        logoColor: 'dark',
        componentTheme: 'blue',
      },
      {
        name: 'darkgray',
        color: '#343a40',
        logoColor: 'white',
        componentTheme: 'blue',
      },
      {
        name: 'blue',
        color: '#1976d2',
        logoColor: 'white',
        componentTheme: 'blue',
      },
      {
        name: 'bluegray',
        color: '#455a64',
        logoColor: 'white',
        componentTheme: 'lightgreen',
      },
      {
        name: 'brown',
        color: '#5d4037',
        logoColor: 'white',
        componentTheme: 'cyan',
      },
      {
        name: 'cyan',
        color: '#0097a7',
        logoColor: 'white',
        componentTheme: 'cyan',
      },
      {
        name: 'green',
        color: '#388e3C',
        logoColor: 'white',
        componentTheme: 'green',
      },
      {
        name: 'indigo',
        color: '#303f9f',
        logoColor: 'white',
        componentTheme: 'indigo',
      },
      {
        name: 'deeppurple',
        color: '#512da8',
        logoColor: 'white',
        componentTheme: 'deeppurple',
      },
      {
        name: 'orange',
        color: '#F57c00',
        logoColor: 'dark',
        componentTheme: 'orange',
      },
      {
        name: 'pink',
        color: '#c2185b',
        logoColor: 'white',
        componentTheme: 'pink',
      },
      {
        name: 'purple',
        color: '#7b1fa2',
        logoColor: 'white',
        componentTheme: 'purple',
      },
      {
        name: 'teal',
        color: '#00796b',
        logoColor: 'white',
        componentTheme: 'teal',
      },
    ];
  }

  changeMenuTheme(name, componentTheme) {
    this.uiSettingsFormGroup.patchValue({
      menuTheme: name,
      componentTheme: componentTheme,
    });
    this.saveUiSettings();
  }

  changeComponentTheme(theme) {
    this.uiSettingsFormGroup.patchValue({
      componentTheme: theme,
    });
    this.saveUiSettings();
  }

  saveUiSettings() {
    const uiStyle = {
      ...this.uiSettingsFormGroup.value,
    };
    this.store.dispatch(setUiStyle({ uiStyle }));
  }
}
