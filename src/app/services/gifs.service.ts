import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  constructor(
    private http: HttpClient
  ) { }
  private _tagsHistory: string[] = [];
  private apiKey: string = 'fxpQClUSxdDsbEJGmBB7RgXLWyAv6ouP';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/'

  // limit: number = 10;
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10)

  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }
  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', 'tag')

    // this.http.get(`${this.serviceUrl}search?api_key=${this.apiKey}&q=${tag}&limit=${this.limit}`).
    this.http.get(`${this.serviceUrl}search?`, { params }).
      subscribe(Response => {
        console.log(Response);
      }

      )


    // this._tagsHistory.unshift(tag);
    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`)


  }

}
