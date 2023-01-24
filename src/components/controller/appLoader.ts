import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', { apiKey: '5bfd0fc8d914472eb98ce81578608e8e' });
    }
}

export default AppLoader;
