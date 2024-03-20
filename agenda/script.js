const renderCategrory =() => {
    const categroryList = document.querySelector('.categrory-list');
    categroryList.innerHTML = '';
    for (let i = 0; i < categrory.length; i++) {
        const categroryItem = document.createElement('li');
        categroryItem.innerHTML = categrory[i];
        categroryList.appendChild(categroryItem);
    }
}
