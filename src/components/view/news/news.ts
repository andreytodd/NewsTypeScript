import './news.css';
import { ArticlesResponse } from '../appView';

class News {
    draw(data: ArticlesResponse[]) {
        const news: ArticlesResponse[] =
            data.length >= 10 ? data.filter((_item: ArticlesResponse, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: ArticlesResponse, idx: number) => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) (newsClone.querySelector('.news__item') as Element).classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            (newsClone.querySelector('.news__meta-author') as Element).textContent = item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as Element).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as Element).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as Element).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as Element).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as Element).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (document.querySelector('.news') as Element).innerHTML = '';
        (document.querySelector('.news') as Element).appendChild(fragment);
    }
}

export default News;
