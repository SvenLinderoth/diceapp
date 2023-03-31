//--------------------------------
// DiceApp 
// @Klass 
// Representerar tärningsfönster med tillhörande funktionalitet för en tärningsapplikation
// Används för instansiering och kan appendas till DOM:en
// Innehåller DOM struktur med tillhörande Metoder och Funktioner
//--------------------------------
var DiceApp = function () {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'dice-window-wrapper';

    this.menu = document.createElement('div');
    this.menu.className = 'dice-menubar-wrapper';
    this.menu;

    this.close = document.createElement('div');
    this.close.className = 'close';

    this.toolbarWrapper = document.createElement('div');
    this.toolbarWrapper.className = 'dice-toolbar-wrapper';
    this.ul = document.createElement('ul');

    this.add = document.createElement('li');
    this.add.className = 'add';
    this.remove = document.createElement('li');
    this.remove.className = 'remove';
    this.roll = document.createElement('li');
    this.roll.className = 'roll';

    this.extraList = document.createElement('li');

    var toolbar = this.toolbarCounter = document.createElement('div');
    this.toolbarCounter.className = 'dice-toolbar-counter-wrapper';

    this.zero1 = document.createElement('li');
    this.zero1.className = 'zero';
    this.zero2 = document.createElement('li');
    this.zero2.className = 'zero';
    this.zero3 = document.createElement('li');
    this.zero3.className = 'zero';
    this.zero4 = document.createElement('li');
    this.zero4.className = 'zero';
    this.zero5 = document.createElement('li');
    this.zero5.className = 'zero';

    this.toolbarCounter.appendChild(this.zero1);
    this.toolbarCounter.appendChild(this.zero2);
    this.toolbarCounter.appendChild(this.zero3);
    this.toolbarCounter.appendChild(this.zero4);
    this.toolbarCounter.appendChild(this.zero5);

    this.content = document.createElement('div');
    this.content.className = 'dice-content-wrapper';
    
    var conUl = this.conUl = document.createElement('ul');

    this.menu.appendChild(this.close);

    this.ul.appendChild(this.add);
    this.ul.appendChild(this.remove);
    this.ul.appendChild(this.roll);
    
    this.extraList.appendChild(this.toolbarCounter);
    this.ul.appendChild(this.extraList);
    this.toolbarWrapper.appendChild(this.ul);
    this.wrapper.appendChild(this.menu);
    this.wrapper.appendChild(this.toolbarWrapper);

    this.content.appendChild(this.conUl);
    this.wrapper.appendChild(this.content);
//--------------------------------
// getApp 
// Metod
// Används för att Appenda objektet till DOM:en på ett ID med page-content-wrapper
//--------------------------------
    this.getApp = function () {
        this.body = document.getElementById('page-content-wrapper');
        this.body.appendChild(this.wrapper);

        return this;
    }

    this.add.addEventListener('click', throwDice);
    this.remove.addEventListener('click', removeDice);
    this.roll.addEventListener('click', rethrow);
    this.wrapper.addEventListener('click', bringFront);

    var m_this = this;
    this.close.addEventListener('click', function (event){
        m_this.closeDiceWindow();
    });
    //--------------------------------
    // throw Dice
    // Används när applikationen vill ta fram en random Dice 
    // Random Dicen hämtas från en instansiering av new Dices
    // Där metoden randomDice kan användas för att få en randomiserad tärning
    // Detta appendas sedan till conUl.childNodes sålänge detta inte överstiger 40
    // Där 40 representerar hur många tärningar som får plats på ett bra och snyggt sätt i diceapplikationen UL 
    //--------------------------------
    function throwDice (e) {
        var dice = new Dices();
        var diceNr = dice.randomDice();
        
        if (conUl.childNodes.length < 40) {
            conUl.appendChild(diceNr);
            playAudio();
            getSum();
        }
    }
    //--------------------------------
    // removeDice
    // Används för att plocka bort den sista childen i conUl 
    // Detta representerar den sista tärningen 
    //--------------------------------
    function removeDice (e) {
        conUl.removeChild(conUl.lastChild);
        playAudio();
        getSum();
    }
    //--------------------------------
    // rethrow
    // används när dicewindowapllikationen vill kasta om alla tärningar
    // Dessa tärningar finns tillgängliga i conUl.childNodes
    // De nya tärningar tas fram genom instans av objeketet new Dices
    // Sedan plockas nya randomiserade tärningar fram genom att ta fram nya tärningar
    // Lika många gånger som loopen på childnodes i conUl görs 
    //--------------------------------
    function rethrow (e) {
        for (let i = 0; i < conUl.childNodes.length; i++) {
            var dices = new Dices();
            dices = dices.dices;

            const randomIndex = Math.floor(Math.random() * dices.length);
            const item = dices[randomIndex];
            let newItem = item;
            conUl.replaceChild(newItem, conUl.childNodes[i]);
        }
        playAudio();
        getSum();
    }   
    //--------------------------------
    // funktionen bringFront 
    // Används i objektet när objektet vill läggas längst fram i DOM:en
    // Sätter Z index till aktuellt Date från objektet Date
    // Efterom en dynamisk siffra såsom Date.getTime på detta gör det möjligt att kontinuerligt lägga zindex på olika objekt
    // oberoende av hur många gånger man klickar på objekten
    //--------------------------------
    function bringFront (e) {
        if (this.style.zIndex == null) {
            this.style.zIndex = 0;
        }
        this.style.zIndex = Math.floor(new Date().getTime()/1000);  
    }
    //--------------------------------
    //Metoden closeDiceWindow 
    // Finns för att läggas på eventlystnaren när applikationen ska ta bort objektet så att det inte syns längre i DOM:en
    // parentElement referar till instansen 'meny:s' parentElement och därför tas synligheten bort för hela objeket då wrappern är parentelement för menyn
    // instansen meny tar bort parentelement som är wrappern
    //--------------------------------
    this.closeDiceWindow = function (e) {
        this.menu.parentElement.remove();
    }
    //--------------------------------
    // Funktionen playAudio 
    // Används inom tärningsobjektets funktionalitet när knappar i tärningsobjektet trycks på
    // Detta callas genom eventlystnare och skapar ett Audio objekt där Audio.play spelar upp ljudfilen som skickats med i new Audio
    //--------------------------------
    var playAudio = function () {
        var audio = new Audio('src/wav/add.wav');
        audio.play();
    }
    //--------------------------------
    // Funktionen getSum 
    // Loopar igenom conUls childnodes som innehåller listor
    // Sedan summerar den listornas klassnamn genom att kolla vad klassnamnen inkluderar
    // Detta klassnamnet ska inkludera aktuell tärning för att ge ett korrekt resultat
    // därefter callas updateSum med summan som parameter, för att hantera listorna med summan som summerats
    //--------------------------------
    var getSum = function () {
        var sum = 0;
        for (let i = 0; i < conUl.childNodes.length; i++) {
            if (conUl.childNodes[i].className.includes('one')) sum = sum + 1;
            else if (conUl.childNodes[i].className.includes('two')) sum = sum + 2;
            else if (conUl.childNodes[i].className.includes('three')) sum = sum + 3;
            else if (conUl.childNodes[i].className.includes('four')) sum = sum + 4;
            else if (conUl.childNodes[i].className.includes('five')) sum = sum + 5;
            else if (conUl.childNodes[i].className.includes('six')) sum = sum + 6;
        }
        updateSum(sum);
    }
    //loopar igenom listan bakvänt och lägger på klassnamn 
    //med hjälp av att kontrollera klassnamnen i funktionen handleclassname 
    var updateSum = function (sum) {
        for (let i = toolbar.children.length -1; i >= 0; i--) {
            const li = toolbar.children[i];
            li.className = sum % 10;
            sum = Math.floor(sum/10);
            handleClassName(li);
        }
    }
    //--------------------------------
    // Funktion handClassName
    // finns i Objektet för att hantera listan som skickas med som parameter
    // Där listans klassnamn har blivit ett @Number ska denna ändras till en @String 
    // Detta görs genom att kolla vad klassnamnet är och lägga på respektive strängnamn för siffrorna
    //returnar aktuell lista med korrekt klassnamn 
    //--------------------------------
    var handleClassName = function (li) {
        if (li.className == 1) li.className = 'one';
        else if (li.className == 2) li.className = 'two';
        else if (li.className == 3) li.className = 'three';
        else if (li.className == 4) li.className = 'four';
        else if (li.className == 5) li.className = 'five';
        else if (li.className == 6) li.className = 'six';
        else if (li.className == 7) li.className = 'seven';
        else if (li.className == 8) li.className = 'eight';
        else if (li.className == 9) li.className = 'nine';
        else li.className = 'zero';

        return li;
    }
}
