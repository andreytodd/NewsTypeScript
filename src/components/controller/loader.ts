import { NewsDataSources } from '../view/appView';

interface LoaderOptions {
    apiKey: string;
}

interface UrlLoaderOptions {
    apiKey?: string;
    sources?: string;
}

interface GetRespOptions {
    sources?: string;
}

enum LoadMethods {
    GET = 'GET',
    POST = 'POST',
}

class Loader {
    baseLink: string;
    options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: GetRespOptions },
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(LoadMethods.GET, endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: UrlLoaderOptions, endpoint: string) {
        const urlOptions: UrlLoaderOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof UrlLoaderOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: LoadMethods, endpoint: string, callback: (data: NewsDataSources) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: NewsDataSources) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
