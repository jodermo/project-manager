import {NgLanguageEntity} from '../angular-classes/angular-entities/ng.language.entity';

export interface TranslationLanguage {
    name: string;
    iso: string;
}

export interface TranslationText {
    languageIso: string;
    alias: string;
    value: string;
}

export class Translation {
    languages: TranslationLanguage[] = [];
    texts: TranslationText[] = [];

    text(value: string | number, language?: NgLanguageEntity) {
        if (language) {
            const langIso = language.iso.toLowerCase();
            for (const text of this.texts) {
                const textIso = text.languageIso.toLowerCase();
                if (text.alias + '' === value + '' && textIso === langIso) {
                    return text.value + '';
                }
            }
        }
        return value + '';
    }
}
