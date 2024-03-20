const categoriesContainer = document.querySelector('[category-list]');
const newCategoryForm = document.querySelector('[data-new-category-form]');
const newCategoryInput = document.querySelector('[data-new-category-input]');

const LOCAL_STORAGE_CATEGORY_KEY = 'task.categories'

let categories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)) || []

newCategoryForm.addEventListener('submit', e => {
    e.preventDefault()
    const categoryName = newCategoryInput.value
    if (categoryName == null || categoryName === '') return
    const category = createCategory(categoryName)
    newCategoryInput.value = null
    categories.push(category)
    saveAndRender()
})

function createCategory(name) {
    return {id: Date.now().toString(), name: name, tasks: []}
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(categories))
}

function render() {
    clearElement(categoriesContainer);
    categories.forEach(category => {
        const categoryElement = document.createElement('li')
        categoryElement.dataset.categoryId = category.id
        categoryElement.classList.add('category')
        categoryElement.textContent = category.name
        categoriesContainer.appendChild(categoryElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()