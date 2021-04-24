'use strict';

const assert = require('assert');
const fs = require('fs')

const EnigmaMachine = require('../index');

describe('Enigma Machine', () => {
  function givenTestEnigmaMachine(rotor1, rotor2, rotor3){
    const enigmaMachine = new EnigmaMachine();

    enigmaMachine.insertRotor(rotor1[0], rotor1[1]);
    enigmaMachine.insertRotor(rotor2[0], rotor2[1]);
    enigmaMachine.insertRotor(rotor3[0], rotor3[1]);

    return enigmaMachine;
  }

  describe('Constructor', () => {
    it('should initialize rotor list as array', () => {
      const enigmaMachine = new EnigmaMachine();

      const actualRotorArr = enigmaMachine.rotors;
      const actualIsArr = Array.isArray(actualRotorArr);
      
      assert.deepStrictEqual(actualIsArr, true)
    });

    it('should initialize rotor list as empty array', () => {
      const enigmaMachine = new EnigmaMachine();

      const actualRotorArr = enigmaMachine.rotors;
      const actualLength = actualRotorArr.length;
      
      assert.deepStrictEqual(actualLength, 0);
    });
  });
  
  describe('Insert rotor', () => {
    const rotorFileAlignments = JSON.parse(fs.readFileSync('./Rotor/rotorCharAlignments.json'));

    it('should add rotor instance to rotor list', () => {
      const expectedClassName = 'Rotor';
      
      const enigmaMachine = new EnigmaMachine();
      enigmaMachine.insertRotor(1, 1);
      const actualClassName = enigmaMachine.rotors[0].constructor.name;

      assert.deepStrictEqual(actualClassName, expectedClassName);
    });

    for(let rotorNumber = 1; rotorNumber <= rotorFileAlignments.length; rotorNumber ++){
      it(`should set the correct alignment for rotor ${rotorNumber} with position 1`, () => {
        const expectedAlignment = rotorFileAlignments[rotorNumber - 1].wiring;
        
        const enigmaMachine = new EnigmaMachine();
        enigmaMachine.insertRotor(rotorNumber, 1);
        const actualAlignment = enigmaMachine.rotors[0].charAlignment;
  
        assert.deepStrictEqual(actualAlignment, expectedAlignment);
      });
    }

    it('should only allow a maximum of 3 rotors', () => {
      const enigmaMachine = new EnigmaMachine();

      enigmaMachine.insertRotor(1, 1);
      enigmaMachine.insertRotor(2, 1);
      enigmaMachine.insertRotor(3, 1);
      
      assert.throws(
        () => (enigmaMachine.insertRotor(4, 1)), 
        new Error("No more more than 3 rotors can be added")
      );
    });
  });

  describe('Handle rotor step', () => {
    const enigmaMachine = givenTestEnigmaMachine([1,1], [2,1], [3,1]);
      
    const expectedFirstCharPreEncode = 'E';
    const actualFirstCharPreEncode = enigmaMachine.rotors[0].charAlignment[0];
    assert.deepStrictEqual(
      actualFirstCharPreEncode,
      expectedFirstCharPreEncode,
      "First char does not match expected before encoded"
    );
    
    enigmaMachine.handleRotorStep();
    
    const expectedFirstCharPostEncode = 'J';
    const actualFirstCharPostEncode = enigmaMachine.rotors[0].charAlignment[0];
    assert.deepStrictEqual(
      actualFirstCharPostEncode,
      expectedFirstCharPostEncode,
      "First char does not match expected after encoded"
    );
  });

  describe('Encode char', () => {
    // function givenTestEnigmaMachine(rotor1, rotor2, rotor3){
    //   const enigmaMachine = new EnigmaMachine();

    //   enigmaMachine.insertRotor(rotor1[0], rotor1[1]);
    //   enigmaMachine.insertRotor(rotor2[0], rotor2[1]);
    //   enigmaMachine.insertRotor(rotor3[0], rotor3[1]);

    //   return enigmaMachine;
    // }

    it('should return D for first position of rotors 1, 2 and 3 when input is A', () => {
      const enigmaMachine = givenTestEnigmaMachine([1,1], [2,1], [3,1]);

      const expectedEncoded = 'D';
      const actualEncoded = enigmaMachine.encodeChar('A');

      assert.deepStrictEqual(actualEncoded, expectedEncoded);
    });
    
    it('should rotate the first rotor when encoding a character', () => {
      const enigmaMachine = givenTestEnigmaMachine([1,1], [2,1], [3,1]);
      
      const expectedFirstCharPreEncode = 'E';
      const actualFirstCharPreEncode = enigmaMachine.rotors[0].charAlignment[0];
      assert.deepStrictEqual(
        actualFirstCharPreEncode,
        expectedFirstCharPreEncode,
        "First char does not match expected before encoded"
      );
      
      enigmaMachine.encodeChar('A');
      
      const expectedFirstCharPostEncode = 'J';
      const actualFirstCharPostEncode = enigmaMachine.rotors[0].charAlignment[0];
      assert.deepStrictEqual(
        actualFirstCharPostEncode,
        expectedFirstCharPostEncode,
        "First char does not match expected after encoded"
      );
    });

    it('should return error if encoding when number of rotors is less than 3', () =>{
      const enigmaMachine = new EnigmaMachine();
      enigmaMachine.insertRotor(1, 1);

      const expectedError = new Error('Requires 3 rotors to encode');
      
      assert.throws(() => {enigmaMachine.encodeChar('A')}, expectedError);
    });
  });
});