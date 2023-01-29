import './sources.css';
import { NewsResponse } from '../appView';

class Sources {
    draw(data: NewsResponse[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: NewsResponse) => {
            if (sourceItemTemp) {
                const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

                if (sourceClone) {
                    (sourceClone.querySelector('.source__item-name') as Element).textContent = item.name;
                    (sourceClone.querySelector('.source__item') as Element).setAttribute('data-source-id', item.id);

                    fragment.append(sourceClone);
                }
            }
        });

        (document.querySelector('.sources') as Element).append(fragment);
    }
}

export default Sources;
