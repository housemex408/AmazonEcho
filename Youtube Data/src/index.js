'use strict';
var Alexa = require("alexa-sdk");
var appId = ''; //'amzn1.echo-sdk-ams.app.your-skill-id';

// https://developer.amazon.com/blogs/post/Tx24Z2QZP5RRTG1/new-alexa-technical-tutorial-debugging-aws-lambda-code-locally

exports.handler = (event, context) => {
    try {

        if(event.session.new)
        {
            console.log("NEW SESSION")
        }

        switch (event.request.type) {

            case "LaunchRequest":
                console.log("LAUNCH REQUEST")
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Welcome to an Alexa skill, this is running on a deployed lambda function", true),
                        {}
                    )
                )
                break;

            case "IntentRequest":
                console.log("INTENT REQUEST")
                break;

            case "SessionEndedRequest":
                console.log("SESSION ENDED REQUEST")
                break;

            default:
                context.fail(`INVALID REQUEST TYPE: $(event.request.type)`)
        }

    } catch (error) {
        context.fail(`EXCEPTION: $(error)`)
    }
}

const buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

const generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}
