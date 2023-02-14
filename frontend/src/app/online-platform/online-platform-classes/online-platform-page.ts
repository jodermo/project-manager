export type OnlinePlatformPageType =
  'start'
  | 'app-conditions'
  | 'app-privacy'
  | 'device-settings'
  | 'config';


export class OnlinePlatformPage {
  category?: string;

  constructor(public name: string, public type: OnlinePlatformPageType, public title?: string, public image?: string, public menuPage = false, public menuTitle?: string) {
  }
}
