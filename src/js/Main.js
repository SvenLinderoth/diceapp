//--------------------------------------
// Main statisk @KLASS
// Initiera för att starta applikation
//--------------------------------------
var Main = {
    //--------------------------------------
    // metoden init initieras med eventlystnare load på window objektet
    // Sedan läggs eventlystnare för att ta fram ett tärningsfönster i showdice funktionen 
    //--------------------------------------
        init: function () {
            var diceBtn = document.getElementById('icon-dice');
            diceBtn.addEventListener('click', Main.showDice);
        },
    //--------------------------------------
    // SHOW DICE metod som initieras i init metoden med eventlystnare på knappen med id:et icon-dice 
    // När knappen trycks på, instansieras objektet DiceApp 
    // Sedan appendas objektet till contentwrappern som hämtas med ett id
    // Slutligen läggs drag and drop eventet på objektet 
    // med hjälp av Biblioteket som skapatas av Henrik, där drag.add lägger till objektet wrapper som ska draggas, när man drar i meny instansen i objektet app
    //--------------------------------
        showDice: function () {
            var app = new DiceApp();
            var wind = document.getElementById('page-content-wrapper');
            wind.appendChild(app.wrapper);
            
            var drag = new DragnDrop();
            drag.add(app.wrapper, app.menu);
        },
}
window.addEventListener('load', Main.init);


