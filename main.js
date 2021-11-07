// returns a random dna base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)] ;
}

// returns an array with a random single stand of dna containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
}

const pAequorFactory = (specimenNum, dna) => {
  // returns an object of the pAequor organism
  return {
    specimenNum, // must be unique
    dna,
    // methods
    mutate () {
      /* randomly selects an A, T, C or G in dna strand,
        changes it to a different base, returns new dna array */
      const randBaseIndex = Math.floor(Math.random() * 15);
      const chooseRandBase = () => {
        return this.dna[randBaseIndex];
      }
      let randBase = chooseRandBase(); // mutable
      const randChoice = arr => arr[Math.floor(Math.random() * 3)];
      switch (randBase) {
        case 'A': 
          randBase = randChoice(['T', 'C', 'G']);
          break;
        case 'T':
          randBase = randChoice(['A', 'C', 'G']);
          break;
        case 'C':
          randBase = randChoice(['A', 'T', 'G']);
          break;
        case 'G':
          randBase = randChoice(['A', 'T', 'C']);
          break;
      }
      this.dna[randBaseIndex] = randBase;
      return this.dna;
    },

    compareDNA (specimenObj) {
      // count the differences in two arrays and calc the percentage of 15
      const baseDna = this.dna;
      const otherDna = specimenObj.dna;
      const commonBaseArr = [];
      for (let i = 0; i < 15; i++) {
        if (baseDna[i] === otherDna[i]) {
          commonBaseArr.push(otherDna[i]);
        }
      }
      const likeness = commonBaseArr.length / 15 * 100;
      console.log(`Specimen ${this.specimenNum} and specimen ${specimenObj.specimenNum} have ${likeness.toFixed(2) + '%'} DNA in common.`);
      return likeness; // returns number
    },

    willLikelySurvive () {
      // checks if C and G bases are at least 60% of strand
      const survivalArr = this.dna.filter(base => base === 'C' || base === 'G');
      return survivalArr.length / 15 >= 0.6;
    },

    complementStrand () {
      // substitutes dna array for a complementary
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === 'A') {
          this.dna[i] = 'T';
        } else if (this.dna[i] === 'T') {
          this.dna[i] = 'A';
        } else if (this.dna[i] === 'C') {
          this.dna[i] = 'G';
        } else if (this.dna[i] === 'G') {
          this.dna[i] = 'C';
        }
      }
      return this.dna;
    }
  }
}

const createSurvivingSpecimens = (num) => {
  specimenArr = [];
  let i = 1;
  do {
    const newSpecimen = pAequorFactory(i, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
      specimenArr.push(newSpecimen);
      i++;
    }
  } while (i <= num);
  return specimenArr;
}

const findRelatives = (arrOfObj) => {
  // find two most related instances in the object array
  // for each object: find one most related to it, remove them
  const likenessArr = [];
  arrOfObj.forEach(obj => {
    const copyOfArr = arrOfObj.slice();
    const index = arrOfObj.indexOf(obj);
    copyOfArr.splice(index, 1);
    copyOfArr.forEach(otherObj => {
      const likeness = obj.compareDNA(otherObj);
      likenessArr.push({obj, otherObj, likeness});
    });
  });
  // console.log(likenessArr);
  const mostRelatedObjects = likenessArr.sort((item1, item2) => item1.likeness < item2.likeness)[0];
  console.log(`Specimen ${mostRelatedObjects.obj.specimenNum} and specimen ${mostRelatedObjects.otherObj.specimenNum} are most likely to be related. Their DNA strands are ${mostRelatedObjects.likeness}% alike.`)
  return [mostRelatedObjects.obj, mostRelatedObjects.otherObj];
}

// tests
const specimen111 = pAequorFactory(111, mockUpStrand());
console.log(specimen111);
const specimen222 = pAequorFactory(222, mockUpStrand());
console.log(specimen222);
const specimen333 = pAequorFactory(333, mockUpStrand());
const specimen444 = pAequorFactory(444, mockUpStrand());
specimen111.mutate();
console.log(specimen333);
console.log(specimen111.compareDNA(specimen333));
console.log(specimen111.willLikelySurvive());
console.log(createSurvivingSpecimens(2));
console.log(findRelatives([specimen111, specimen222, specimen333]));
// end of tests

module.exports = { returnRandBase, mockUpStrand, pAequorFactory, createSurvivingSpecimens, findRelatives };