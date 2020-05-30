import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  inputState = {
    typeOfGear: "85",
    rarity: "Heroic",
    enhanceLevel: "15",
    attackPercentage: null,
    attackFlat: null,
    defensePercentage: null,
    defenseFlat: null,
    healthPercentage: null,
    healthFlat: null,
    effectiveness: null,
    effectResistance: null,
    speed: null,
    critChance: null,
    critDamage: null
  }
  validation = {
    maxAttackPercentage: null,
    maxDefensePercentage: null,
    maxHealthPercentage: null,
    maxEffectiveness: null,
    maxEffectResistance: null,
    maxCritDamage: null,
    maxCritChance: null,
    maxSpeed: null,
    maxAttackFlat: null,
    maxDefenseFlat: null,
    maxHealthFlat: null
  };
  placeholders = {
    attackPercentage: null,
    attackFlat: null,
    defensePercentage: null,
    defenseFlat: null,
    healthPercentage: null,
    healthFlat: null,
    effectiveness: null,
    effectResistance: null,
    speed: null,
    critChance: null,
    critDamage: null
  };

  ngOnInit(): void {
    this.setPlaceholderAndValidation(this.inputState.typeOfGear, this.inputState.enhanceLevel, this.inputState.rarity);
  }

  rateGear = function () {
    //todo
  }

  private setPlaceholderAndValidation = function (typeOfGear: string, enhanceLevel: string, rarity: string) {
    const isReforged = typeOfGear === "90";
    const amountOfRollsForSub = this.getMaxRollsOnSubstat(rarity, enhanceLevel);
    const reforgeBonusStats = this.getReforgeBonusStats(5);
    const maxSubstatsForGearType = this.getMaxSubstatsForGearType(typeOfGear);

    const calculateMaxRoll = (maxSubstatsForGearType, amountOfRolls, isReforged, subIndex) => {
      let extraReforgeStats = 0;
      if (isReforged) {
        extraReforgeStats += reforgeBonusStats[subIndex];
      }

      return maxSubstatsForGearType[subIndex] * amountOfRolls + extraReforgeStats;
    }

    this.placeholders = {
      attackPercentage: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 0) + "%",
      defensePercentage: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 1) + "%",
      healthPercentage: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 2) + "%",
      effectiveness: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 3) + "%",
      effectResistance: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 4) + "%",
      critDamage: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 5) + "%",
      critChance: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 6) + "%",
      speed: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 7),
      attackFlat: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 8),
      defenseFlat: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 9),
      healthFlat: "0% - " + calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 10),
    }

    this.validation = {
      maxAttackPercentage: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 0),
      maxDefensePercentage: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 1),
      maxHealthPercentage: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 2),
      maxEffectiveness: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 3),
      maxEffectResistance: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 4),
      maxCritDamage: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 5),
      maxCritChance: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 6),
      maxSpeed: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 7),
      maxAttackFlat: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 8),
      maxDefenseFlat: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 9),
      maxHealthFlat: calculateMaxRoll(maxSubstatsForGearType, amountOfRollsForSub, isReforged, 10),
    }

  }

  private getReforgeBonusStats = function (amountOfRollsIntoSubstat: number) {
    switch (amountOfRollsIntoSubstat) {
      case 0: return [1, 1, 1, 1, 1, 1, 1, 0, 11, 9, 56];
      case 1: return [3, 3, 3, 3, 3, 2, 2, 1, 18, 14, 81];
      case 2: return [4, 4, 4, 4, 4, 3, 3, 2, 24, 20, 112];
      case 3: return [5, 5, 5, 5, 5, 4, 4, 3, 30, 25, 147];
      case 4: return [7, 7, 7, 7, 7, 5, 5, 4, 38, 29, 173];
      case 5: return [8, 8, 8, 8, 8, 6, 6, 5, 47, 34, 202];
      default: return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }

  private getMaxRollsOnSubstat = function (rarity: string, enhanceLevel: string) {

    var coff = 1;
    if (rarity === "Heroic") {
      switch (enhanceLevel) {
        case "0": coff = 1; break;
        case "3": coff = 2; break;
        case "6": coff = 3; break;
        case "9": case "12": coff = 4; break;
        case "15": coff = 5; break;
        default: coff = 5;
      }
    }
    if (rarity === "Epic") {
      switch (enhanceLevel) {
        case "0": coff = 1; break;
        case "3": coff = 2; break;
        case "6": coff = 3; break;
        case "9": coff = 4; break;
        case "12": coff = 5; break;
        case "15": coff = 6; break;
        default: coff = 6;
      }
    }

    return coff;
  }

  private getMaxSubstatsForGearType = function (typeOfGear: string) {
    switch (typeOfGear) {
      case "85": case "90r":
        return [8, 8, 8, 8, 8,
          7, 5, 5,
          47, 34, 202];
      case "88":
        return [9, 9, 9, 9, 9,
          8, 6, 5,
          50, 36, 220];
    }
  }
}