const categoriesContainer = document.querySelector('[category-list]');

let categories = ['name', 'todo']

function render() {
    clearElement(categoriesContainer);
    categories.forEach(category => {
        const categoryElement = document.createElement('li')
        categoryElement.classList.add('category')
        categoryElement.textContent = category
        categoriesContainer.appendChild(categoryElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()