export class OnlinePlatformSearchError {
  constructor(public message: string, public info?: string) {
  }
}


export class OnlinePlatformSearch {
  error?: OnlinePlatformSearchError;

  constructor(public query: string) {
  }
}

