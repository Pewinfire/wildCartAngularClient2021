import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';
import { ITipoProducto, IPageTP, ITipoProducto2Send } from '../model/tipoproducto-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TipoproductoService {
  constructor(private http: HttpClient) { }

  sURL = API_URL + '/tipoprod';

  getPage(
    rpp: number,
    page: number,
    filter: string,
    order: string,
    direction: string
  ): Observable<IPageTP> {
    let strUrl: string = '';
    if (filter) {
      strUrl += '&filter=' + filter;
    }
    if (order) {
      strUrl += '&sort=' + order + ',' + direction;
    }
    return this.http.get<IPageTP>(
      this.sURL + '/?page=' + (page - 1) + '&size=' + rpp + strUrl, httpOptions);
  }

  getOne(id: number): Observable<ITipoProducto> {
    return this.http.get<ITipoProducto>(this.sURL + '/' + id, httpOptions);
  }

  newOne(oTipoProducto: ITipoProducto2Send): Observable<ITipoProducto> {
    return this.http.post<ITipoProducto>(
      this.sURL + '/',
      oTipoProducto,
      httpOptions
    );
  }

  updateOne(oTipoProducto: ITipoProducto2Send): Observable<ITipoProducto> {
    return this.http.put<ITipoProducto>(
      this.sURL + '/',
      oTipoProducto,
      httpOptions
    );
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + '/' + id, httpOptions);
  }
}
