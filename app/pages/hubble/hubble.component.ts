import { HubbleNewsApiData, News, NewsRelease } from "../../models/news-model";
import { HubbleService } from "../../services/hubble.service";
import { Component } from "@angular/core";

@Component({
    selector: "hubble-news",
    moduleId: module.id,
    templateUrl: "./hubble.component.html"
})
export class HubbleComponent {
    latestNews: Array<News> = [];

    constructor(private _hubbleService: HubbleService) {
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
                        newsRelease["publication"]);

                    this.latestNews.push(new News(singleNews["news_id"], singleNews["name"], release));
                })
            })
        })
    }
}
