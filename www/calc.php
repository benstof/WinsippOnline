<?php
/*
Template Name: [layout_calc]
*/

echo '<head>';
    echo ' <link rel="stylesheet" href="http://www.irrimaker.com/irri_calc/main.css" type="text/css">';
    echo ' <script src="http://www.irrimaker.com/js/jquery.js"></script>';
    echo ' <script src="http://www.irrimaker.com/irri_calc/main.js"></script>';
     

echo '</head>';

get_header();

?>
<div class="container fix" id="maincontent">
				<div class="texture">
					<div class="content">
						<div class="content-pad">
<div class="fullwidth fix" id="pagelines_content">
	
		<div class="fix" id="column-wrap">
		
				<div class="mcolumn fix" id="column-main">
			<div class="mcolumn-pad" style="padding-top:0px; padding-left: 0px; " >
							<div class="copy fix" id="theloop">
				<div class="copy-pad">
<div id="post-1325" class="">
				
				
				
					  	
						<div class="entry_wrap fix">
						
							<div class="entry_content">
							
							
							<div id="content" style="font-family:arial; float:left; margin-bottom: 15px; margin-top:10px;">

							
							
							
							
							
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=442852215726032";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div style="width:900px;margin-bottom:10px; background:none;" id="results_header_div">


<h2 style="text-align:center; color:#3D9C93; font-family:arial; margin-top:0px; margin-bottom:0px; font-size:40px;"> IrriMaker Layout Calculator </h2>

<div class="fb-like" data-href="http://www.irrimaker.com/layout-calc/" data-layout="button_count" data-send="false" data-width="50" data-show-faces="false"></div>

</div>

	
<form id="main_form">


<div class="mform" style="float:left; width:150px;">



<fieldset>
<legend>Layout</legend>
<ol>
<li>
<label for=name># of Heads</label>
<input type="text"  value="3" name="number_heads" />
</li>
<li>
<label id="head_space_label" for=email>Head Space</label>
<input type="text"  value="30" name="spacing_heads" /><i id="spacing_heads_units"></i>
</li>
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

<fieldset>

<legend>Other</legend>
<ol>
<li>
<label for=name>Valve Pressure </label>
<input type="text"  value="30" name="valve_pressure" /><i id="valve_pressure_units"></i>
</li>

<li>
<label id="flow_label" for=email>Sprinkler Flow</label>
<input type="text"  value=".22" name="flow" /><i id="flow_units"></i>
</li>


</ol>
</fieldset>




</div>

<div style="float:left; width:550px;">

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



<div style="float:left; width:150px;" class="mform">


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

<fieldset>
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


</form>

							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							


</div>							
                                       
                                       <?php the_content(); ?>
                                       
									<div class="clear"></div> 

						</div>
								</div>

				<div class="clear"></div>
				</div>
			</div>
			
			</div>
		</div>
		
				
	</div>	
	
	
</div>						
					</div>
				</div>
			</div>
		</div>
		

<?

get_footer();

?>