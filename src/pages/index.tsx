import * as React from "react"
import "../static/css/index.css"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { format } from 'react-string-format'
import TransitionLink from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"


interface State {
  headerList: string[],
  header: string,
  urlList: string[],
  curid: number,
  imgUrl: string
}
function randomInRange(min:number, max:number):number {
  return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
}
class Header extends React.Component<any, State> {
  readonly state: Readonly<State> = {
    header: 'git',
    headerList: ['git', 'blog', 'netdata', 'docker', 'code'],
    urlList: ['https://git.bubbleioa.top','https://blog.bubbleioa.top','https://netdata.bubbleioa.top','https://docker.bubbleioa.top','https://code.bubbleioa.top' ],
    curid: 0,
    imgUrl: ''
  }
  componentDidMount(): void {
    setTimeout(()=>this.deleteHeader(0),2000)
    this.setState({
      imgUrl: format('https://service-avb1tv8k-1303953543.hk.apigw.tencentcs.com/release/image?scale={0}&id=1',randomInRange(9e-9,1.5e-7))
    })
  }
  deleteHeader(listID:number):void {
    const timer = setInterval((): void => {
      this.setState({
        header: this.state.header.substring(0, this.state.header.length - 1)
      })
      if(this.state.header===''){
        clearInterval(timer)
        setTimeout(()=>this.loopHeader(listID+1),1000)
      }
    }, 300)
  }
  loopHeader(listID:number):void {
    if(listID<this.state.headerList.length) {
      this.setState({
        curid: listID
      })
      let cid = 0
      const timer = setInterval(():void => {
        this.setState({
          header: this.state.header + this.state.headerList[listID][cid]
        })
        cid++
        if (cid===this.state.headerList[listID].length) {
          clearInterval(timer)
          setTimeout(()=>this.deleteHeader(listID),3000)
        }
      }, 200)
    }else{
      this.loopHeader(0)
    }
  }
  render(): React.ReactNode {
    return (
      <div>
      <img src={this.state.imgUrl} className="blended-picture"></img>
      <h1> <a href={this.state.urlList[this.state.curid]} className="text-colored">{this.state.header}//</a> </h1>
      </div>
    )
  }
}

const IndexPage = ()=> {
  const queryParams = new URLSearchParams(typeof window !== "undefined" && window.location.search)
  const lang = queryParams.get("lang")
  let detail: JSX.Element;
  if (lang === 'zh-CN') {
    detail = (
      <div className="info">
        ??????????????????????????????????????????????????????????????????<br/>
        ?????????????????? {"<->"} ????????????ioa ???????? ?????????
        <br/> ???????????? ~&gt; ???????????? || ???????????? ~&gt; ????????? || ???????????? ~&gt; ??????????????? <br/>
        ???? ??????:  <a href="https://github.com/Bubbleioa.gpg">CA43 1898 305C BDC1 78EF  6C3C 1DA0 2D52 E707 8602</a>
        <br/>??????????????????????????????? arch ???????????????? 
        <br/> <Link to="/">English Version</Link>
      </div>
    )
  } else {
    detail = (
      <div className="info"> 
      Every time you visit this site, the images above are unique.<br/>
      Why bubble {"<->"} why ioa ???????? GOD(s) know it<br/>
      ???????????? ~&gt; Steam || ???????????? ~&gt; Bangumi || ???????????? ~&gt; Apex Legends <br/>
       ???? Public Key:<a href="https://github.com/Bubbleioa.gpg">CA43 1898 305C BDC1 78EF  6C3C 1DA0 2D52 E707 8602</a> <br/>
        Life is ????, but arch is still ????! <br/>
        <Link to="/?lang=zh-CN">?????????</Link>
      </div>
      
    )
  }
  return(
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:title" content="ioa's mirai?" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://bubbleioa.top/" />
        <meta property="og:image" content="https://p.sda1.dev/6/0301b2a7c1e18516ab1f6230025e0e52/image.png" />
        <title>ioa's mirai?</title>
      </Helmet>
      <div className="header">
        <Header ></Header>
        {detail}
        <AniLink swipe duration={1} direction="up" to="awesome-guys">Awesome guys??????</AniLink>
      </div>
    </main>
  )
}

export default IndexPage
