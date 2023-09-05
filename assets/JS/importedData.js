var url = "https://sheets.googleapis.com/v4/spreadsheets/1rgaHm4qlXdKpJvU52u6LCGlUBekrUx_bhUoTWmJ8t8E/?key=AIzaSyC8CJzSaxpcbUmHFLGfUkcSqTBhckWhpp0&includeGridData=true";
axios.get(url)
    .then(function (response) {
        // console.log(response);
        getResponse(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    
function getResponse(object)
{
    let activity = {
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
    for (let i = 0;i<master.length;i++)
    {
        for (let j = 0;j<master[0].values[0].length;j++)
        {
            if (j == 0)
            {
                // if (master[i].values[j].formattedValue.toLowerCase() == "activity")
                // {
                //     console.log('abc');
                // }
                console.log('asda');
            }
            // if (object.data.sheets[1].data[0].rowData[i].values[j].formattedValue == null)
            // {
            //     continue;
            // }
            // console.log(object.data.sheets[1].data[0].rowData[i].values[j].formattedValue);
        }
        console.log('\n');

    }

}