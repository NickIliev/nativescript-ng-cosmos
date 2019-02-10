export class News {
    news_id: string;
    name: string;
    release: NewsRelease;

    constructor(news_id, name, release) {
        this.news_id = news_id;
        this.name = name;
        this.release = release;
    }
}

export class NewsRelease {
    news_id: string;
    name: string;
    url: string;
    abstract: string;
    mission: string;
    thumbnail: string; 
    publication: string;

    constructor(news_id: string, name: string, url: string, abstract: string, mission: string, thumbnail: string, publication: string) {
        this.news_id = news_id;
        this.name = name;
        this.url = url;
        this.abstract = abstract;
        this.mission = mission;
        this.thumbnail = thumbnail;
        this.publication = new Date(publication).toLocaleDateString();
    }
}

export class HubbleNewsApiData {
    allNews: Array<News>;

    constructor(allNews: Array<News>) {
        this.allNews = allNews;
    }
}
