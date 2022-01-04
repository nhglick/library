const addBookButton = document.querySelector('#add-book');
const modal = document.querySelector('#modal');
const span = document.querySelector('.close');

addBookButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

span.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal)
        modal.style.display = 'none';
});

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape")
        modal.style.display = 'none';
});