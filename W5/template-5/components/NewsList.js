export default class NewsList {
    constructor(props) {
        this.articles = props.articles;
        this.$newsListContainer = document.createElement('div');
        this.$newsListContainer.className = 'news-list-container';

        this.$newsList = document.createElement('div');
        this.$newsList.className = 'news-list';
        this.$newsListContainer.appendChild(this.$newsList);

        this.render();

        this.initScrollHandler();
    }

    initScrollHandler() {
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                const scrollObserver = document.querySelector('.scroll-observer');
                if (scrollObserver) {
                    scrollObserver.classList.add('loading');
                    this.getNextPage();
                }
            }
        });
    }

    render() {
        this.$newsList.innerHTML = '';

        this.articles.forEach((article) => {
            const $newsItem = document.createElement('div');
            $newsItem.className = 'news-item';
            $newsItem.innerHTML = `
                <div class="thumbnail">
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                        <img src="${
                            article.urlToImage ||
                            'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                        }" alt="thumbnail" />
                    </a>
                </div>
                <div class="contents">
                    <h2>
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                            ${article.title}
                        </a>
                    </h2>
                    <p>
                        ${article.description}
                    </p>
                </div>
            `;
            this.$newsList.appendChild($newsItem);
        });

        const $scrollObserver = document.createElement('div');
        $scrollObserver.className = 'scroll-observer';
        $scrollObserver.innerHTML = `
            <img src="img/ball-triangle.svg" alt="Loading..." />
        `;

        this.$newsListContainer.appendChild($scrollObserver);
    }

    getNextPage() {
        if (this.articles.length === 0 || !this.articles[0].category) {
            return;
        }

        const { category, page } = this.articles[0];
        const nextPage = page + 1;
        const apiKey = 'ee297cd9da144c8c96cb351e15ac79ff';
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&page=${nextPage}&apiKey=${apiKey}`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then(({ articles }) => {
                this.articles.push(...articles);
                this.render();
            })
            .catch((err) => console.error(err));
    }

    updateArticles(category) {
        const apiKey = 'ee297cd9da144c8c96cb351e15ac79ff';
        const apiUrl =
            category === 'all'
                ? `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`
                : `https://newsapi.org/v2/top-headlines?country
`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then(({ articles }) => {
                this.articles = articles;
                this.render(); // render 메서드 호출
            })
            .catch((err) => console.error(err));
    }
}
