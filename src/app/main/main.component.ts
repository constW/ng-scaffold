import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, takeWhile, map } from 'rxjs/operators';
import { MainService } from './main.service';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    isCollapsed = false;
    menu = [];
    currentModule: any;
    private lifeCycle = true;
    constructor(private router: Router, private mainService: MainService) { }

    ngOnInit() {
        this.mainService.getMenu().subscribe((resp: any) => {
            this.menu = resp;
        })
        this.currentModule = this.determineCurrentModule(location.href.split('#')[1]);
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            takeWhile(() => this.lifeCycle)
        ).subscribe((evt: any) => {
            document.body.scrollTop = 0;
            this.currentModule = this.determineCurrentModule(evt.url);
        });
    }

    ngOnDestroy() {
        this.lifeCycle = false;
    }
    navigate(menuItem: any) {
        this.router.navigate([menuItem.url]);
    }

    isMySub(group: any) {
        return this.currentModule && group.children.some(c => c.url === this.currentModule.url);
    }
    private determineCurrentModule(url: string) {
        let current: any = this.menu.find(m => url.indexOf(m.url) >= 0);
        if (!current) {
            current = this.menu.filter(m => m.sub).map(m => m.children).reduce((prev, val) => {
                return [...prev, ...val];
            }, []).find(m => url.indexOf(m.url) >= 0);
        }
        return current;
    }
}
