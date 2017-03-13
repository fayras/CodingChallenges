var fs = require('fs');

function readRows(input) {
    var user_input_data = '';

    console.log("Available Tables for Goldlöckchen");

    input.on('data', function(data) {
        user_input_data += data;
        var index = user_input_data.indexOf('\n');

        user_weight=parseInt(user_input_data.substring(0, 4));
        user_temp=parseInt(user_input_data.substring(4,7));

        var initial=1;
        var seat = -1;
        while (index > -1) {
            seat++;
            var line = user_input_data.substring(0, index);
            user_input_data = user_input_data.substring(index + 1);
            initial++;

            if(initial > 2){
                var available_weights=line.substring(0,line.indexOf('k'));
                var temperature=line.substring(5,line.indexOf('°')).trim();

                if ((temperature <= user_temp) && (available_weights >= user_weight)){
                    console.log("Seat Number : "+ seat);
                }
            }
            index = user_input_data.indexOf('\n');
        }
    });
}

var input = fs.createReadStream('inputs.txt');
readRows(input);
