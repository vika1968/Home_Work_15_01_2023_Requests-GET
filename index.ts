console.log("Home work 07-01-2023");
import express from "express";
const app = express();
const port = 8000;

import bodyParser from "body-parser";
const jsonParser = bodyParser.json()
app.use(express.static("public"));

interface Cat {
    id: number,
    image: string
}

const cats: Cat[] = [
    {
        id: 1,
        image: "./images/1.jpg"
    },
    {
        id: 2,
        image: "./images/2.jpg"    
    },
    {
        id: 3,
        image: "./images/3.jpg"   
        },
    {
        id: 4,
        image: "./images/4.jpg"   
    },
    {
        id: 5,
        image: "./images/5.jpg"   
    },
    {
        id: 6,
        image: "./images/6.jpg"   
    },
    {
        id: 7,
        image: "./images/7.webp"   
    },
    {
        id: 8,
        image: "./images/8.jpg"   
    },
    {
        id: 9,
        image: "./images/9.jpg"   
    },
    {
        id: 10,
        image: "./images/10.jpg"   
    },
    {
        id: 11,
        image: "./images/1.jpg"   
    },
    {
        id: 12,
        image: "./images/2.jpg"   
    },
    {
        id: 13,
        image: "./images/3.jpg"   
    },
    {
        id: 14,
        image: "./images/4.jpg"   
    },
    {
        id: 15,
        image: "./images/5.jpg"   
    },
    {
        id: 16,
        image: "./images/6.jpg"   
    },
    {
        id: 17,
        image: "./images/7.webp"   
    },
    {
        id: 18,
        image: "./images/8.jpg"   
    },
    {
        id: 19,
        image: "./images/9.jpg"   
    },
    {
        id: 20,
        image: "./images/10.jpg"   
    }
]

//---------Find cat by ID---------
app.get("/api/cats/list/:id", (req, res) => {
    try {
      const arrayLen = cats.length;
      const { id } = req.params;
      console.log(id);
  
      const cat = cats.find(element => element.id === Number(id));
  
      res.send({ success: true, cat , arrayLen});
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  })


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

