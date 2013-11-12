<?php

//echo 'hi';

?>

<html>
<head>

<STYLE type="text/css">

</STYLE>

<link rel="stylesheet" type="text/css" href="main.css" />

<script type="text/javascript" src="jquery.js"></script> 
<script type="text/javascript" src="main.js"></script>
<script type="text/javascript" src="range.js"></script>
 <script type="text/javascript">                                         
   // we will add our javascript code here                                     
 </script>   
 
</head>

<form id="main_form">

<div id="wrapper">

<div id="row1">

<div id="row1_col1">IrriCalculator</div>
<div id="row1_col2" class="act layout_opt">Layout Design</div>
<div id="row1_col3" class="layout_opt">Layout Specs</div>

</div>







<div id="row2">

	<div id="row2_col1">

        <div class="mbox">

		<div class="row_header">Layout</div>
		<div id="row2_col1_a">	


			<label id="spacing_heads_units" for=name style="margin:5px 5px 0 0; width:80px; padding:0px;">Head Space</label>
			<input type="range" min="5" max="100" step="5" style="width:50px; margin-right:10px; " value="20" name="spacing_heads" />

			<label for=name style="margin:5px 5px 0 0; width:60px; padding:0px;"># of Heads</label>
			<input name="number_heads" type="range" min="1" max="10" step="1"	style="width:50px; "  value="6" >


		</div>

		<div id="row2_col1_b">	

			<label id="spacing_rows_units" for=name style="margin:5px 5px 0 0; width:80px; padding:0px;">Row Space</label>
			<input type="range" min="5" max="100" step="5" style="width:50px; margin-right:10px;" value="20" name="spacing_rows" />


			<label for=name style="margin:5px 5px 0 0; width:60px; padding:0px;"># of Rows</label>
			<input type="range" min="1" max="10" step="1" style="width:50px;" value="6" name="number_rows" />

		</div>

		</div>

	</div>


	<div id="row2_col2">

	<div class="mbox">


	   <div class="row_header">Pipes</div>

	<div id="row2_row_a">	


<label style="width:80px;" for=phone>Laterals HW  </label>
<input type="text"  style="margin-right: 10px;"  value="145" name="lateral_hazen" />


<label style="width:95px;" id="lateral_pipes_units" for=phone>Laterals ID</label>
<input type="text"  value="20" name="lateral_pipes" />

</div>



	<div id="row2_row_b">	
<label style="width:80px;" for=email>Manifolds HW</label>
<input type="text" style="margin-right: 10px;" value="110" name="manifold_hazen" />


<label style="width:95px;" id="manifold_pipes_units" for=name>Manifolds ID</label>
<input type="text"  value="40" name="manifold_pipes" />


</div>


	</div>

	</div>



	<div id="row2_col3">
	<div class="row_header">Other</div>
<div id="row2_row_a">
<label  id="valve_pressure_units" for=name>Valve Pressure </label>
<input type="text"  value="30" name="valve_pressure" />
</div>

<div id="row2_row_b">

<label id="sprinkler_flow_units" for=email>Sprinkler Flow</label>
<input  type="text"  value=".22" name="sprinkler_flow" />
</div>

	</div>

</div>



<div id="row3">
	

<div id="row3_col1">

<div class="mbox">
<div class="row_header">Type of System</div>

<div class="tc">


<input type="radio" name="group_type" checked id="ss"  value="solidset"/>
<label for="ss"><span></span>Solid Set</label>




</div>


<div class="tc">
<input type="radio" id="dr"  name="group_type" value="drip"/>
<label for="dr"><span></span>Micro Drip</label>
</div>

</div>
</div>

<div id="row3_col2">
<div class="mbox">
<div class="row_header">Manifold</div>

<div class="tcc">
<input type="radio" id="mside" name="group_man" checked  value="side"/>
<label for="mside"><span></span>Side</label>
</div>

<div class="tcc">
<input type="radio" id="mmid" name="group_man" disabledk  value="middle"/>
<label for="mmid"><span></span>Middle</label>
</div>

</div>
</div>

<div id="row3_col3">
<div class="mbox">

<div class="row_header">Valve</div>
<div class="tcc">
<input type="radio" id="vside" name="group_val" checked  value="side"/>
<label for="vside"><span></span>Side</label>


</div>

<div class="tcc">
<input type="radio" id="vmid" name="group_val"  disabledk value="middle"/>
<label for="vmid"><span></span>Middle</label>
</div>

</div>
</div>


<div id="row3_col4">
<div class="mbox">

<div class="row_header">Display</div>
<div class="tccc">
<input type="radio" id="dn"  name="group_tags"   value="none"/>
<label for="dn"><span></span>None</label>
</div>

<div class="tccc">
<input type="radio" id="df"  name="group_tags"  checked value="flow"/>
<label for="df"><span></span>Flow</label>
</div>

<div class="tccc">
<input type="radio" id="dv"  name="group_tags"   value="vel"/>
<label for="dv"><span></span>Velocity</label>
</div>

<div class="tccc">
<input type="radio" id="dp" name="group_tags"   value="pres"/>
<label for="dp"><span></span>Pressure</label>
</div>

</div>
</div>


<div id="row3_col5">

<div class="row_header">Units</div>
<div id="row3_row_a">


<input type="radio" class="english_gh_rb" name="group_units" style="display:block; float:left;"  value="english_gh"/>
<label class="english_gh_rb" style="display:block; width:70px; float:left;"  for=visa>English (G / h)</label>



<input class="english_gm_rb" type="radio"  name="group_units"  style="display:block; float:left;" value="english_gm"/>
<label class="english_gm_rb" style="display:block; width:70px; float:left;"  for=visa>English (G / m)</label>


</div>




<div id="row3_row_b">


<input class="metric_lh_rb" type="radio"  name="group_units"   value="metric_lh" style="display:block; float:left;"/>
<label class="metric_lh_rb" style="display:block; width:70px; float:left;" for=amex>Metric (L / h)</label>



<input class="metric_ls_rb" type="radio"  name="group_units" checked  value="metric_ls" style="display:block; float:left;"/>
<label class="metric_ls_rb" style="display:block; width:70px; float:left;" for=amex>Metric (L / s)</label>


</div>

</div>
</div>






	<div id="row4">
		
		<div id="row4_col1">
			<canvas id="canvas" width="520" height="520" style="float:left; background:#ggg; border:0px dashed #ccc; margin:0px;"></canvas>
		</div>
		<div id="row4_col2">
			
	<div id="results_header_div">

	<div id="results_header" style="font-size:18px;"> <div class="header" style="font-size:18px; font-weight:bold;">Results</div><div id="">Manifold </div><div id="">Laterals </div></div>
	<div id="results_header"> <div class="header">Max Flow</div><div id="man_max_flow" class="val">-------  </div><div class="val" id="lat_max_flow">-------  </div></div>
	<div id="results_header"> <div class="header">Max Velocity</div><div id="man_max_vel" class="val">-------  </div><div class="val" id="lat_max_vel">-------  </div></div>
	<div id="results_header"> <div class="header">Valve Pressure</div><div id="man_valve_press" class="val">-------  </div><div class="val" id="lat_valve_press">  </div></div>
	<div id="results_header"> <div class="header">Min Pressure</div><div id="man_min_press" class="val">  </div><div class="val" id="lat_min_press">-------  </div></div>

	</div>


	</div>

	</div>



</div>

</form>



<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-19887615-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>


</html>