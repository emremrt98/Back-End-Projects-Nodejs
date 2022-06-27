const axios = require('axios');

const searching = async (req, res) => {

    let searchingKeyword = req.body.search;

    let combining = /[\u0300-\u036F]/g;
    searchingKeyword =  searchingKeyword.normalize('NFKD').replace(combining, ''); 

    let sayfalama = "";
    let aktifPage = 1;

    if(req.query.page){
        sayfalama = "page="+req.query.page;
        aktifPage = req.query.page;
    }

    try {
        const blogAPI = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?search='+searchingKeyword);
        res.render('./article/index', { makaleler: blogAPI.data, sayfalama:blogAPI.headers, aktifPage : aktifPage });

    } catch (err) {
        
        res.json({
            mesaj: "Hata çıktı" + err.response.data
        })
    }

}


const getAllArticle = async (req, res) => {

    let sayfalama = "";
    let aktifPage = 1;

    if(req.query.page){
        sayfalama = "page="+req.query.page;
        aktifPage = req.query.page;
    }
    try {
        const blogAPI = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?per_page=20&'+sayfalama);
        res.render('./article/index', { makaleler: blogAPI.data, sayfalama:blogAPI.headers, aktifPage : aktifPage });

    } catch (err) {
        
        res.json({
            mesaj: "Hata çıktı" + err.response.data
        })
    }

}

const getOneArticle = async (req, res) => {
    let articleID = req.params.id;
    try {
        const oneArticle = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/' + articleID);
        res.render('./article/article', { makale: oneArticle.data })
    } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
        res.json({
            mesaj: "Hata çıktı" + err.response.data
        })
    }

}

module.exports = {
    getAllArticle,
    getOneArticle,
    searching
}