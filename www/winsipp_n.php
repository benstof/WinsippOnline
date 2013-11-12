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

 
</head>


<div id="site" style="">

<div id="holder" style="width:1100px; margin:auto auto;">



<form id="main_form">


<div class="mform" style="float:left; width:910px;">



<fieldset style="float:left;">
<legend>Layout</legend>
<ol>
<li>
<label for=name>Number of Heads</label>
<input type="text"  value="3" name="number_heads" />
</li>
<li>
<label for=email>Heads Spacing</label>
<input type="text"  value="30" name="spacing_heads" /><i id="spacing_heads_units"></i>
</li>
<li>
<label for=phone>Number of Rows</label>
<input type="text"  value="3" name="number_rows" />
</li>
<li>
<label for=phone>Rows Spacing</label>
<input type="text"  value="30" name="spacing_rows" /><i id="spacing_rows_units"></i>
</li>
</ol>
</fieldset>

<fieldset style="float:left;">
<legend>Pipes</legend>
<ol>
<li>
<label for=name>Manifolds ID</label>
<input type="text"  value="40" name="manifold_pipes" /><i id="manifold_pipes_units"></i>
</li>
<li>
<label for=email>Manifolds HW</label>
<input type="text"  value="110" name="manifold_hazen" />
</li>
<li>
<label for=phone>Laterals ID</label>
<input type="text"  value="20" name="lateral_pipes" /><i id="lateral_pipes_units"></i>
</li>

<li>
<label for=phone>Laterals HW</label>
<input type="text"  value="145" name="lateral_hazen" />
</li>
</ol>
</fieldset>

<fieldset style="float:left;">

<legend>Other</legend>
<ol>
<li>
<label for=name>Valve Pressure </label>
<input type="text"  value="30" name="valve_pressure" /><i id="valve_pressure_units"></i>
</li>
<li>
<label for=email>Sprinkler Flow</label>
<input type="text"  value=".22" name="sprinkler_flow" /><i id="sprinkler_flow_units"></i>
</li>

</ol>
</fieldset>




<fieldset style="float:left;">
<legend>Design Layout</legend>
<ol>
<li>
<fieldset>
<legend>Manifold</legend>
<ol>
<li>
<input type="radio"  name="group_man" checked  value="side"/>
<label for=visa>Side</label>
</li>
<li>
<input type="radio"  name="group_man" disabledk  value="middle"/>
<label for=amex>Middle</label>
</li>
</ol>
</fieldset>
</li>

<li>
<fieldset>
<legend>Valve</legend>
<ol>
<li>
<input type="radio"  name="group_val" checked  value="side"/>
<label for=visa>Side</label>
</li>
<li>
<input type="radio"  name="group_val"  disabledk value="middle"/>
<label for=amex>Middle</label>
</li>
</ol>
</fieldset>
</li>

</ol>
</fieldset>

<fieldset style="float:left; width:100px">
<legend>Display</legend>
<ol>

<li>
<fieldset>
<legend>Labels</legend>
<ol>
<li>
<input type="radio"  name="group_tags"   value="none"/>
<label for=visa>None</label>
</li>
<li>
<input type="radio"  name="group_tags"  checked value="flow"/>
<label for=amex>Flow</label>
</li>

<li>
<input type="radio"  name="group_tags"   value="vel"/>
<label for=visa>Velocity</label>
</li>
<li>
<input type="radio"  name="group_tags"   value="pres"/>
<label for=amex>Pressure</label>
</li>
</ol>
</fieldset>
</li>

</ol>
</fieldset>

<fieldset style="float:left; width:100px;">
<legend>Units</legend>
<ol>

<li>
<fieldset>
<ol>
<li>
<input type="radio"  name="group_units"   value="english"/>
<label for=visa>English</label>
</li>
<li>
<input type="radio"  name="group_units"   value="metric_lh"/>
<label for=amex>Metric (L / h)</label>
</li>

<li>
<input type="radio"  name="group_units" checked  value="metric_ls"/>
<label for=amex>Metric (L / s)</label>
</li>

</ol>
</fieldset>

</li>

</ol>
</fieldset>


</div>

<div style="float:left; width:950px;">



<canvas id="canvas" width="950" height="450" style="float:left; background:#ggg; border:0px dashed #ccc; margin:0px;"></canvas>


<div id="results_header_div">

<div id="results_header">
<div>   </div><div> <b>Max Flow</b></div><div> <b>Max Velocity</b></div><div> <b>Valve Pressure</b></div><div> <b>Min Pressure</b></div>
</div>
<div id="results_header">
<div> Manifold  </div><div id="man_max_flow">-------  </div><div id="man_max_vel">-------  </div><div id="man_valve_press">-------  </div><div id="man_min_press">  </div>
</div>
<div id="results_header">
<div> Laterals  </div><div id="lat_max_flow">-------  </div><div id="lat_max_vel">-------  </div><div id="lat_valve_press">  </div><div id="lat_min_press">-------  </div>
</div>

</div>


</div>




</form>

</div>

</div>


</html>