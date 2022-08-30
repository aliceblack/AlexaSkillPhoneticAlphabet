/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//Skill data
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn.....ask.skill.............';
const APP_ID = 'amzn.....ask.skill......';

const SKILL_NAME = 'Alfabeto fonetico';
const HELP_MESSAGE = 'Prova a chiedere ad Alexa, apri alfabeto fonetico!';
const HELP_REPROMPT = 'Cosa posso fare per te?';
const STOP_MESSAGE = 'A presto!';

let alphabet=[
    "alfa", 
    "bravo", 
    "charlie", 
    "delta", 
    "echo", 
    "foxtrot", 
    "golf", 
    "hotel", 
    "india", 
    "juliett", 
    "kilo", 
    "lima", 
    "mike", 
    "november", 
    "oscar", 
    "papa", 
    "quebec", 
    "romeo", 
    "sierra", 
    "tango", 
    "uniform", 
    "victor", 
    "whiskey", 
    "x-ray", 
    "yankee", 
    "zulu"
];

//=========================================================================================================================================
//Skill handlers
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        let speechOutput = '';
        alphabet.map(letter=>{
            speechOutput+=letter+", ";
        })
        this.response.cardRenderer(SKILL_NAME, speechOutput);
        this.response.speak(speechOutput).listen("Prova a chiedere se una lettera a tua scelta è corretta");
        this.emit(':responseReady');
    },
    'isCorrect': function () {
        if (this.event.request.dialogState === 'STARTED') {
            let updatedIntent = this.event.request.intent;
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState != 'COMPLETED'){
            this.emit(':delegate');
        } else {
            let letter = this.event.request.intent.slots.lettera.value;
            console.log(letter);
            let isPresent = alphabet.includes(letter);
            console.log(isPresent);
            let speechOutput = '';
            if(isPresent){
                speechOutput = "Corretto!";
            }else{
                speechOutput = "Sbagliato!";
            }
            this.response.cardRenderer(SKILL_NAME, speechOutput);
            this.response.speak(speechOutput).listen("Prova a chiedere se una lettera a tua scelta è corretta");
            this.emit(':responseReady');
        }
        
        
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
