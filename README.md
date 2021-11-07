# Mystery Organism

This module exists to create instances of fantasy pAequor organisms. 

Available functions:
* `returnRandBase ()`: returns a random string of 'A', 'T', 'C' or 'G' base
* `mockUpStrand ()`: returns a strand of 15 random bases
* `pAequorFactory (specimenNum, dna)`: creates a new instance of pAequor object. Has following methods:
    * `.mutate ()`: randomly mutates one base
    * `.compareDNA (specimenObj)`: compares DNA of this instance to passed species object, returns likeness percentage number, prints a message with likeness percentage
    * `.willLikelySurvive ()`: checks whether DNA of this instance containas at least 60% of 'C' and 'G' bases, returns Boolean
    * `.complementStrand ()`: changes all 'A' bases to 'T" and vice versa, and all 'C' bases to 'G' and vice versa
* `createSurvivingSpecimens (num)`: takes a number and returns an array of this number of pAequor specimens that are likely to survive
* `findRelatives (arrOfObjects)`: takes an array of specimen objects, returns an array with two objects that have the greatest DNA strand likeness. If more than two object have this likeness percentage, returns the first pair