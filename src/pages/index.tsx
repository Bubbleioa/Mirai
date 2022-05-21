import * as React from "react"
import "../css/index.css"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"


interface State {
  headerList: string[],
  header: string,
  urlList: string[],
  curid: number
}

class Header extends React.Component<any, State> {
  readonly state: Readonly<State> = {
    header: 'git',
    headerList: ['git', 'blog', 'netdata', 'docker', 'code'],
    urlList: ['https://git.bubbleioa.top','https://blog.bubbleioa.top','https://netdata.bubbleioa.top','https://docker.bubbleioa.top','https://code.bubbleioa.top' ],
    curid: 0
  }
  componentDidMount(): void {
    setTimeout(()=>this.deleteHeader(0),2000)
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
      <h1> <a href={this.state.urlList[this.state.curid]} className="text-colored">{this.state.header}.bubbleioa.top</a> </h1>
    )
  }
}

const IndexPage = ()=> {
  const queryParams = new URLSearchParams(typeof window !== "undefined" && window.location.search)
  const lang = queryParams.get("lang")
  let detail: JSX.Element = null
  if (lang === 'zh-CN') {
    detail = (
      <div className="info">
        为什么是冒泡 {"<->"} 为什么是ioa 😕😕 天知道
        <br/> 🎉🐟🎉 ~&gt; 蒸汽平台 || 📚👧📚 ~&gt; 班固米 || 🐴🔫🐴 ~&gt; 坐牢模拟器 <br/>
        🔑 公钥:  <Link to="https://github.com/Bubbleioa.gpg">CA43 1898 305C BDC1 78EF  6C3C 1DA0 2D52 E707 8602</Link>
        <br/>生活就是一团💩，但是 arch 任然很👍！ 
        <br/> <Link to="/">English Version</Link>
      </div>
    )
  } else {
    detail = (
      <div className="info"> 
      Why bubble {"<->"} why ioa 😕😕 GOD(s) know it<br/>
      🎉🐟🎉 ~&gt; Steam || 📚👧📚 ~&gt; Bangumi || 🐴🔫🐴 ~&gt; Apex Legends <br/>
       🔑 Public Key:<Link to="https://github.com/Bubbleioa.gpg">CA43 1898 305C BDC1 78EF  6C3C 1DA0 2D52 E707 8602</Link> <br/>
        Life is 💩, but arch is still 👍! <br/>
        <Link to="/?lang=zh-CN">中文版</Link>
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
      </div>
    </main>
  )
}

export default IndexPage
