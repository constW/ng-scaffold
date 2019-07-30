import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(protected router: Router, private ds: DashboardService) { }

  ngOnInit() {
    const ws = new WebSocket("ws://localhost:3000");
  }
  exportAsExcelFile() {

    this.ds.getHtml().subscribe((resp: any) => {
      this.saveAsExcelFile(resp, "模板");
    })
    // const html = XLSX.utils.sheet_to_html(worksheet);    
    //这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等    
  }

  private saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.html');
    // 如果写成.xlsx,可能不能打开下载的文件，这可能与Excel版本有关
  }
}
