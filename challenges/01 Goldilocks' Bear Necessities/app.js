class GoldilocksHelper {

    /**
     * Constuctor
     * @param  string file Filepath
     */
    constructor(file) {
        this.readFile(file, (err, content) => {
            if (err)
                throw err
            else {
                this.parseValues(content)
                this.calculateSuitableChairs()
                this.output()
            }
        })
    }

    /**
     * Read File as string
     * @param  string file Filepath
     * @param  callback (err,content) Callback
, after fileread completed
     */
    readFile(file, callback) {
        let fs = require('fs') //require fs library
        fs.readFile(file, 'utf8', callback) //read file with nodejs
    }

    /**
     * Parse values from content string
     * @param  string content Content string returned from fs.readFile
     *
     */
    parseValues(content) {
        let lines = content.split('\n') //split content string to array line by line
        this.weight = parseInt(lines[0].split(' ')[0]) //get weight of Goldilocks from first line left value
        this.maxTemperature = parseInt(lines[0].split(' ')[1]) //get maximum temperature that Goldilocks can tolerate from first line right value
        let lineArray
        this.chairs = []
        for (let i = 1; i < lines.length; i++) { //iterate through all lines from index = 1
            lineArray = lines[i].split(' ') //split left and right values
            this.chairs.push({ weight: parseInt(lineArray[0]), temperature: parseInt(lineArray[1]) }) //parse int from string values and then push them as object to array
        }
    }

    /**
     * Calculates suitable chairs from all value pairs in this.chairs
     */
    calculateSuitableChairs() {
        this.suitableChairs = []
        this.chairs.forEach((chair, index) => {
            if (chair.weight >= this.weight && chair.temperature <= this.maxTemperature) // if chair maximum weight is greater than Goldilocks and temperature less than Goldilocks
                this.suitableChairs.push(index + 1) //add this chair index to suitable chairs array with index +1, because there are no Goldilocks parameters as first arrayelement
        });
    }

    /**
     * Output in console
     */
    output() {
        this.suitableChairs
            .forEach((chairIndex) => {
                console.log('Suitable chair',
                    chairIndex,
                    'with maximum weight',
                    this.chairs[chairIndex - 1].weight,
                    'kg and temperature', this.chairs[chairIndex - 1].temperature,
                    '°C'
                )
            });
    }


}

let helper = new GoldilocksHelper("inputs.txt")
