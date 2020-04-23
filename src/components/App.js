import React,{Component} from 'react'
import Cel from './Cel'
import BFS_algo from '../algorithms/BFS'
import A_search_algo from '../algorithms/A_search'

class App extends Component{
	constructor(props){
		super(props)
		this.BFS_a = this.BFS_a.bind(this)
		this.animation_work = this.animation_work.bind(this)
		this.animation_path = this.animation_path.bind(this)
		this.set_wall  = this.set_wall.bind(this)
		this.mouse_down = this.mouse_down.bind(this)
		this.mouse_up = this.mouse_up.bind(this)
		this.A_search_a = this.A_search_a.bind(this)
		this.key_down = this.key_down.bind(this)
		this.key_up = this.key_up.bind(this)
		this.state = {
			points:[],
			rows: 30,
			cols: 60,
			st_node: [15,5],
			ed_node: [15,45],
			mouse_down: false,
			wall_mode : 1
		}
	}
	animation_path(prev){
		let temp_data = this.state.points
		let rev_prev = prev.reverse()
		setTimeout(()=>{this.setState({points: temp_data})},50*rev_prev.length)
		for(let i=0;i<rev_prev.length;i++){
			let ob = rev_prev[i]
			setTimeout(()=>{
				let element = document.getElementById(`node_${ob[0]}_${ob[1]}`)
				element.className = element.className.replace('visited','path')
				temp_data[ob[0]][ob[1]][2] = temp_data[ob[0]][ob[1]][2].replace('visited','path')
			},50*i)
		}
	}
	animation_work(prev,order,path_status){
		let temp_data = this.state.points
		setTimeout(()=>{this.setState({points: temp_data},()=>{path_status ? this.animation_path(prev):void(0)})},20*(order.length-1)+100)
		for(let i=0;i<order.length;i++){
			let ob = order[i]
			setTimeout(()=>{
				let element = document.getElementById(`node_${ob[0]}_${ob[1]}`)
				element.className = element.className.replace('unvisited','visited')
				temp_data[ob[0]][ob[1]][2] = temp_data[ob[0]][ob[1]][2].replace('unvisited','visited')
			},20*i)
		}
	}
	BFS_a(event){
		event.preventDefault()
		let answer = BFS_algo(this.state.st_node,this.state.ed_node,this.state.points,this.state.rows,this.state.cols)
		this.animation_work(answer.prev, answer.order, answer.path_status)
	}
	A_search_a(event){
		event.preventDefault()
		let answer = A_search_algo(this.state.st_node,this.state.ed_node,this.state.points,this.state.rows,this.state.cols)
		this.animation_work(answer.prev, answer.order, answer.path_status)
	}
	mouse_down(event){
		event.preventDefault()
		this.setState({mouse_down:true})
	}
	mouse_up(event){
		event.preventDefault()
		this.setState({mouse_down:false})
		let data = this.state.points
		for(let i=0;i<this.state.rows;i++){
			for(let j=0;j<this.state.cols;j++){
				data[i][j][2] = document.getElementById(`node_${i}_${j}`).className
			}
		}
		this.setState({points:data})
	}
	key_down(event){
		if(event.key == 'Control' && this.state.wall_mode == 1){
			this.setState({wall_mode: 0},()=>console.log(this.state.wall_mode))
		}
	}
	key_up(event){
		if(event.key == 'Control' && this.state.wall_mode == 0){
			this.setState({wall_mode: 1},()=>console.log(this.state.wall_mode))
		}
	}
	set_wall(event){
		event.preventDefault()
		if(this.state.mouse_down){
			if(this.state.wall_mode){
				event.target.className = event.target.className.replace(/(unvisited|visited|path)/,'wall')
			}
			else{
				event.target.className = event.target.className.replace('wall','unvisited')
			}
		}
	}
	componentDidMount(){
		let data = []
		for(let i=0;i<this.state.rows;i++){
			let temp_data = []
			for(let j=0;j<this.state.cols;j++){
				let status = `unvisited${this.state.st_node[0]==i && this.state.st_node[1]==j ? ' st_node':''}${this.state.ed_node[0]==i && this.state.ed_node[1]==j ? ' ed_node':''}`
				temp_data.push([i,j,status,false,[[i-1,j],[i,j+1],[i+1,j],[i,j-1]]])
			}
			data.push(temp_data)
		}
		document.addEventListener('keydown',this.key_down)
		document.addEventListener('keyup',this.key_up)
		this.setState({points:data})
	}
	render(){
		return(
			<div className='container'>
				<div className='navbar'>
					<button type='button' onClick={this.BFS_a}>BFS ALGO</button>
					<button type='button' onClick={this.A_search_a}>A* ALGO</button>
				</div>
				<div onMouseDown={this.mouse_down} onMouseUp={this.mouse_up} className='grid'>
				{
				this.state.points.map((ob,id)=>{
					return(
						<div key={id} className='row'>
							{ob.map((obj,idx)=><Cel set_wall={this.set_wall} num={{row:id,col:idx}} data={obj} key={idx}/>)}
						</div>
					);
				})
				}
				</div>	
			</div>
		);
	}
}

export default App;