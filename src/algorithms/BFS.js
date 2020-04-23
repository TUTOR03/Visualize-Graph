function BFS_algo(start,end,data,rows,cols){
	let q_st = 0
	let in_progress = true
	let query = [start]
	let prev = []
	let order = []
	for(let i=0;i<rows;i++){
		let temp=[]
		for(let j=0;j<cols;j++){
			temp.push(undefined)
		}
		prev.push(temp)
	}
	while(q_st < query.length && in_progress){
		let now = query[q_st]
		order.push([now[0],now[1]])
		q_st+=1
		let pos = data[now[0]][now[1]]
		data[now[0]][now[1]][3] = true
		if(now[0] == end[0] && now[1] == end[1]){
			in_progress = false
			break
		}
		else{
			for(let i=0;i<4;i++){
				if(pos[4][i][0]>-1 && pos[4][i][0]<rows && pos[4][i][1]>-1 && pos[4][i][1]<cols){
					if(data[pos[4][i][0]][pos[4][i][1]][3] != true && data[pos[4][i][0]][pos[4][i][1]][2].search('wall')==-1){
						prev[pos[4][i][0]][pos[4][i][1]] = [now[0],now[1]]
						data[pos[4][i][0]][pos[4][i][1]][3] = true
						query.push([pos[4][i][0],pos[4][i][1]])
					}
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

export default BFS_algo;