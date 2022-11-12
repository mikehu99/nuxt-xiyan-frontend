import axios from "axios";

const sitemap = [{
  path: '/sitemap_1.xml', //生成的文件路径
  hostname: 'https://v2fq.com', //网站的网址
  cacheTime: 1000 * 60 * 60 * 24, //一天的更新频率，只在generate:false有用
  gzip: true, //生成.xml.gz的sitemap
  generate: false,
  exclude: ['/404', '/article', '/member/setting', '/ytber/create'], //排除不要的页面，这里的路径是相对于hostname
  defaults: {
    changefreq: 'always',
    lastmod: new Date()
  },
  routes: async () => {
    let youtuberList = await axios.get(
      'https://v2fq.com/api/youtuber/list',
      {params: {pageNo: 1, size: 100, tab: 'oldest', categoryId: 0}})
      .then(res => {
        console.log(res.data)
      let youtuberList = res.data.data.records;
      var siteArray = [];
      let siteObject = {};
        youtuberList.forEach(element => {
        siteObject = {
          url: `/ytber/${element.id}`,
          changefreq: 'daily',
          lastmod: new Date()
        }
        siteArray.push(siteObject);

      });
      return siteArray;
    })
    return youtuberList;

  },

  //   需要生成的xml数据，return 返回需要给出的xml数据
  // routes:()=>{
  //     const routes = [{
  //         url:"/",
  //         changefred:'always',
  //         lastmod:new Date()
  //     }]
  //     return routes
  // }

}]
export default sitemap;
