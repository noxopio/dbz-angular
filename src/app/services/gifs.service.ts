import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../gifs/interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public gifList: Gif[] = [];

  constructor(
    private http: HttpClient
  ) {

    this.loadLocalStorage();

  }
  private _tagsHistory: string[] = [];
  private apiKey: string = 'fxpQClUSxdDsbEJGmBB7RgXLWyAv6ouP';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/'
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10)
    this.saveLocalStorage();

  }
  get tagsHistory() {
    return [...this._tagsHistory];

  }
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    // this.http.get(`${this.serviceUrl}search?api_key=${this.apiKey}&q=${tag}&limit=${this.limit}`).
    this.http.get<SearchResponse>(`${this.serviceUrl}search?`, { params }).
      subscribe(Response => {
        this.gifList = Response.data;
        // console.log({gifs:this.gifList});
      }
      )
    // this._tagsHistory.unshift(tag);
    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`)
  }

}
