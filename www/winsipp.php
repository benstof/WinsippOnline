<?php

//echo 'hi';

?>

<html>
<head>

<STYLE type="text/css">

@font-face {
    font-family: 'KulminoituvaRegular';
    src: url('http://www.miketaylr.com/f/kulminoituva.ttf');
}

</STYLE>

<link rel="stylesheet" type="text/css" href="main.css" />
<link rel="stylesheet" type="text/css" href="jetblue.css" />
<link rel="stylesheet" type="text/css" href="jetblue_global.css" />
<link rel="stylesheet" type="text/css" href="jetblue_widget.css" />

<script type="text/javascript" src="jquery.js"></script> 
<script type="text/javascript" src="main.js"></script>          
<script type="text/javascript" src="rapha.js"></script>



 
</head>


<div id="site" style="">

<div id="holder" style="width:1100px; margin:auto auto;">

<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=442852215726032";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>



<div id="sticky-nav">
        <div class="sticky-nav-wrapper">
            <div class="page-title">
                <h3>IrriMaker Layout Calculator</h3>
				
<div class="social-share">
<!-- AddThis Button BEGIN -->
<div class="addthis_toolbox addthis_default_style ">

<div class="fb-like" data-href="http://www.irrimaker.com/layout-calc/" data-send="false" layout="button_count" data-width="50" data-show-faces="false"></div>


</div>
<script src="//s7.addthis.com/js/250/addthis_widget.js#pubid=jetblue1" type="text/javascript"></script>
<script>
jQuery(document).ready(function() {jQuery("#facebookLike").attr("fb:like:layout","button_count");jQuery("#googlePlusLike").attr("g:plusone:size","medium");});
</script>
<!-- AddThis Button END -->
</div>

            </div>
            <!-- /.page-title -->
            <div class="nav-sections">
                <div class="section-dropdown">
    <h5>Plan a trip</h5>
    <div class="section-nav">
        <h5>Plan a trip</h5>
        <div class="inner">
            <ul class="nav">
                <li><a href="/flights/">Settings</a></li>
                <li><a href="/vacations/">Layout</a></li>
            </ul>
        </div> <!-- /.inner -->
    </div> <!-- /.section-nav -->
</div> <!-- /.section-dropdown -->
                <ul class="clearfix" id="page-nav">
                   <li><a href="/flights/">Settings</a></li>
                   <li><a href="/vacations/">Layout</a></li>
                </ul>
                <!-- /#page-nav -->
            </div>
        </div>
        <!-- /.sticky-nav-wrapper -->
    </div>
	
	
	
			
			
	

<form id="main_form">

<div  style="margin:0 auto; width:962px;">	

<div style="float:left; width:100%; margin-bottom: 10px; display:nonee;" class="mform">


<fieldset>

<legend>Type of System</legend>
<ol>
<li>
<fieldset>
<ol>
<li>
<input type="radio"  name="group_type" checked  value="solidset"/>
<label for=visa>Solid Set</label>
</li>
<li>
<input type="radio"  name="group_type" disabledk  value="drip"/>
<label for=amex>Micro Drip</label>
</li>
</ol>
</fieldset>
</li>

</ol>
</fieldset>

<fieldset>
<legend>Valve</legend>
<ol>
<li>
<fieldset>
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

<fieldset>
<legend>Manifold</legend>
<ol>
<li>
<fieldset>
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

</ol>
</fieldset>





<fieldset>
<legend>Labels</legend>
<ol>

<li>
<fieldset>

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

<fieldset>
<legend>Units</legend>
<ol>

<li>
<fieldset>
<ol>


<li  id="english_gh_rb" >
<input type="radio"  name="group_units"   value="english_gh"/>
<label for=visa>English (G / h)</label>
</li>

<li  id="english_gm_rb">
<input type="radio"  name="group_units"   value="english_gm"/>
<label for=visa>English (G / m)</label>
</li>

<li  id="metric_lh_rb">
<input type="radio"  name="group_units"   value="metric_lh"/>
<label for=amex>Metric (L / h)</label>
</li>

<li id="metric_ls_rb">
<input type="radio"  name="group_units" checked  value="metric_ls"/>
<label for=amex>Metric (L / s)</label>
</li>

</ol>
</fieldset>

</li>

</ol>
</fieldset>


</div>
</div>

<div class="mform" style="float:left; width:900px; margin-bottom: 10px;">



<fieldset>
<legend>Heads</legend>
<ol>
<li>
<label for=name># of Heads</label>
<input type="text"  value="3" name="number_heads" />
</li>
<li>
<label id="head_space_label" for=email>Head Space</label>
<input type="text"  value="30" name="spacing_heads" /><i id="spacing_heads_units"></i>
</li>
</ol>
</fieldset>


<fieldset>
<legend>Rows</legend>
<ol>
<li>
<label for=phone># of Rows</label>
<input type="text"  value="3" name="number_rows" />
</li>
<li>
<label for=phone>Row Space</label>
<input type="text"  value="30" name="spacing_rows" /><i id="spacing_rows_units"></i>
</li>
</ol>
</fieldset>


<fieldset>
<legend>Manifolds</legend>
<ol>
<li>
<label for=name>Manifolds ID</label>
<input type="text"  value="40" name="manifold_pipes" /><i id="manifold_pipes_units"></i>
</li>
<li>
<label for=email>Manifolds HW</label>
<input type="text"  value="110" name="manifold_hazen" />
</li>

</ol>
</fieldset>


<fieldset>
<legend>Laterals</legend>
<ol>

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



<fieldset>

<legend>Valve</legend>
<ol>
<li>
<label for=name>Valve Pressure </label>
<input type="text"  value="30" name="valve_pressure" /><i id="valve_pressure_units"></i>
</li>




</ol>
</fieldset>


<fieldset>

<legend>Sprinkler</legend>
<ol>

<li>
<label id="flow_label" for=email>Sprinkler Flow</label>
<input type="text"  value=".22" name="flow" /><i id="flow_units"></i>
</li>


</ol>
</fieldset>




</div>

<div style="width:900px;">

<div style="margin:auto auto;  width:550px;">

<div id="results_header_div">

<div id="results_header" style="font-size:10px;">
<div>   </div><div> <b>Max Flow</b></div><div> <b>Max Velocity</b></div><div> <b>Valve Pressure</b></div><div> <b>Min Pressure</b></div>
</div>
<div id="results_header">
<div> Manifold  </div><div id="man_max_flow">-------  </div><div id="man_max_vel">-------  </div><div id="man_valve_press">-------  </div><div id="man_min_press">  </div>
</div>
<div id="results_header">
<div> Laterals  </div><div id="lat_max_flow">-------  </div><div id="lat_max_vel">-------  </div><div id="lat_valve_press">  </div><div id="lat_min_press">-------  </div>
</div>

</div>



<canvas id="canvas" width="500" height="500" style="float:left; background:#ggg; border:0px dashed #ccc; padding:10px; margin:10px;"></canvas>

</div>

<div id="D3line"></div>



</div>






</form>

</div>

</div>


</html>