const container = document.querySelector('.container');
let library = [];
let rows = [];

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        if (this.read === true)
            this.read = false;
        else
            this.read = true;
    }
}


function addToLibrary() { 
    library.push(new Book(
        document.querySelector('#title').value,
        document.querySelector('#author').value,
        parseInt(document.querySelector('#pages').value),
        document.querySelector('#read').checked));

    renderLibrary();
}


function renderLibrary() {
    let currRows = document.querySelectorAll('.row');
    for (row of currRows)
        row.remove();

    rows = [];

    for (let i = 0; i < library.length; i += 3) {
        let temp = document.createElement('div');
        temp.innerHTML =  '<div class="card" style="display: none;"></div>' +
                          '<div class="card" style="display: none;"></div>' +
                          '<div class="card" style="display: none;"></div>';
        temp.classList.add('row');
        container.appendChild(temp);
        rows.push(temp);
    }

    let rowCounter = 0;

    for (let i = 0; i < library.length; i++) {
        if ((i % 3) === 0)
            rowCounter++;
        
        let currCards = Array.from(rows[rowCounter-1].querySelectorAll('.card'));
        currCards[i % 3].innerHTML = `<p>${library[i].name}</p>` +
                                     `<p>${library[i].author}</p>` +
                                     `<p>${library[i].pages} pages</p>` +
                                     '<button class="read">Read</button>' +
                                     '<button class="remove">Remove Book</button>';

        const readButton = currCards[i % 3].querySelector('.read');
        readButton.addEventListener('click', () => {
            if (readButton.classList.contains('read')) {
                readButton.classList.remove('read');
                readButton.classList.add('not-read');
                readButton.textContent = 'Not Read';
            }
            else {
                readButton.classList.remove('not-read');
                readButton.classList.add('read');
                readButton.textContent = 'Read';
            }
        });

        if (library[i].read === false) {
            readButton.classList.remove('read');
            readButton.classList.add('not-read');
            readButton.textContent = "Not Read";
        }

        const removeButton = currCards[i % 3].querySelector('.remove');

        removeButton.addEventListener('click', () => {
            library.splice(i, 1);
            renderLibrary();
        });

        currCards[i % 3].style.display = 'flex';
    }
}

submitButton = document.querySelector('#submit-book');
submitButton.addEventListener('click', addToLibrary);