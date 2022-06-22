const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')


const newspapers = [
    {
        name: 'cnet',
        address: 'https://www.cnet.com/tech/',
        base: 'https://www.cnet.com'
    },
    {
        name: 'cnn',
        address: 'https://www.cnn.com/business/tech',
        base: ''
    },
    {   
        name: 'cnbc',
        address: 'https://www.cnbc.com/technology/',
        base: ''

    },
    {
        name: 'usatoday',
        address: "https://www.usatoday.com/tech/",
        base: ''
    }, 
    {
        name: 'technewstoday',
        address: "https://www.technewstoday.com/",
        base: ''

    }
]

const articles = []

newspapers. forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)


            $('a:contains("tech")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push ({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })

            })

        })
})


app.get('/', (req, res ) => {
    res.json('Welcome to my Tech News Api')
})

app.get('/news', (req, res) => {
    res.json(articles)
})


app.get('/news/:newspaperId', async (req, res) => {
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    console.log(newspaperAddress)

    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("tech")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId

                })
            })
            res.json(specificArticles)
        }) .catch(err => console.log(err))

})


