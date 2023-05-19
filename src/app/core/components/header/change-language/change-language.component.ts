import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { STORAGE_KEY_PREFIX } from 'src/app/shared/constants';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
})
export class ChangeLanguageComponent implements OnInit {
  public readonly languages = ['EN', 'RU', 'DE', 'PL'];

  public languageItemKey = `${STORAGE_KEY_PREFIX}-language`;

  public selectedLanguage = localStorage.getItem(this.languageItemKey) || this.languages[0];

  constructor(public translate: TranslateService) {}

  public ngOnInit(): void {
    this.selectLanguage(this.selectedLanguage);
  }

  public selectLanguage(v: string): void {
    this.selectedLanguage = v;
    this.translate.use(this.selectedLanguage.toLocaleLowerCase());
    localStorage.setItem(this.languageItemKey, this.selectedLanguage);
  }
}
