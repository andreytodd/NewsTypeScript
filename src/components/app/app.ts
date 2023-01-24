import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsDataSources, ArticlesDataSources } from '../view/appView';

class App {
    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources');
        if (!sources) {
            throw new ReferenceError('Source is null!');
        }
        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data?: ArticlesDataSources) => {
                if (data !== undefined) {
                    this.view.drawNews(data);
                }
            })
        );
        this.controller.getSources((data?: NewsDataSources) => {
            if (data !== undefined) {
                this.view.drawSources(data);
            }
        });
    }
}

export default App;
