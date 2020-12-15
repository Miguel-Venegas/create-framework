// to make our code safe, we need to wrap it in an immediately invoked function express
// let's make a function that returns firstname and lastname and language using 'G$'

(function(global, $){

    let Greeter = function(firstName, lastName, language){
        return new Greeter.init(firstName, lastName, language);
    }

// unexposed objects, can't be changed by the outside world

    let supportedLangs = ['en', 'es'];

    let greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    let formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    let logMessages = {
        en: 'Logged in: ',
        es: 'Inicio sesion: '
    };

// exposed methods and properties, available to any objected created out of Greeter function

    Greeter.prototype = {

        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        validate: function(){
            if(supportedLangs.indexOf(this.language === -1)){
                throw "Language not supported at this time.";
            }
        },
        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        greet: function(formal){
            let msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg);
            }
            // 'this' refers to the calling object at execution time, making it chainable
            return this;
        },
        // setLang: function(lang){
        //    this.language = lang;
        //     this.validate();
        //     return this;
        // },
        log: function(){
            if (console) {
                console.log(logMessages[this.language]  + this.fullName());
            }
            return this;
        },
    };

    Greeter.init = function(firstName, lastName, language){
        let self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

    }

    Greeter.init.prototype = Greeter.prototype;

    global.Greeter = global.G$ = Greeter;

}(window, jQuery));