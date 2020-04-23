import React,{Component} from 'react'

class Cel extends Component{
	constructor(props){
		super(props)
	}
	render(){
		const {data} = this.props
		const {num} = this.props
		return(
			<div onMouseOver={this.props.set_wall} className={`node ${data[2]}`} id={`node_${num.row}_${num.col}`} name={`${num.row}_${num.col}`}>
				{data[2].search('st_node')!=-1 ? <i className="far fa-dot-circle node_sign"></i>:''}
				{data[2].search('ed_node')!=-1 ? <i className="fas fa-crosshairs node_sign"></i>:''}
			</div>
		);
	}
}
export default Cel;