import { IUsuario } from './../../../model/usuario-interfaces';
import { ITipoProducto, IPageTP } from './../../../model/tipoproducto-interfaces';
import { TipoproductoService } from './../../../service/tipoproducto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PaginationService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-plist-tipoproducto',
  templateUrl: './plist-tipoproducto.component.html',
  styleUrls: ['./plist-tipoproducto.component.css']
})
export class PlistTipoproductoComponent implements OnInit {

  strTitleSingular: string = "Tipo de producto";
  strTitlePrural: string = "Tipos de producto";
  strIconEntity: string = "fas fa-tag";
  strIconOperation: string = "fas fa-file-alt";
  aTipoProductos: ITipoProducto[];
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;  
  strResult: string = null;
  strFilter: string = "";
  strSortField: string = "";
  strSortDirection: string = "";
  strFiltered: string = "";
  oUserSession: IUsuario;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oTipoProductoService: TipoproductoService,
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.nPage = 1;
    this.getPage();
  }

  ngOnInit(): void {
  }

  getPage = () => {
    this.oTipoProductoService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection).subscribe((oPage: IPageTP) => {
      if (this.strFilter) {
        this.strFiltered = "Listado filtrado";
      } else {
        this.strFiltered = "";
      }
      this.aTipoProductos = oPage.content;
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
    })
  }

  jumpToPage = () => {
    this.getPage();
    return false;
  }

  doFilter() {
    this.getPage();
  }

  onKeydownEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getPage();
    }
  }

  doResetFilter() {
    this.strFilter = "";
    this.getPage();
  }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    this.strSortField = order;
    if (this.strSortDirection == 'asc') {
      this.strSortDirection = 'desc';
    } else if (this.strSortDirection == 'desc') {
      this.strSortDirection = '';
    } else {
      this.strSortDirection = 'asc';
    }
    this.getPage();
  }

  closeModal(): void { }

}
