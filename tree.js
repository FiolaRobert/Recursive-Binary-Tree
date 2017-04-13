

const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');
var d=0;
const max=11;
const high=100;
var space=canvas.height/(max+1);
var first=null;
var fontSize=10;

var c=first;
var prev=null;
var count=0;
this.generate(50, 100);
this.sketch();
console.log("generate(#ofitems)=create new tree\n"+
"add(value)=add item\n"+
"cut(value)=remove item\n"+
"find(value)=find item");

/* fill with random values
fill(c, d, 0);
function fill(current, depth, angle){//recursive
  console.log(count+":"+current.content);
  if(depth<randomValue())
  {

  //set position
    if(depth!==0)
    {
      if(angle<0)
      {
        current.pos.x=current.prev.pos.x-(canvas.width/(Math.pow(2,depth+1)));
        current.pos.y=(depth+1)*this.space;
      }
      else if(angle>0)
      {
        current.pos.x=current.prev.pos.x+(canvas.width/(Math.pow(2,depth+1)));
        current.pos.y=(depth+1)*this.space;
      }
    }
    else
    {
      current.pos.x=canvas.width/2;
      current.pos.y=this.space;
    }

//set left&right
    let left=new Item(current, null, null, randomValue());
    let right=new Item(current, null, null, randomValue());
    current.left=left;
    current.right=right;
  //increment twice
    this.count++;
    this.count++;
    //console.log(count);
    //console.log(current.content);
    //call recursive
    if(current.prev!=null){
      drawline(current);

    }
    fill(left, depth+1, -1);
    fill(right, depth+1, 1);
  }

}*/
//insert 10 items

function generate(total, max=high){
  this.clear();
  this.high=max
  if(total!=0)
    {first=new Item(null, null, null, randomValue());}
    else first=null;
  for(var i=0;i<total;i++)
  {tree(randomValue() );count++}
  sketch();
}

function add(value){
  if(first==null)
  {first=new Item(null, null, null, value);}
  else {
    tree(value);
  }
  sketch();
}

function tree(value, current=first){//recursive
  //console.log(count+":"+value);
  if(current!==null)
  {
    if(current.compare(value)>0)
    {
      if(current.hasLeft())
      {
        tree(value, current.left);
      }
      else {
        current.left=new Item(current, null, null, value);
        return current.left;
      }
    }
    else if(current.compare(value)<0)
    {
      if(current.hasRight())
      {
        tree(value,current.right);
      }
      else {
        current.right=new Item(current, null, null, value);
        return current.right;
      }
    }//don't add duplicates
  }
}

function cut(value){

  console.log(remove(value));
  sketch();
}

function remove(value){
  let item=search(value);
  if(item!==null )
  {
    let previous=item.prev;
    let left=item.left;
    let right=item.right;
    if(previous==null)//first item
    {

      if(item.hasLeft())//has left, right?
      {
        this.first=left;
        this.first.prev=null;
        if(item.hasRight())
        {
          //get deepest item
          let lowest=right;
          while(lowest.hasLeft())
          {
            lowest=lowest.left;
          }

          lowest.left=left.right;
          lowest.left.prev=lowest;


        }
        //set right
        this.first.right=right;
        right.prev=this.first;
      }
      else if(item.hasRight())//no left, has right
      {
        this.first=right;
        right.prev=null;
        //no left

      }
      else {//no left, no right
        first=null;//empty list
      }
    }else{//not first

      if(item.content<previous.content)//left side
      {
        if(item.hasRight())//has right, left?
        {
          if(item.hasLeft())
          {
              //get deepest item
            let lowest=item.right;
            while(lowest.hasLeft())
            {
              lowest=lowest.left;
            }



            lowest.left=item.left;
            item.left.prev=lowest;
          }
          previous.left=right;
          right.prev=previous;
        }
        else if(item.hasLeft())//has left, no right
        {
          previous.left=left;
          left.prev=previous;
        }
        else{//no right, no left
          previous.left=null;
        }
      }
      else if(item.content>previous.content)//right side
      {
        if(item.hasLeft())//has left, right?
        {
          if(item.hasRight())//has left, has right
          {
            //get deepest item
            let highest=left;
            while(highest.hasRight())
            {
              highest=highest.right;
            }


            highest.right=right;
            right.prev=highest;
          }
          previous.right=left;
          left.prev=previous;
        }
        else if(item.hasRight())//no left, has right
        {
          previous.left=right;
          right.prev=previous
        }
        else {//no left, no right
          previous.right=null;
        }
      }
    }
  }

  return item;

}

function find(value){

  var item=search(value);
  //console.log(item);
  context.strokeStyle="#FF0000";
  while(item.prev!=null){
      this.line(item.prev.pos.x, item.prev.pos.y+fontSize/2, item.pos.x, item.pos.y);
      console.log(item);
      item=item.prev;

  }
  context.strokeStyle="#000";
}

function search(value, current=first){//recursive
  //console.log(count+":"+value);


  if(current!==null)
  {
    if(value==current.content)//found it!
      return current;

    if(value<current.content)//<
    {
      if(current.hasLeft())//has left
      {
        return search(value, current.left);//search left
      }
    }
    else if(value>current.content)//>
    {
      if(current.hasRight())//has right
      {
        return search(value,current.right);//search right
      }
    }
  }
  return null;//not found
}

function clear(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function sketch(current=first){
  this.clear();
  this.draw(current);
}

function draw(current=first, depth=0, angle=0){//recursive

  if(current!=null)
  {

    if(depth==0)//only on first item, show previous items
    {
      let split=depth-1;
      prev=current.prev;
      while(prev!=null)
      {
        prev.pos.x=(canvas.width/2);
        prev.pos.y=(-split)*(this.space/2);
        drawline(prev);
        prev=prev.prev;
        split++;
      }
    }

  //set position
    if(depth!==0)
    {
      if(angle<0)
      {
        current.pos.x=current.prev.pos.x-(canvas.width/(Math.pow(2,depth+1)));
        current.pos.y=(depth+1)*this.space;
      }
      else if(angle>0)
      {
        current.pos.x=current.prev.pos.x+(canvas.width/(Math.pow(2,depth+1)));
        current.pos.y=(depth+1)*this.space;
      }
    }
    else
    {
      current.pos.x=canvas.width/2;
      current.pos.y=this.space;
    }

    //set left&right
    let left=current.left;
    let right=current.right;
    //call recursive
      drawline(current);
    draw(left, depth+1, -1);
    draw(right, depth+1, 1);
  }

}

function drawline(item){
  if(item.prev!==null)
  {
    this.line(item.prev.pos.x, item.prev.pos.y+fontSize/2, item.pos.x, item.pos.y);

  }
  context.fillStyle="#fff";
  context.fillRect(item.pos.x-fontSize/2, item.pos.y-fontSize/2,
								fontSize, fontSize);
  context.fillStyle="#000";
  context.font = fontSize+'px serif';
  context.fillText(item.content, item.pos.x-fontSize/2, item.pos.y+fontSize/2);
}

function line(x1, y1, x2, y2){
  context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();

}

function randomValue(){
  return parseInt(Math.random()*this.high);
}
