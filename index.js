const word_to_find = [
    'ANGULAR',
    'ARDUINO',
    'BOOTSTRAP',
    'COBOL',
    'CSS',
    'DART',
    'ELIXIR',
    'HTML',
    'JAVA',
    'LARAVEL',
    'POSTGRESQL',
    'TYPESCRIPT',
    'VUE',
    'YAML'
];

class hangedMan {
    constructor({element, list_of_words}){
        this.element = element;
        this.list_of_words = list_of_words;
        this.errors = 0;
        this.attempts = 0;
        this.letters_found = 0;
        this.random_word;
        this.hidden_letters;
        this.init();
    }

init() {
    this.random_word = this.getRandomWorld(word_to_find);
    console.log(this.random_word);
    

    const word_element = document.createElement('section');
    word_element.id = 'word_to_find';

    word_element.innerHTML = 
    `
        <figure>
            <img src = "./images/error1.png" alt = "support pendaison">
            <figcaption>Nombre de lettres à trouver : ${this.random_word.length}<hr>Lettres trouvées: ${this.letters_found}
            <hr>Tentatives: ${this.attempts}<hr>Erreurs : ${this.errors} / 5</figcaption>
        </figure>
    `;

    const letters_element = document.createElement('section');

    letters_element.id = 'letters';

    this.generateletterButtons(letters_element);

    this.element.appendChild(word_element);
    this.element.appendChild(letters_element);

    this.hidden_letters = this.displayHiddenWord(this.random_word);
    console.log(this.hidden_letters);


}

getRandomWorld(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array[0];
    }  
    
generateletterButtons(letters_element) {
    const ul_element = document.createElement('ul');

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {

        const li_element = document.createElement('li');
        li_element.textContent = letter;

        li_element.addEventListener('click', () => this.checkIfLetterIsInTheWord(event),
        {
            once: true
        });

        ul_element.appendChild(li_element);
    });
    letters_element.appendChild(ul_element);
    }  
    
displayHiddenWord() {
    const hidden_word = this.random_word.slice().replace(/[A-Z]/g, '_');

    const paragraph_element = document.createElement('p');

    paragraph_element.textContent = hidden_word;

    document.body.querySelector('section[id="word_to_find"]').appendChild(paragraph_element);

    return hidden_word.split(' ');
}

checkIfLetterIsInTheWord(event) {
    this.attempts++;
    const selected_letter = event.target.textContent;

    if (this.random_word.includes(selected_letter)) {

        event.target.classList.add('good');

        this.random_word.split(' ').forEach((letter, index) => {
            if (letter === selected_letter){
                this.letters_found++;
                this.hidden_letters[index] = selected_letter;
            }
        });

        document.body.querySelector('section[id="word_to_find"] > p').textContent = this.hidden_letters.join('');
        console.log(this.hidden_letters);
    }

    else {
        this.errors++;
        event.target.classList.add('wrong');
        document.body.querySelector('img').src = `./images/error${this.errors}.png`

    }
    document.body.querySelector('figcaption').innerHTML = `Nombre de lettres à trouver : ${this.random_word.length}
    <hr>Lettres trouvées : ${this.letters_found}<hr>Tentatives : ${this.attempts}<hr>Erreurs : ${this.errors} /5`

    this.checkIfWinOrLoose();
}

checkIfWinOrLoose(){
    const word_paragraph = document.body.querySelector('section[id="word_to_find"] > p');

    if (this.errors === 5) {
        this.gameOver(word_paragraph);
        word_paragraph.classList.add('loser');
        word_paragraph.textContent = this.random_word;
    }
    if (this.letters_found === this.random_word.length) {
        this.gameOver(word_paragraph);
        word_paragraph.classList.add('winner');
    }
}
gameOver(word_paragraph) {

}

}

new hangedMan ({
    element: document.body.querySelector('main'),
    list_of_words: word_to_find
})

