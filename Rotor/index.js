'use strict';

const fs = require('fs');

class Rotor {
  constructor(rotorNumber, startingPos){
    this.rotorNumber = rotorNumber;

    this.config = this.getRotorConfig(rotorNumber)
    this.charAlignment = this.config.wiring;
    this.turnover = this.config.turnover

    this.charAlignment = this.setRotorPosition(startingPos);
  }
  
  getRotorConfig(rotorNumber){
    const rotorArrIndex = rotorNumber - 1;
    const allRotorConfigsRaw = fs.readFileSync('./Rotor/rotorCharAlignments.json');
    const allRotorConfigs = JSON.parse(allRotorConfigsRaw);

    return allRotorConfigs[rotorArrIndex];
  }

  turnRotor(){
    const lastchar = this.charAlignment.pop();
    this.charAlignment = [lastchar].concat(this.charAlignment);
  }

  setRotorPosition(position){
    if(position == 1) {
      return this.charAlignment;
    } else if(position > 1 && position <= 26){
      const chunkRotatedToFront = this.charAlignment.slice(- (position - 1));
      const chunkRotatedToBack = this.charAlignment.slice(0, 26 - (position - 1));

      return chunkRotatedToFront.concat(chunkRotatedToBack);
    }

    throw new Error("Rotor starting position must be in the range: 1-26");
  }

  encodeChar(inputChar){
    const charNum = inputChar.toUpperCase().charCodeAt(0);
    return this.charAlignment[charNum - 65];
  }
}

module.exports = Rotor;