<?php

//echo 'hi';

?>

<html>
<head>

<STYLE type="text/css">

</STYLE>

<link rel="stylesheet" type="text/css" href="quick_calc.css" />

<script type="text/javascript" src="jquery.js"></script> 
<script type="text/javascript" src="quick_calc.js"></script>          

 
</head>


<div id="site" style="">

<div id="holder" style="width:1100px; margin:auto auto;">



<form id="main_form">


<div class="mform" style="float:left; width:630px;">



<fieldset style="float:left;">
<legend>Input</legend>
<ol>
<li>
<label for=name></label>
<input type="text"  value="3" name="iflow" /><i class="flow_units"></i>
</li>
<li>
<label for=email></label>
<input type="text"  value="30" name="idiam" /><i class="diam_units"></i>
</li>
<li>
<label for=phone></label>
<input type="text"  value="3" name="ispoed" /><i class="len_units"></i>
</li>

</ol>
</fieldset>


<fieldset style="float:left; width:100px">
<legend>Calculate</legend>
<ol>

<li>
<fieldset>
<ol>
<li>
<input type="radio"  name="group_calc"   value="flow"/>
<label for=visa>Flow</label>
</li>
<li>
<input type="radio"  name="group_calc"  checked value="diam"/>
<label for=amex>Diameter</label>
</li>

<li>
<input type="radio"  name="group_calc"   value="spoed"/>
<label for=visa>Velocity</label>
</li>

</ol>
</fieldset>
</li>

</ol>
</fieldset>

<fieldset style="float:left;">
<legend>Results</legend>
<ol>
<li>
<label for=name></label>
<b id="flow1" /></b><i class="flow_units"></i>
</li>
<li>
<label for=email></label>
<b id="diam1" /></b><i class="diam_units"></i>
</li>
<li>
<label for=phone></label>
<b id="spoed1" /></b><i class="spoed_units"></i>
</li>

</ol>
</fieldset>



<fieldset style="float:left; width:100px;">
<legend>Length Units</legend>
<ol>

<li>
<fieldset>
<ol>
<li>
<input type="radio"  name="group_len_units" checked   value="0"/>
<label for=visa>Meters</label>
</li>
<li>
<input type="radio"  name="group_len_units"   value="1"/>
<label for=amex>Feet</label>
</li>



</ol>
</fieldset>

</li>

</ol>
</fieldset>


<fieldset style="float:left; width:100px;">
<legend>Diam Units</legend>
<ol>

<li>
<fieldset>
<ol>
<li>
<input type="radio"  name="group_diam_units" checked  value="0"/>
<label for=visa>Millimeter</label>
</li>
<li>
<input type="radio"  name="group_diam_units"   value="1"/>
<label for=amex>Inches</label>
</li>



</ol>
</fieldset>

</li>

</ol>
</fieldset>


<fieldset style="float:left; width:100px;">
<legend>Flow Units</legend>
<ol>

<li>
<fieldset>
<ol>
<li>
<input type="radio"  name="group_flow_units"   value="0"/>
<label for=visa>l/sec</label>
</li>
<li>
<input type="radio"  name="group_flow_units"   value="1"/>
<label for=amex>m3/hour</label>
</li>

<li>
<input type="radio"  name="group_flow_units"   value="2"/>
<label for=amex>GPM</label>
</li>

<li>
<input type="radio"  name="group_flow_units" checked  value="3"/>
<label for=amex>l/hour</label>
</li>

<li>
<input type="radio"  name="group_flow_units"   value="4"/>
<label for=amex>GPH</label>
</li>

<li>
<input type="radio"  name="group_flow_units"   value="5"/>
<label for=amex>l/minute</label>
</li> 
</ol>
</fieldset>

</li>

</ol>
</fieldset>



</div>




</form>

</div>

</div>


</html>