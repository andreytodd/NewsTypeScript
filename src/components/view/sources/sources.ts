import './sources.css';
import { NewsResponse } from '../appView';

class Sources {
    draw(data: NewsResponse[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: NewsResponse) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            sourceClone.querySelector('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
