const categoriesContainer = document.querySelector('[category-list]');
const newCategoryForm = document.querySelector('[data-new-category-form]');
const newCategoryInput = document.querySelector('[data-new-category-input]');
const deleteCategoryButton = document.querySelector('.delete-category-button');

const categoryDisplayContainer = document.querySelector('[data-category-display-container]');
const categoryTitleElement = document.querySelector('[data-category-title]');
const categoryCountElement = document.querySelector('[data-category-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')

const taskList = document.querySelector('.task-list');
const backBtn = document.querySelector ('.back-button');


const toggleScreen = () => {
    const agendaSection = document.querySelector('.agenda-section');
    agendaSection.classList.toggle('show-category');
}

backBtn.addEventListener('click', toggleScreen);
deleteCategoryButton.addEventListener('click', e => {
    categories = categories.filter(category => category.id !== selectedCategoryId)
    selectedCategoryId = null
    saveAndRender();
    toggleScreen();
});


const LOCAL_STORAGE_CATEGORY_KEY = 'task.categories';
const LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY = 'task.selectedCategoryId';
let categories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)) || [];
let selectedCategoryId = null;

categoriesContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === ('li')) {
        toggleScreen()
        selectedCategoryId = e.target.dataset.categoryId
        saveAndRender()
    }
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedCategory = categories.find(category => category.id === selectedCategoryId)
      const selectedTask = selectedCategory.tasks.find(task => task.id === e.target.id)
      selectedTask.complete = e.target.checked
      save()
      renderTaskCount(selectedCategory)
    }
  })

newCategoryForm.addEventListener('submit', e => {
    e.preventDefault()
    const categoryName = newCategoryInput.value.trim()
    if (categoryName == null || categoryName === '') return
    const category = createCategory(categoryName)
    newCategoryInput.value = null
    categories.push(category)
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value.trim()
    if (taskName == null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedCategory = categories.find(category => category.id === selectedCategoryId)
    selectedCategory.tasks.push(task)
    saveAndRender()
})

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
  }

function createCategory(name) {
    return {
        id: Date.now().toString(),
        name: name,
        tasks: []
    };
}
function saveAndRender() {
    save()
    render()
};

function save() {
    localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(categories))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY, selectedCategoryId)
};

function render() {
    clearElement(categoriesContainer)
    renderLists()
    const selectedCategory = categories.find(category => category.id === selectedCategoryId)
    if (selectedCategoryId == null) {
        categoryDisplayContainer.style.display = 'none'
    }
    else {
        categoryDisplayContainer.style.display = ''
        categoryTitleElement.innerText = selectedCategory.name
        renderTaskCount(selectedCategory) // Corrected function name here
        clearElement(tasksContainer)
        renderTasks(selectedCategory)
    }
}

function renderTasks(selectedCategory) {
    selectedCategory.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedCategory) {
    const incompleteTaskCount = selectedCategory.tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task": "tasks"
    categoryCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function renderLists() {
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
