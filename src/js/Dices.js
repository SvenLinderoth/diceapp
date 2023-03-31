//--------------------------------
// Klass för tärningar, representerar en tärning med 6 sidor
// Innehåller metod för att plocka ut en slumpad tärning 
//--------------------------------
var Dices = function () {
    this.contentLists1 = document.createElement('li');
    this.contentLists1.className = 'dice dice-side-one';
    this.contentLists2 = document.createElement('li');
    this.contentLists2.className = 'dice dice-side-two';
    this.contentLists3 = document.createElement('li');
    this.contentLists3.className = 'dice dice-side-three';
    this.contentLists4 = document.createElement('li');
    this.contentLists4.className = 'dice dice-side-four';
    this.contentLists5 = document.createElement('li');
    this.contentLists5.className = 'dice dice-side-five';
    this.contentLists6 = document.createElement('li');
    this.contentLists6.className = 'dice dice-side-six';

    this.dices = [this.contentLists1, this.contentLists2, this.contentLists3, this.contentLists4, this.contentLists5, this.contentLists6];
    //--------------------------------
    // Metod för att plocka ut en slumpad tärning 
    // Returnar en slumpad tärning som ett li element med tillhörande klassnamn för den slumpade tärningen
    //--------------------------------
    this.randomDice = function (e) {
        const randomIndex = Math.floor(Math.random() * this.dices.length);
        const item = this.dices[randomIndex];
        let x = item;

        return x;
    }
}