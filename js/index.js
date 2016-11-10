window.addEventListener("DOMContentLoaded",function(){
  var leftTop=document.querySelector(".left-top");
  var leftList=document.querySelector(".left-list");
  // var he=document.documentElement.clientHeight;
  leftList.style.height=document.documentElement.clientHeight-leftTop.offsetHeight+'px';
//   rightList.style.height=document.documentElement.clientHeight - leftTop.offsetHeight +'px';
})
	var todo=[
    {
    	id:1,
    	title:'列表1',
    	colors:'#FF2A6B',
    	list:[
          {
          	title:'早上',
          	done:false
          },
          {
          	title:'早上',
          	done:true
          },
          {
          	title:'早上',
          	done:false
          },
          {
          	title:'早上',
          	done:true
          }
    	]
    },
     {
    	id:1,
    	title:'列表2',
    	colors:'#CC75E1',
    	list:[
          {
          	title:'早上',
          	done:false
          },
          {
          	title:'早上',
          	done:false
          },
          {
          	title:'早上',
          	done:false
          },
          {
          	title:'早上',
          	done:true
          }
    	]
    },
     {
    	id:1,
    	title:'列表3',
    	colors:'#FF8300',
    	list:[
          {
          	title:'早上',
          	done:false
          },
          {
          	title:'早上',
          	done:true
          },
          {
          	title:'早上',
          	done:true
          },
          {
          	title:'早上',
          	done:true
          }
    	]
    }
];
var colors=["#FF2A6B","#CC75E1","#FF8300","#63DA38","#1BADF7","#F7CA00","#A0825C"];
var icloud=angular.module("icloud",[]);
icloud.controller("iclouds",function($scope){
	$scope.todo=todo;
	$scope.index=$scope.todo.length-1;
	$scope.flag=false;
	$scope.optflag=false;
	$scope.colors=colors;
	$scope.changetitle=$scope.todo[$scope.index].title;
	$scope.changecolor=$scope.todo[$scope.index].colors;
	$scope.check=function(i){
	   $scope.index=i;
	   $scope.changetitle=$scope.todo[i].title;
	   $scope.changecolor=$scope.todo[i].colors;
     $scope.optflag=false;
	}

	$scope.additem=function(){
		$scope.ids=$scope.todo[$scope.todo.length-1].id+1;
		$scope.index=$scope.todo.length;
		$scope.todo.push({
			id:$scope.ids,
			title:'列表'+$scope.index,
			colors:colors[$scope.todo.length%7],
			list:[]
		})
	    $scope.changetitle=$scope.todo[$scope.index].title;
	    $scope.changecolor=$scope.todo[$scope.index].colors;
		localStg.saveData("todo",$scope.todo)
	}
	$scope.donenum=0;
	$scope.getdoneNum=function(){
		$scope.donenum=0;
		var list=$scope.todo[$scope.index].list;
		angular.forEach(list,function(v,i){
			if(v.done){
				$scope.donenum++;
			}
		})
	}
	$scope.getdoneNum()

	$scope.addlist=function(){
		$scope.todo[$scope.index].list.push({
			title:'',
			done:false
		})
		localStg.saveData("todo",$scope.todo)
	}
  
  $scope.clearcom=function(){
    var list=$scope.todo[$scope.index].list;
    var arr=[];
    angular.forEach(list,function(v,i){
      if(v.done==false){
        arr.push(v)
      }
    })
    $scope.todo[$scope.index].list=arr;
    $scope.getdoneNum();
    $scope.flag=false;
  }
	$scope.set=function(o,f){
		o.done=f;
    $scope.getdoneNum();
    localStg.saveData("todo",$scope.todo)
	}
	$scope.change=function(o,text){
		o.title=text.target.innerHTML;
	}
    $scope.sColor=function(c){
    	$scope.changecolor=c;
    }
	$scope.comChange=function(){
		var o=$scope.todo[$scope.index];
		o.title=$scope.changetitle;
		o.colors=$scope.changecolor;
		$scope.optflag=false;
		// localStg.saveData("todo",$scope.todo)
	}
	$scope.delList=function(){
		$scope.todo.splice($scope.index,1)
	}
	$scope.$watch("index",function(){
		$scope.getdoneNum();
		$scope.flag=false;
	})
})

icloud.factory("localStg",function(){
	return {
		getData:function(key){
			var d=localSorage.getItem(key);
			return d==null?[]:JSON.parse(d)
		},
		saveData:function(key,data){
			localSorage.setItem(key,JSON.stringify(data))
		},
		delData:function(key){
			localSorage.removeItem(key);
		}
	}
})


