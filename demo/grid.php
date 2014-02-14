<?php
class mapmaker
{
    public $gridheight;
	public $gridlength;
	public $gridid;
		
	 
    public function __construct($gridid){	
	$this->gridid = $gridid;//set id for new grid
    }
	
	 public function gengrid($gridheight, $gridlength)//creates map table to pass in spefections
	 {
	$this->gridheight = $gridheight;
	$this->gridlength = $gridlength;
	
	echo "<table id='".$this->gridid."' cellspacing='0' cellpadding='0'><tbody>";
    	for($y=0;$y<=$this->gridheight;$y++)
		{ 
			  
			echo "<tr>"; 
				for($x=0;$x<=$this->gridlength;$x++){ 
					   echo "<td id='board_".$x."_".$y."' x='".$x."' y='".$y."' class='tile'></td>"; 
				} 
			echo "</tr>"; 
		} 
		
		echo "</tbody></table>";
	 }//end gen grid
	 
	 
	
}//end class
?>