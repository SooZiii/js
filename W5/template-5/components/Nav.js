export default class Nav {
    constructor({ $target, categories, onCategoryChange }) {
        this.$nav = document.createElement('nav');
        this.$nav.className = 'category-list';
        this.$nav.innerHTML = `
        <ul>
          <li data-category="all" class="category-item active">전체보기</li>
          <li data-category="business" class="category-item">비즈니스</li>
          <li data-category="entertainment" class="category-item">엔터테인먼트</li>
          <li data-category="health" class="category-item">건강</li>
          <li data-category="science" class="category-item">과학</li>
          <li data-category="sports" class="category-item">스포츠</li>
          <li data-category="technology" class="category-item">기술</li>
        </ul>
      `;

        this.$nav.addEventListener('click', (e) => {
            const $category = e.target.closest('.category-item');
            if ($category) {
                const { category } = $category.dataset;
                const activeCategory = document.querySelector('.category-item.active');
                activeCategory.classList.remove('active');
                $category.classList.add('active');
                onCategoryChange(category);
            }
        });
    }
    render() {
        const categories = this.$nav.querySelectorAll('.category-item');
        categories.forEach((category) => {
            category.addEventListener('click', () => {
                const activeCategory = document.querySelector('.category-item.active');
                activeCategory.classList.remove('active');
                category.classList.add('active');
            });
        });
    }
}
