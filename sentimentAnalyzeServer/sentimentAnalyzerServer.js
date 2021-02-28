const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');

    const NaturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1 ({
        version: '2020-08-01',
        authenticator: new IamAuthenticator ({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return NaturalLanguageUnderstanding;
}

NLUinst = getNLUInstance()

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {}
        }
    };

    NLUinst.analyze(analyzeParams)
        .then(analysisResults => {
            emo = analysisResults.result.emotion.document.emotion;
            console.log(emo);
            //console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(emo);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send("Error Whatever");
        });
    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    };
    
    NLUinst.analyze(analyzeParams)
        .then(analysisResults => {
            sentim = analysisResults.result.sentiment.document.label;
            console.log(sentim);
            console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(sentim);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send("Error Whatever");
        });
    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {}
        }
    };

    NLUinst.analyze(analyzeParams)
        .then(analysisResults => {
            emo = analysisResults.result.emotion.document.emotion;
            console.log(emo);
            //console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(emo);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send("Error Whatever");
        });
    //return res.send({"happyy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    };
    
    NLUinst.analyze(analyzeParams)
        .then(analysisResults => {
            sentim = analysisResults.result.sentiment.document.label;
            console.log(sentim);
            return res.send(sentim);
            //console.log(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
            return res.send("Error Whatever");
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

