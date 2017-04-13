class Vec
{
	 constructor(x=0,y=0)
	 {
		this.x=x;
		this.y=y;

	 }
	 get len()
	 {
	 	return Math.sqrt(this.x*this.x+this.y*this.y);
	 }
	 set len(value)
	 {
	 	const fact=value/this.len;
	 	this.x*=fact;
	 	this.y*=fact;
	 }

}
class Item
{
  constructor(prev, left, right, c)
  {
    this.pos=new Vec;
    this.content=c;
    this.prev=prev;
    this.left=left;
    this.right=right;
  }
  hasNext(){
    return this.left!==null||this.right!==null;
  }
  hasLeft()
  {
    return this.left!==null;
  }
  hasRight()
  {
    return this.right!==null;
  }
	compare(value)
	{
		//console.log(this.content+"-"+value+"="+(this.content-value));
		return this.content-value;
	}
}
