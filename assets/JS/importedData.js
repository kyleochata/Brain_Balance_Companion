var url = "https://sheets.googleapis.com/v4/spreadsheets/1rgaHm4qlXdKpJvU52u6LCGlUBekrUx_bhUoTWmJ8t8E/?key=AIzaSyC8CJzSaxpcbUmHFLGfUkcSqTBhckWhpp0&includeGridData=true";
axios.get(url)
    .then(function (response) {
        // console.log(response);
        getResponse(response);
    })
    .catch(function (error) {
        console.log(error);
    });

function getResponse(object) {
    let cardInfo = {
        activity: "",
        weeks: "",
        assignment: "",
        quantity: "",
        notes: ""
    }
    let master = object.data.sheets[1].data[0].rowData
    let activityCol = -1
    let weekCol = -1
    let assignmentCol = -1
    let quantityCol = -1
    let notesCol = -1
    for (let i = 0; i < master.length; i++) {
        for (let j = 0; j < master[0].values.length; j++) {
            let value = master[i].values[j].formattedValue
            if (value == null)
            { 
                continue;
            }
            if (i == 0)
            {
                if (value.toLowerCase().trim() == 'activity')
                {
                    activityCol = j;
                }
                if (value.toLowerCase().trim() == 'weeks')
                {
                    weekCol = j;
                }
                if (value.toLowerCase().trim() == 'assignment')
                {
                    assignmentCol = j;
                }
                if (value.toLowerCase().trim() == 'quantity')
                {
                    quantityCol = j;
                }
                if (value.toLowerCase().trim() == 'coach notes:')
                {
                    notesCol = j;
                }
                continue;
            }
            if (j == activityCol)
            {
                cardInfo.activity = value;
            }
            if (j == weekCol)
            {
                cardInfo.weeks = value;
            }
            if (j == assignmentCol)
            {
                cardInfo.assignment = value;
            }
            if (j == quantityCol)
            {
                cardInfo.quantity = value;
            }
            if (j == notesCol)
            {
                cardInfo.notes = value;
            }
            
        }
        console.log(cardInfo);
        console.log('\n');

    }

}