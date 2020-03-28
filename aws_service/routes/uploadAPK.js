//const IncomingForm = require("formidable").IncomingForm;
//const devicefarm = new AWS.DeviceFarm();

module.exports = function upload(req, res) {

    /*
    devicefarm.createDevicePool(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });

    var params = {
        arn: 'STRING_VALUE' 
    };
    devicefarm.getUpload(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });

    var params = {
        name: req.body.name,
        type: "APPIUM_PYTHON_TEST_PACKAGE",
        projectArn: arn
    };

    devicefarm.createUpload(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response

    });*/

    /*
    var form = new IncomingForm();
    form.on("file", (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
    });
    form.on("end", () => {
        res.json();
    });
    form.parse(req);*/
}
