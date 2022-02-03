import * as React from "react"
import "../css/index.css"

interface Props {

}

interface State {
  headerList: string[],
  header: string,
  urlList: string[],
  curid: number
}

class Header extends React.Component<Props, State> {
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
          setTimeout(()=>this.deleteHeader(listID),2000)
        }
      }, 300)
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
  
  return(
    <main>
      <div className="header">
        <Header ></Header>
        <div className="info"> ioa !== iob </div>
      </div>
    </main>
  )
}

export default IndexPage
