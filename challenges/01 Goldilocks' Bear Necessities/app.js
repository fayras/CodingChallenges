 let fs = require('fs') //require fs library


 /**
  * Gets suitable chairs array from file with weight and temperature pairs
  * @param  string file Filepath
  */
 function getSuitableChairs(file) {
     let content = fs.readFileSync(file, 'utf8')
     if (content) {
         let lines = content.split('\n') //split content by each new line
         let goldislocksProps = getGoldilocksWeightAndTemperature(lines)
         let chairs = getChairsWeightAndTemperature(lines)
         let suitableChairs = findSuitableChairsForGoldilocks(goldislocksProps, chairs)
         return suitableChairs
     } else
         return null
 }

 /**
  * Parse Goldilocks and chair's weight and temperature from each line and save it in in properties this.weight and this.maxTemperature or in an array this.chairs
  * @param  array lines Lines array from file
  * @return {object Object with Goldilock's weight and temperature
  */
 function getGoldilocksWeightAndTemperature(lines) {
     let weight = parseInt(lines[0].split(' ')[0]) //get weight of Goldilocks from first line
     let maxTemperature = parseInt(lines[0].split(' ')[1]) //get maximum temperature that Goldilocks can tolerate from first line
     return { weight: weight, temperature: maxTemperature }
 }

 /**
  * Parse Goldilocks and chair's weight and temperature from content string and save it in in properties this.weight and this.maxTemperature or in an array this.chairs
  * @param  string content Content string returned from fs.readFile
  * @return array chairs Chairs array with weight and temperature
  */
 function getChairsWeightAndTemperature(lines) {
     let chairs = []
     for (let i = 1; i < lines.length; i++) { //iterate through all lines from index = 1, because index = 0 ist Goldilock's weight and temperature
         let lineArray = lines[i].split(' ') //split weight and temperature values
         chairs.push({ weight: parseInt(lineArray[0]), temperature: parseInt(lineArray[1]) }) //get integers from string values, that contains kg and °C and add them to array as object
     }
     return chairs
 }

 /**
  * Finds suitable chairs from all value pairs in this.chairs
  * @param object goldislocksProps Object with weight and temperature
  * @param chairs array Array with all chairs from file
  * @return array suitable chairs for Goldilocks
  */
 function findSuitableChairsForGoldilocks(goldislocksProps, chairs) {
     let suitableChairs = []
     chairs.forEach((chair, index) => {
         if (chair.weight >= goldislocksProps.weight && chair.temperature <= goldislocksProps.temperature)
             suitableChairs.push({ index: index + 1, weight: chair.weight, temperature: chair.temperature }) //add this chair index to suitable chairs array with index +1, because there are no Goldilocks parameters as first arrayelement
     })
     return suitableChairs
 }

 /**
  * Output in console of suitable chairs for Goldilocks with its properties 
  * @param array suitableChairs Array with suitable chairs
  */
 function descriptiveOutput(suitableChairs) {
     suitableChairs
         .forEach((chair) => {
             console.log('Suitable chair',
                 chair.index,
                 'with maximum weight',
                 chair.weight,
                 'kg and temperature', chair.temperature,
                 '°C'
             )
         });
 }

 /**
  * Simple output of chairs indexes in console
  * @param  array suitableChairs Array with suitable chairs
  */
 function simpleOutput(suitableChairs) {
     let output = "Goldilocks suitable chairs: "

     suitableChairs
         .forEach((chair) => {
             output += " " + chair.index
         });
     console.log(output + "\n")
 }

 let suitableChairs = getSuitableChairs('inputs.txt')
 if (suitableChairs && suitableChairs.length > 0) {
     simpleOutput(suitableChairs)
     descriptiveOutput(suitableChairs)
 } else
     console.log('Could not get any suitable chairs, because of error')
