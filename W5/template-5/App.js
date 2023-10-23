import { Nav, NewsList } from './components/index.js';

const pageSize = 5;
const API_KEY = 'ee297cd9da144c8c96cb351e15ac79ff';
const API_URL = `https://newsapi.org/v2/top-headlines?country=kr&pageSize=${pageSize}&apiKey=ee297cd9da144c8c96cb351e15ac79ff`;

export default class App {
    constructor($target) {
        this.state = {
            articles: []
        };
        this.fetchArticles();
        this.newsList = new NewsList({
            $target,
            articles: []
        });

        this.nav = new Nav({
            $target,
            categories: [
                'all',
                'business',
                'entertainment',
                'health',
                'science',
                'sports',
                'technology'
            ],
            onCategoryChange: this.onCategoryChange.bind(this)
        });

        this.fetchArticles();
    }
    async fetchArticles() {
        try {
            const response = await axios.get(API_URL);
            const articles = response.data.articles.map((article) => {
                if (!article.description) {
                    article.description = '';
                }
                return article;
            });
            this.setState({ articles });
        } catch (error) {
            console.error(error);
        }
    }

    setState = async (newState) => {
        await new Promise((resolve) => {
            this.state = { ...this.state, ...newState };
            resolve();
        });
        this.render();
    };

    render() {
        const { articles } = this.state;

        const newsList = new NewsList({ articles });
        const nav = new Nav(
            (category) => {
                newsList.updateArticles(category);
            },
            (category) => {
                this.setState({ category });
            }
        );

        const $root = document.querySelector('#root');
        $root.innerHTML = '';
        $root.appendChild(nav.$nav);
        $root.appendChild(newsList.$newsList);
    }
}

async function init() {
    const app = new App();
}

init();
