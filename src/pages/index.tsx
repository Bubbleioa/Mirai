import * as React from "react"
import "../css/index.css"

interface Props {

}

interface State {
  headerList: string[],
  header: string
}

class IndexPage extends React.Component<Props, State> {
  readonly state: Readonly<State> = {
    header: 'Mirai',
    headerList: ['Mirai', 'ioa']
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
      <main className="header">
        <h1> {this.state.header} </h1>
      </main>
    )
  }
}

export default IndexPage
