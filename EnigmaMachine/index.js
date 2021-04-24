'use strict';

const Rotors = require('../Rotor');

class EnigmaMachine {
  constructor(){
    this.rotors = [];
    this.reflector = {};
    this.plugBoard = null;
  }

  insertRotor(rotorNumber, startingPos){
    if(this.rotors.length === 3) {
      throw new Error("No more more than 3 rotors can be added");
    }

    this.rotors.push(new Rotors(rotorNumber, startingPos));
  }

  handleRotorStep(){
    this.rotors[0].turnRotor();
  }

  encodeThroughRotors(currentChar) {
    let encodedChar = currentChar;
    for(let i = 0; i < this.rotors.length; i++){
      encodedChar = this.rotors[i].encodeChar(encodedChar); 
    }
    return encodedChar;
  }
  
  encodeThroughRotorsReversed(currentChar) {

  }

  encodeChar(inputChar){
    if(this.rotors.length < 3){
      throw new Error('Requires 3 rotors to encode');
    }
    
    this.handleRotorStep();

    let encodedChar = inputChar;
    encodedChar = this.encodeForwardThroughRotors(encodedChar);
    return encodedChar;
  }
}

module.exports = EnigmaMachine;