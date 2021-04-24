'use strict';

const assert = require('assert');
const fs = require('fs');

const Rotor = require('../index');

describe('Rotor', () => {
  const rotorConfig = JSON.parse(fs.readFileSync('./Rotor/rotorCharAlignments.json'));

  describe('constructor', () => {
    it('should initialize the rotor alignment as array', () => {
      const rotorInstance = new Rotor(1, 1);
      const actualCharAlignment = rotorInstance.charAlignment;
      const actualIsArray = Array.isArray(actualCharAlignment);
  
      assert.deepStrictEqual(actualIsArray, true)
    });

    it('should correctly set rotors starting alignment for position 2', () => {
      const expectedCharAlignment = ["J", "E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C"];

      const rotorInstance = new Rotor(1, 2);
      const actualCharAlignment = rotorInstance.charAlignment;

      assert.deepStrictEqual(actualCharAlignment, expectedCharAlignment);
    })
  });

  describe('Get Rotor config', () => {
    for(let rotorNumber = 1; rotorNumber <= rotorConfig.length; rotorNumber ++){    
      it(`should return an array for a valid rotor number: ${rotorNumber}`, () => {
        const rotorInstance = new Rotor(rotorNumber, 1);
        const rotorConfig = rotorInstance.getRotorConfig(rotorNumber);
        const actualIsArray = Array.isArray(rotorConfig.wiring);
        
        assert.deepStrictEqual(actualIsArray, true);
      });
  
      it(`should set correct starting alignment for rotor number: ${rotorNumber}`, () => {
        const rotorInstance = new Rotor(rotorNumber, 1);
        const actualRotorAlignment = rotorInstance.getRotorConfig(rotorNumber);
        
    
        assert.deepStrictEqual(actualRotorAlignment.wiring, rotorConfig[rotorNumber - 1].wiring);
        assert.deepStrictEqual(actualRotorAlignment.turnover, rotorConfig[rotorNumber - 1].turnover);
      });
    }
  });

  describe('Set rotor position', () => {
    it('should return default alignment for position 1', () => {
      const expectedAlignment = rotorConfig[0].wiring;
      
      const rotorInstance = new Rotor(1, 1);
      const actualAlignment = rotorInstance.setRotorPosition(1);

      assert.deepStrictEqual(actualAlignment, expectedAlignment);
    });

    it('should return default alignment for position 2', () => {
      const expectedAlignment = ["J", "E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C"];
      
      const rotorInstance = new Rotor(1, 1);
      const actualAlignment = rotorInstance.setRotorPosition(2);

      assert.deepStrictEqual(actualAlignment, expectedAlignment);
    });

    it('should return default alignment for position 3', () => {
      const expectedAlignment = ["C", "J", "E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R"];
      
      const rotorInstance = new Rotor(1, 1);
      const actualAlignment = rotorInstance.setRotorPosition(3);

      assert.deepStrictEqual(actualAlignment, expectedAlignment);
    });
  });

  describe('Turn rotor', () => {
    it('should set the correct alignment when turning the rotor once', () => {
      const expectedCharAlignment = ["J", "E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C"];
      
      const rotorInstance = new Rotor(1, 1);
      rotorInstance.turnRotor();
      const actualCharAlignment = rotorInstance.charAlignment;

      assert.deepStrictEqual(actualCharAlignment, expectedCharAlignment);
    });

    it('should set the correct alignment when turning the rotor twice', () => {
      const expectedCharAlignment = ["C", "J", "E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R"];
      
      const rotorInstance = new Rotor(1, 1);
      rotorInstance.turnRotor();
      rotorInstance.turnRotor();
      const actualCharAlignment = rotorInstance.charAlignment;

      assert.deepStrictEqual(actualCharAlignment, expectedCharAlignment);
    });
  });

  describe('Encode char', () => {
    it('should return E for first position of rotor 1 when input is A', () => {
      const rotorInstance = new Rotor(1, 1);

      const inputChar = 'A' 
      const expectedDecodedChar = 'E';
      const actualDecodedChar = rotorInstance.encodeChar(inputChar);      

      assert.deepStrictEqual(actualDecodedChar, expectedDecodedChar);
    });
    
    it('should return E for first position of rotor 1 when input is a', () => {
      const rotorInstance = new Rotor(1, 1);
      
      const inputChar = 'a' 
      const expectedDecodedChar = 'E';
      const actualDecodedChar = rotorInstance.encodeChar(inputChar);      
      
      assert.deepStrictEqual(actualDecodedChar, expectedDecodedChar);
    });

    it('should return K for first position of rotor 1 when input is B', () => {
      const rotorInstance = new Rotor(1, 1);
  
      const inputChar = 'B' 
      const expectedDecodedChar = 'K';
      const actualDecodedChar = rotorInstance.encodeChar(inputChar);      
  
      assert.deepStrictEqual(actualDecodedChar, expectedDecodedChar);
    });
  });
});