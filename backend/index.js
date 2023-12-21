import express from "express";
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv'
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors(
    {
        origin: 'https://brekkin.com',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
))
dotenv.config()


const BASE_URL = 'http://api.mediastack.com/v1/';
const TOP_HEADLINE = 'news';
const API_KEY = process.env.NEWS_API_KEY  

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

app.get('/', async(req,res) => {
    const query_string = Object.entries(req.query).reduce((str,[key, value]) => (
        str + `&${key}=${value}`
    ) ,'')
   
    const response = await axios.get(`${BASE_URL}${TOP_HEADLINE}?access_key=${API_KEY}${query_string}`,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    res.status(200).json(response.data)
})

app.post("/get-news", async (req,res,next) => {
        let endpoint = req.body.endpoint;
        let response = await axios.get(endpoint);
        
        response.data.articles = response.data.articles.filter((article) => {
               return article.source.name !== "YouTube"
        })  

        await asyncForEach(response.data.articles, async (article) => {
        
            
            
            let idx = article.title.indexOf(" - ");
            let newTitle = article.title.slice(0,idx);
            article.title = newTitle;
           
            
            /* let contentBody =  await axios.get(article.url);
            let dom = new JSDOM(contentBody.data, {
                url:article.url
            })

            let content = new Readability(dom.window.document).parse();
            article.content = content.content; */
            
            
            
            });

        res.send(response.data);
})
app.use(async function (err,req,res,next) {
    res.status(err.status || 500)
    res.end();
})
app.listen(port, () => console.log("Server listening on Port",port));