$(document).ready(function() {


    Main.Init();
    Main.doCalc();
		
	//Main.UpdateGraph();

	
$('#clear').click(function() {
   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   context.clearRect ( 0 , 0, canvas.width , canvas.height );
});
 
   
$('#main_form').change(function() {


    Main.Init();
	Main.doCalc();
  return false;
});

 });


function nodeObj(what, y, x, prev, FlowIn) 
{
   this.what=what; //1=valve 2=sprinkler 3=fitting
   this.y=y;
   this.x=x;
   this.prev=prev;
   this.FlowIn=FlowIn;
}


function pipeObj(name, od, id, hazen) 
{
   this.name=name;   
   this.od=od;
   this.id=id;
   this.hazen=hazen;
}

function point(x,y)
{
   this.x = x;
   this.y = y;
}
   
Main = {

    Pipes : new Array(),
    Nodes : new Array(),
   
    Corners : new Array(),
    nq : 0, 
    highflowLat : 0,
    highflowMan : 0,
    highvelocLat : 0,
    highvelocMan : 0,
	wrat : 0,
	hrat : 0,
	ww :0,
	hh :0,
    total : 0,
    radius  : 10,
   

	feet : 0.305,
	calc : '',
	label : '',
    units : '',
	
	iflow : 0,
	idiam : 0,
	ispoed : 0,
	
   Init : function(){  


   this.iflow = parseFloat($('input:text[name=iflow]').val());
   this.idiam = parseFloat($('input:text[name=idiam]').val());
   this.ispoed = parseFloat($('input:text[name=ispoed]').val());
   
   this.group_flow_units = parseFloat($("input:radio[name=group_flow_units]:checked").val());
   this.group_diam_units = parseFloat($("input:radio[name=group_diam_units]:checked").val());
   this.group_len_units =parseFloat( $("input:radio[name=group_len_units]:checked").val());
      
   this.calc = $("input:radio[name=group_calc]:checked").val();
   
  // $('#flow_units').html(this.len_units());
  // $('#diam_units').html(this.len_units());
  // $('#spoed_units').html(this.press_units());
   
   $(".flow_units").html(this.flow_units());
   $(".diam_units").html(this.diam_units());
   $(".len_units").html(this.len_units());
		
      if (this.units == 'english') {
          this.flow = this.flow*0.063;
	  }
      else if (this.units == 'metric_lh') {
	     this.flow = this.flow/3600;
   
	  }
	

	
    },

   diam_units : function(){
   result = '';
   
         switch(this.group_diam_units)
		 {
   case 0 : result = 'mm';   break;                  //{mm=mm}
   case 1 : result =  'inches';   break;            // {inch 25.4 = mm}
		 }

    return result;
	
},


   len_units : function(){
   result = '';
   
         switch(this.group_len_units)
		 {
   case 0 : result ='m/sec';  break;         //   {meters=meters}
   case 1 : result ='ft/sec';  break;   //    {1 ft =.305 m}
		 }

		 console.log(this.group_len_units);
    return result;
	
},

   flow_units : function(){
   result = '';

         switch(this.group_flow_units)
		 {
   case 0 : result = 'l/sec';  break;              //{l/s=l/s}
   case 1 : result = 'm3/hour';  break;      //{m3/h 264.2 =gpm 0.063 =l/s}
   case 2 : result = 'GPM';  break;            //{GPM 0.063 =l/s}
   case 3 : result = 'l/hour'; break;  
   case 4 : result = 'GPH';  break;          // {GPH}
   case 5 : result = 'l/minute'; break;  
		 }

		    console.log(result);
   
    return result;
	
},

len_si : function(ll,nom){   // {mm werk in meters}

   if (nom<0)  nom = this.group_len_units;
	   
   switch(nom){
   case 0 : result =ll;  break;         //   {meters=meters}
   case 1 : result =ll*0.305;  break;   //    {1 ft =.305 m}
   }
},


flow_si : function(ll,nom){   //  {MM werk in l/s}

   //if nom<0 then nom:=flowunit1;
   if (nom<0)  nom = this.group_flow_units;
	   
   switch(nom){
   case 0 : result = ll;  break;              //{l/s=l/s}
   case 1 : result =ll/0.227/15.852;  break;      //{m3/h 264.2 =gpm 0.063 =l/s}
   case 2 : result = ll*0.063;  break;            //{GPM 0.063 =l/s}
   case 3 : result = ll/3600; break;  
   case 4 : result =ll*0.063/60;  break;          // {GPH}
   case 5 : result =ll/60; break;  
   }
},

diam_si : function(ll,nom){

   //if nom<0 then nom:=diamunit1;
   if (nom<0)  nom = this.group_diam_units;

   switch(nom){
   case 0 : result =ll;   break;                  //{mm=mm}
   case 1 : result =ll*25.4;   break;            // {inch 25.4 = mm}
   }
},

doCalc : function(){

   ww = 1;
   
   if (this.calc == 'flow')  ww = 2;
   if (this.calc == 'spoed') ww =3;

  // val(iflow.text,flow_,f);
   flow_ = this.flow_si(this.iflow,-1)/1000;
   
  // val(idiam.text,diam_,f);
   diam_ = this.diam_si(this.idiam,-1);
   
   area =Math.exp(diam_/2)*Math.PI/(1000*1000);

  // val(ispoed.text,spoed_,f);
   spoed_ = this.len_si(this.ispoed,-1);
   
   $("#flow1").html(this.iflow);
   $("#diam1").html(this.idiam);
   $("#spoed1").html(this.ispoed);
   

   
   /*case ww of
      1 : begin
             flow1.caption:=rtostr(this.si_flow(spoed_*area*1000,-1),10,2); //m3/s>l/s
          end;
      2 : begin
             if spoed_>0 then
             begin
                area:=flow_/spoed_; rad:=sqrt(area/pi)*1000*2;   //m>mm
                diam1.caption:=rtostr(this.si_diam(rad,-1),10,2);
             end;
          end;
      3 : begin
             if area>0 then
             begin
                rad:=flow_/area;       //m3/s /m2  =m/s
                spoed1.caption:=rtostr(this.si_len(rad,-1),10,2);
             end;
          end;

   end; */
   
   }

	
}








   
