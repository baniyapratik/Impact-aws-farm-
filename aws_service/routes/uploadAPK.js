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
    */

    /*
    var params = {
        name: req.body.name,
        type: "APPIUM_PYTHON_TEST_PACKAGE",
        projectArn: arn
    };

    devicefarm.createUpload(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response

    });
    */


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

module.exports = function scheduleRun(req, res) {

    /*
    var params = {
        name: "MyRun",
        devicePoolArn: "arn:aws:devicefarm:us-west-2:123456789101:pool:EXAMPLE-GUID-123-456", // You can get the Amazon Resource Name (ARN) of the device pool by using the list-pools CLI command.
        projectArn: "arn:aws:devicefarm:us-west-2:123456789101:project:EXAMPLE-GUID-123-456", // You can get the Amazon Resource Name (ARN) of the project by using the list-projects CLI command.
        test: {
            type: "APPIUM_JAVA_JUNIT",
            testPackageArn: "arn:aws:devicefarm:us-west-2:123456789101:test:EXAMPLE-GUID-123-456"
        }
    };
    devicefarm.scheduleRun(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    }*/
}
