/**
 Upload and download tests
 */
const mongoose = require('mongoose');
const { Schema} = mongoose;

const testSchema = new Schema({
    title: String,
    testURL: String,  
    uploaded: { type: Date, default: Date.now },
    ownerId: String,
    testArn: String,
    status: {
        type: String,
        enum: ["INITIALIZED", "PROCESSING", "SUCCEEDED", "FAILED"]
    },
    testSuiteId: { type: Schema.Types.ObjectId, ref: 'TestSuite' },
    type: {
        type: String,
        enum: ["ANDROID_APP","IOS_APP", "WEB_APP", "EXTERNAL_DATA", "APPIUM_JAVA_JUNIT_TEST_PACKAGE", "APPIUM_JAVA_TESTNG_TEST_PACKAGE",
        "APPIUM_PYTHON_TEST_PACKAGE", "APPIUM_NODE_TEST_PACKAGE","APPIUM_RUBY_TEST_PACKAGE", "APPIUM_WEB_JAVA_JUNIT_TEST_PACKAGE",
        "APPIUM_WEB_JAVA_TESTNG_TEST_PACKAGE", "APPIUM_WEB_PYTHON_TEST_PACKAGE", "APPIUM_WEB_NODE_TEST_PACKAGE", "APPIUM_WEB_RUBY_TEST_PACKAGE",
        "CALABASH_TEST_PACKAGE", "INSTRUMENTATION_TEST_PACKAGE", "UIAUTOMATION_TEST_PACKAGE", "UIAUTOMATOR_TEST_PACKAGE", "XCTEST_TEST_PACKAGE",
        "XCTEST_UI_TEST_PACKAGE", "APPIUM_JAVA_JUNIT_TEST_SPEC", "APPIUM_JAVA_TESTNG_TEST_SPEC", "APPIUM_PYTHON_TEST_SPEC", "APPIUM_NODE_TEST_SPEC",
        "APPIUM_RUBY_TEST_SPEC", "APPIUM_WEB_JAVA_JUNIT_TEST_SPEC", "APPIUM_WEB_JAVA_TESTNG_TEST_SPEC", "APPIUM_WEB_PYTHON_TEST_SPEC",
        "APPIUM_WEB_NODE_TEST_SPEC", "APPIUM_WEB_RUBY_TEST_SPEC", "INSTRUMENTATION_TEST_SPEC", "XCTEST_UI_TEST_SPEC"]
    } 
});




mongoose.model('Test', testSchema);