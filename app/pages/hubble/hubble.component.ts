import { News, NewsRelease } from "../../models/news-model";
import { HubbleService } from "../../services/hubble.service";
import { Component } from "@angular/core";
import { Page }  from "tns-core-modules/ui/page";
import { isAndroid } from "tns-core-modules/platform";

@Component({
    selector: "hubble-news",
    moduleId: module.id,
    templateUrl: "./hubble.component.html",
    styleUrls:["hubble.component.css"]
})
export class HubbleComponent {
    latestNews: Array<News> = [];
    isExpanded: boolean = false;

    constructor(private _hubbleService: HubbleService, private _page: Page) {
        if (isAndroid) {
            this._page.actionBarHidden = true;
        }

        this._hubbleService.getNews().subscribe(result => {
            (<Array<News>>result).forEach(singleNews => {
                let release: any;

                this._hubbleService.getRelease("http://hubblesite.org/api/v3/news_release/" + singleNews["news_id"])
                .subscribe(newsRelease => {
                    release = new NewsRelease(
                        newsRelease["name_id"],
                        newsRelease["name"],
                        newsRelease["url"],
                        newsRelease["abstract"],
                        newsRelease["mission"],
                        newsRelease["thumbnail"],
                        newsRelease["publication"],
                        false);

                    this.latestNews.push(new News(singleNews["news_id"], singleNews["name"], release));
                })
            })
        })
    }

    onExpand(index) {
        this.latestNews[index].release.isExpanded = !this.latestNews[index].release.isExpanded;
    }
}
