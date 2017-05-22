var fs = require('fs');

//function to read lines of the text file inputs.txt
let readRows= input => {

    let user_input_data = '';

    console.log("Available Tables for Goldlöckchen");

    input.on('data', function(data) {
        user_input_data += data;

        //index takes all the data and all rows
        let index = user_input_data.indexOf('\n');

        //taking first row and getting the weight
        let user_weight=parseInt(user_input_data.substring(0, 4));

        //taking first row and getting the temperature
        let user_temp=parseInt(user_input_data.substring(4,7));

        //Setting the variables for the iterating of elements of text file
        let initial=1;

        let seat = -1;

        //Looping through each element
        while (index > -1) {
            seat++;

            let line = user_input_data.substring(0, index);

            user_input_data = user_input_data.substring(index + 1);

            initial++;
            //Ignoring first row of the text file
            if(initial > 2){
                //extracting weights and considering number till 'k'
                let available_weights=line.substring(0,line.indexOf('k'));
                //extracting temperature and considering number till '°'
                let temperature=line.substring(5,line.indexOf('°')).trim();
                //Checking if both conditions meet
                if ((temperature <= user_temp) && (available_weights >= user_weight)){
                    console.log("Seat Number : "+ seat);
                }
            }
            index = user_input_data.indexOf('\n');
        }
    });
};
//Reading file 'inputs.txt'
var input = fs.createReadStream('inputs.txt');
readRows(input);

