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
    header: 'Mirai',
    headerList: ['Mirai', 'blog'],
    urlList: ['http://mirai.bubbleioa.top','http://blog.bubbleioa.top' ],
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
      <div className="info"> 为什么是冒泡 {"<->"} 为什么是ioa 😕😕 天知道<br/> 🎉🐟🎉 ~&gt; 蒸汽平台 || 📚👧📚 ~&gt; 班固米 || 🐴🔫🐴 ~&gt; 坐牢模拟器 <br/> 🔑 公钥: 无 (只有当有人需要它，这里才会有) <br/> <Link to="/">English Version</Link></div>
    )
  } else {
    detail = (
      <div className="info"> Why bubble {"<->"} why ioa 😕😕 GOD(s) know it<br/> 🎉🐟🎉 ~&gt; Steam || 📚👧📚 ~&gt; Bangumi || 🐴🔫🐴 ~&gt; Apex Legends <br/> 🔑 Public Key: None (Once someone needs it, here will be a key.) <br/> <Link to="/?lang=zh-CN">中文版</Link></div>
    )
  }
  return(
    <main>
      <Helmet>
        <meta charSet="utf-8" />
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
