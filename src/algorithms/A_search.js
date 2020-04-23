function A_search_algo(start,end,data,rows,cols){
	let open = []
	let close = []
	let prev = []
	let order = []
	let in_progress = true
	for(let i=0;i<rows;i++){
		let temp=[]
		for(let j=0;j<cols;j++){
			temp.push(undefined)
		}
		prev.push(temp)
	}
	open.push([start[0],start[1],0,0,0])
	while(open.length > 0 && in_progress){
		open.sort((a,b)=>{
			return(a[4]>b[4]? a[4]-b[4]:(a[3]-b[3]))
		})
		// open.sort((a,b)=>{
		// 	return(a[4]-b[4])
		// })
		let node_now = open[0]
		open.shift()
		close.push(node_now)
		order.push([node_now[0],node_now[1]])
		if(node_now[0] == end[0] && node_now[1] == end[1]){
			in_progress = false
			break
		}
		let pos = data[node_now[0]][node_now[1]][4]
		for(let i = 0;i<4;i++){
			if(pos[i][0]>-1 && pos[i][0]<rows && pos[i][1]>-1 && pos[i][1]<cols){
				if(close.find((ob)=>ob[0]==pos[i][0] && ob[1]==pos[i][1]) == undefined && data[pos[i][0]][pos[i][1]][2].search('wall')==-1){
					let new_g = node_now[2]+1
					let new_h = Math.abs(pos[i][0]-end[0]) + Math.abs(pos[i][1]-end[1])
					// let new_h = Math.sqrt(Math.pow(Math.abs(pos[i][0]-end[0]),2)+Math.pow(Math.abs(pos[i][1]-end[1]),2))
					let new_f = new_h + new_g
					let node_index = open.indexOf(
						open.find((ob)=>ob[0]==pos[i][0] && ob[1]==pos[i][1])
					)
					if(node_index != -1){
						if(new_f < open[node_index][4] && new_g < open[node_index][2]){
							let open_node = open[node_index]
							open_node[2] = new_g
							open_node[3] = new_h
							open_node[4] = new_f
							open[node_index] = open_node
						} 
					}
					else{
						open.push([pos[i][0],pos[i][1],new_g,new_h,new_f])
					}
					prev[pos[i][0]][pos[i][1]] = [node_now[0],node_now[1]]
				}
			}
		}
	}
	if(!in_progress){
		let new_prev = [end]
		let path_now = prev[end[0]][end[1]]
		while(path_now != undefined){
			new_prev.push(path_now)
			path_now = prev[path_now[0]][path_now[1]]
		} 
		return {
			prev: new_prev,
			order: order,
			path_status: true
		}
	}
	else{
		return {
			prev: [],
			order: order,
			path_status: false
		}
	}
}

export default A_search_algo;