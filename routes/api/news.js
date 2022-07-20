const router = require('express').Router();
const newsArr = require('../../db/db.json');
const axios = require('axios').default;

router.get('/', (req, res) => {;
    let results = newsArr
    res.json(results)
})



router.get('/news/:newspaperId', async (req, res) => {
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newsArr.filter(newsArr => newsArr.name == newspaperId)[0].address
    const newspaperBase = newsArr.filter(newsArr => newsArr.name == newspaperId)[0].base

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
        }).catch(err => console.log(err))

})

module.exports = router;
