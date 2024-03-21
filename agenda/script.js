const categoriesContainer = document.querySelector('[category-list]');
const newCategoryForm = document.querySelector('[data-new-category-form]');
const newCategoryInput = document.querySelector('[data-new-category-input]');


const taskList = document.querySelector('.task-list');
const backBtn = document.querySelector ('.back-button');
const menuBtn = document.querySelector('.menu-button');

const toggleScreen = () => {
    const agendaSection = document.querySelector('.agenda-section');
    agendaSection.classList.toggle('show-category');
};

menuBtn.addEventListener('click', toggleScreen);
backBtn.addEventListener('click', toggleScreen);

const LOCAL_STORAGE_CATEGORY_KEY = 'task.categories'
const LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY = 'task.selectedCategoryId'
let categories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)) || []
let selectedCategoryId = localStorage.getItem(LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY)

categoriesContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === ('li')) {
        selectedCategoryId = e.target.dataset.categoryId
        saveAndRender()
    }
})

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
    localStorage.setItem(LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY, selectedCategoryId)
}

function render() {
    clearElement(categoriesContainer);
    categories.forEach(category => {
        const categoryElement = document.createElement('li')
        categoryElement.dataset.categoryId = category.id
        categoryElement.classList.add('category')
        categoryElement.textContent = category.name
        if (category.id === selectedCategoryId) {
        categoryElement.classList.add('active-category')
    }
        categoriesContainer.appendChild(categoryElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()