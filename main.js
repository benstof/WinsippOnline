$(document).ready(function() {


  Main.Init();
  Main.UpdateGraph();


  $('#clear').click(function() {
   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   context.clearRect ( 0 , 0, canvas.width , canvas.height );
 });


  $('.layout_opt').click(function() {

    $('.layout_opt').removeClass('act');
    $(this).addClass('act');



    if ($(this).attr('id') == 'row1_col2') {

       $('#row2').show();
       $('#row3').hide();

      //alert($(this).attr('id'));

    }

    if ($(this).attr('id') == 'row1_col3') {

       $('#row3').show();
       $('#row2').hide();
       
    }

    

 });


  $("input:radio[name=group_type]").click(function() {

    type = $("input:radio[name=group_type]:checked").val();
  
  if (type == 'drip'){
  
     $(".metric_ls_rb").fadeOut();
     $(".english_gm_rb").fadeOut();
     $(".english_gh_rb").fadeIn();
     $("#emitter_flow_input").fadeIn();
     $("#flow_label").html('Emitter flow');
     $("#head_space_label").html('Emitter space');
     
     $("input:radio[name=group_units][value=metric_lh]").trigger('click');
 
      
  } else {
  

     $(".english_gm_rb").fadeIn();
     $(".metric_ls_rb").fadeIn();

     $("#flow_label").html('Sprinkler flow');
     $("#head_space_label").html('Head space');
     
  }
   
});


  $('#main_form').change(function() {

   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   context.clearRect ( 0 , 0, canvas.width , canvas.height );

   Main.Init();
   Main.UpdateGraph();
   return false;
 });

});
//ShowLayout(espas.text,rspas.text,enum.text,rnum.text,_flow1.Caption,springs[act].spring[springs[act].nospring,1]);
/*
function ShowLayout(espas,rspas,enum,rnum,flow1,rad1)
{
      heads:=strtor(espas);  
    rows:=strtor(rspas);

      val(enum,headq,f);  
    val(rnum,rowq,f);

      radius:=rad1;
      f:=pos(' ',flow1);
      val(copy(flow1,1,f-1),flow,f);  //l/sec   3gal/min}

      if units.uu=2 then
          flow:=flow*0.063
      else
         if units.metflow=2 then flow:=flow/3600;

      Showmodal;

      release;
   end;

   end;*/

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

  valve_press : 0,
  veloc : 0,

  man_pipes : 0,
  lat_pipes : 0,

  man_hazen : 0,
  lat_hazen : 0,

  sprinkler_flow : 0,
  flow : 0,

  spacing_heads : 0,
  number_heads : 0,

  spacing_rows : 0,
  number_rows : 0,

  val_layout : 0,
  man_layout : 0,
  feet : 0.305,

  label : '',
  units : '',

  Init : function(){  


   this.Nodes = [];
   this.Pipes = [];

   this.Nodes[0] = new nodeObj(0,0,0,0,0);
   this.Pipes[0] = new pipeObj(0,0,0,0);
   
   this.Corners[0] = new point(0,0);
   this.Corners[1] = new point(0,0);
   this.Corners[2] = new point(0,0);
   this.Corners[3] = new point(0,0);


   this.type = $("input:radio[name=group_type]:checked").val();

   this.valve_press = parseFloat($('input:text[name=valve_pressure]').val());

   this.man_pipes = parseFloat($('input:text[name=manifold_pipes]').val());
   this.lat_pipes = parseFloat($('input:text[name=lateral_pipes]').val());
   
   this.man_hazen = parseFloat($('input:text[name=manifold_hazen]').val());
   this.lat_hazen = parseFloat($('input:text[name=lateral_hazen]').val());
   
   this.sprinkler_flow = parseFloat($('input:text[name=sprinkler_flow]').val());
   this.flow = this.sprinkler_flow;
   
   this.spacing_heads = parseFloat($('input[type="range"][name=spacing_heads]').val());
   this.number_heads = parseFloat($('input[type="range"][name=number_heads]').val());
   
   this.spacing_rows = parseFloat($('input[type="range"][name=spacing_rows]').val());
   this.number_rows = parseFloat($('input[type="range"][name=number_rows]').val());
   
   this.val_layout = $("input:radio[name=group_val]:checked").val();
   this.man_layout = $("input:radio[name=group_man]:checked").val();
   
   this.label = $("input:radio[name=group_tags]:checked").val();
   
   this.units = $("input:radio[name=group_units]:checked").val();
   

   $('#spacing_heads_units').html('Head Space ('+this.len_units()+')');
   $('#spacing_rows_units').html('Row Space ('+this.len_units()+')');
   $('#valve_pressure_units').html('Valve Pressure ('+this.press_units()+')');
   $('#sprinkler_flow_units').html('Sprinkler Flow ('+this.flow_units()+')');
   $('#manifold_pipes_units').html('Manifolds ID ('+this.diam_units()+')');
   $('#lateral_pipes_units').html('Laterals ID ('+this.diam_units()+')');   


   this.SetPipes(this.man_pipes, this.lat_pipes, this.man_hazen, this.lat_hazen);

   this.nq = 0;
   this.highflowLat = 0;
   this.highflowMan = 0;
   this.highvelocLat =0;
   this.highvelocMan = 0;
   this.veloc = 0;
   this.LowPres = 0;

   if (this.units == 'english_gm') {
          this.flow = this.flow*0.063;
     // console.log(this.flow);
    }
    
      if (this.units == 'english_gh') {
          this.flow = this.flow*0.063/3600;
     // console.log(this.flow);
    }
    
      if (this.units == 'metric_lh') {
       this.flow = this.flow/3600;

    }


var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

     //font_size = this.wrat + 5;

     /*  show = 'pplll';

      // context.globalCompositeOperation = "source-in";
       context.strokeStyle = '#ffffff';
       context.fillstyle = '#ffffff';
       context.font = 12 + "pt arial";
       context.fillText(show, 100, 100); */

},

diam_units : function(){
   result = '';
   
         switch(this.units)
     {
         case 'english_gh':
        result = 'inch';
     break;
         case 'english_gm':
        result = 'inch';
     break;
     case 'metric_lh':
        result = 'mm';
     break;
     case 'metric_ls':
        result = 'mm';
     break;
     }

    return result;
  
},

   press_units : function(){
   result = '';
   
         switch(this.units)
     {
         case 'english_gh':
        result = 'psi';
     break;
         case 'english_gm':
        result = 'psi';
     break;
     case 'metric_lh':
        result = 'bar';
     break;
     case 'metric_ls':
        result = 'bar';
     break;
     }

    return result;
  
},

   len_units : function(){
   result = '';
   
         switch(this.units)
     {
         case 'english_gh':
        result = 'ft';
     break;
         case 'english_gm':
        result = 'ft';
     break;
     case 'metric_lh':
        result = 'm';
     break;
     case 'metric_ls':
        result = 'm';
     break;
     }

    return result;
  
},

   flow_units : function(){
   result = '';
   
         switch(this.units)
     {
         case 'english_gh':
        result = 'gph';
     break;
         case 'english_gm':
        result = 'gpm';
     break;
     case 'metric_lh':
        result = 'l/h';
     break;
     case 'metric_ls':
        result = 'l/s';
     break;
     }

    return result
  
},

   si_press : function() {  //m to psi{
   result=1;
   
   if (this.units == 'english_gm' || this.units == 'english_gh')  result=(14.5/10);

   return result;
},

   si_flow : function() {
   result=1;
   if (this.units == 'english_gm')
      {
         result=1/0.063;
      }
    
   if (this.units == 'english_gh')
      {
         result=1/0.063*3600;
      }
    
   if (this.units == 'metric_lh') 
   {
      result=3600;
   }
   return result;

},

  tags : function(str,x,y){



    this.Pixels(x,y);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

     //font_size = this.wrat + 5;

       //num = (this.wrat);
       font_size = this.wrat + 8;

       num = (str);
       show = parseFloat(str).toFixed(2);

      // context.globalCompositeOperation = "source-in";       
       context.font = font_size + "pt arial";

       if (this.type == 'drip'){
            context.fillStyle = '#014E90';
        } else {
          context.fillStyle = '#fff';
        }

        if (str != '') {
          context.fillText(show, pixx, pixy);
          context.fill;
        }

     },

     Setup : function(){        

      this.ww = (this.number_heads - 0) * this.spacing_heads + this.radius * 2;
      this.hh = (this.number_rows - 0) * this.spacing_rows + this.radius * 2;


   //console.log('this.ww ' + this.ww);
   //console.log('this.hh ' + this.hh);
   
   this.wrat =$("#canvas").width()/this.ww;
   this.hrat =$("#canvas").height()/this.hh;


  // console.log('this.wrat ' + this.wrat);
  // console.log('this.hrat ' + this.hrat);


  if (this.wrat<this.hrat) { this.hrat=this.wrat; } else {this.wrat=this.hrat};

},

GetNaaste : function(nn,nq) {
  
 dist=1e6;
 result=0;
 xp=this.Nodes[nn].x;
 yp=this.Nodes[nn].y;

 for (j=0; j<=this.nq; j++)
 {
  if (j != nn) 
  {
   afst=this.potago(xp,yp,this.Nodes[j].x,this.Nodes[j].y);
   if (afst<dist) 
   {
    dist=afst;
    result = j;
    break;
  }
}
}

return result;

},

SetPipes : function(man_pipes, lat_pipes, man_hazen, lat_hazen) {
 this.Pipes[0] = new pipeObj('Manifold', 0, man_pipes, man_hazen);
 if (this.units == 'english') this.Pipes[0].id = this.Pipes[0].id*25.4;

 this.Pipes[1] = new pipeObj('Lateral', 0, lat_pipes, lat_hazen);
 if (this.units == 'english') this.Pipes[1].id = this.Pipes[1].id*25.4;

},
setupPrev : function() {
   
   fits = this.number_rows * this.number_heads;


    for (r=1; r<=this.number_rows; r++)
    {
    for(h = this.number_heads; h > 0 ; h-- ) 
      {
        this.nq++;
    
    this.Nodes[this.nq] = new nodeObj(0,0,0,0,0);
    this.Nodes[this.nq].what=2;
        this.Nodes[this.nq].x=h*this.spacing_heads;
        this.Nodes[this.nq].y=r*this.spacing_rows;
    
            if (this.man_layout == 'side') 
      {
                this.Nodes[this.nq].prev = this.nq+1;
                if (h==1) 
          {
                  this.Nodes[this.nq].prev = fits+r;
          }
            }
            else
            {
    
               if (h> Math.floor(this.number_heads/2) )
         { 
                  this.Nodes[this.nq].prev =this.nq+1
         } 
          else 
         {
            this.Nodes[this.nq].prev=this.nq-1
         };
      

               if (this.number_heads % 2 == 0)      //2 nodes to fitting
               {
            ta = new Array(Math.floor(this.number_heads/2), Math.floor(this.number_heads/2) + 1);
            if ( (jQuery.inArray( parseInt(h), ta )) > -1 )
          {
             this.Nodes[this.nq].prev = fits+r;
          }
               }
         
               else if (h==Math.floor((this.number_heads+1)/2))  
         {
            this.Nodes[this.nq].prev=fits+r; 
         }
            }
      }
    }
  
   },
     
   setupValve : function(){
   
    this.Nodes[0] = new nodeObj(0,0,0,0,0);
    this.Nodes[0].x = this.spacing_heads/2;
    this.Nodes[0].y = this.spacing_rows*this.number_rows/2+this.spacing_rows/4;
    this.Nodes[0].what =1;

       
    if (this.val_layout == 'side') {
     this.Nodes[0].y =this.spacing_rows/2;
  }
  
    if (this.man_layout == 'middle') {
     this.Nodes[0].x=this.spacing_heads*this.number_heads/2+this.spacing_heads*0.35;
   }
     
    this.Nodes[0].prev =-1;
  
  },
   
   FlowAndPressure : function(){
   
      //pipes
   r = this.GetNaaste(0, this.nq);

   for (r=1; r <= this.nq; r++) { this.Nodes[r].FlowIn=0}

   this.LowNode=0;
   this.LowPres=-1e6;

   pres0 = this.valve_press;
   
   
   for (j=1; j <= this.nq; j++)
   {

      endd=true;
    for (i=1; i <= this.nq; i++)
    { 
       if (this.Nodes[i].prev==j){ endd=false};
    }

        if (endd) 
        {
              
         r=j;
         Qflow=this.flow; //flow

         this.Nodes[j].FlowIn=this.flow; //flow;
         pres=0;

         while ( this.Nodes[r].prev > 0 ) 
         {
            pres=pres+this.PresCalc(r,this.Nodes[r].prev);
     
            r=this.Nodes[r].prev;
      
            if (this.Nodes[r].what==2) {

               if ((this.man_layout == 'middle') && ((this.number_heads % 2) != 0) && (this.Nodes[this.Nodes[r].prev].what != 2)) {
                  Qflow = Qflow+this.flow/2
               } else {
                  Qflow = Qflow+this.flow;
        }

      }
      
            this.Nodes[r].FlowIn = this.Nodes[r].FlowIn+Qflow;
      
         }

         if ((this.units != 'english_gm') || (this.units != 'english_gh')) pres = pres/10;   //m to bar
             
         if (pres>this.LowPres) 
         {
            this.LowPres=pres;
            this.LowNode=j;
         }
     
         if ((this.label == 'pres') && (this.LowNode>0)) 
         {
            this.LowNode =j;
      this.tags(pres0-pres*this.si_press(), this.Nodes[this.LowNode].x,this.Nodes[this.LowNode].y);
         }
      }
   }
   
   
   },
   
   nodePositions : function(){
   
   for (r=1; r<this.number_rows+1; r++)
   {
      this.nq++;
    this.Nodes[this.nq] = new nodeObj(0,0,0,0,0);
    this.Nodes[this.nq].what=3;

         if (r>1) this.Nodes[this.nq].prev=this.nq-1;

         switch(this.man_layout)
     {
         case 'side':
                this.Nodes[this.nq].x=this.spacing_heads*3/4;
                this.Nodes[this.nq].y=r*this.spacing_rows;
             break;
         case 'middle':         
                this.Nodes[this.nq].x= this.spacing_heads*this.number_heads/2+this.spacing_heads*0.4;
                this.Nodes[this.nq].y= r*this.spacing_rows-this.spacing_rows/20;
             break;
         }
     
         switch(this.val_layout)
     {
         case 'side':
                this.Nodes[this.nq].prev=this.Nodes[this.nq].prev;
             break;
         case 'middle': 
     
                if (r > Math.floor(this.number_rows/2)) {
           this.Nodes[this.nq].prev=this.nq-1;
          } else {
           this.Nodes[this.nq].prev=this.nq+1;
        };
        
               if (this.number_rows % 2 == 0) {     //2 nodes to fitting

                  if (r==Math.floor(this.number_rows/2)) {
             this.Nodes[this.nq].prev=0;

            }
         }
               else if (r==Math.floor((this.number_rows+1)/2))
         {  
            this.Nodes[this.nq].prev=0;
         }
         
             break;
         }
   }
   
   },

       showResults : function(){

         var num = (this.highflowMan);
         result = parseFloat(num).toFixed(2) + ' ' +this.flow_units();
         $('#man_max_flow').html(result);

         num = (this.highflowLat);
         result = parseFloat(num).toFixed(2) + ' ' +this.flow_units();
         $('#lat_max_flow').html(result);

         num = (this.highvelocMan);
         result = parseFloat(num).toFixed(2) + ' ' +this.len_units() + '/sec';
         $('#man_max_vel').html(result);

         num = (this.highvelocLat);
         result = parseFloat(num).toFixed(2) + ' ' +this.len_units() + '/sec';
         $('#lat_max_vel').html(result);

         num = (pres0-this.LowPres*this.si_press());
         result = num.toFixed(2);
         $('#lat_min_press').html(result+' '+this.press_units());
         $('#man_valve_press').html(pres0 +' '+this.press_units());

       },


       UpdateGraph : function(){        

         this.Setup();  
         this.setupValve();
         this.setupPrev();  
         this.nodePositions();
         this.drawNodes();
         this.FlowAndPressure();
         this.drawPipes();
         this.showResults();

         for (i = 0; i < this.Nodes.length; i++){
      //console.log('i ' + i + 'prev ' + this.Nodes[i].prev);
    }

  },

  drawPipes : function() {
   
      for (r=1; r <= this.nq; r++)
   {
      if (this.Nodes[r].prev >= 0) 
    {
         if (this.Nodes[r].prev==0) 
     {
            this.Drawp(this.Nodes[r].prev,r,'#000000',true);
       }
         else if ((this.Nodes[r].what==3) && (this.Nodes[this.Nodes[r].prev].what==3)) 
     {
            this.Drawp(this.Nodes[r].prev,r,'#888888',true)
     } 
     else 
     {
            this.Drawp(this.Nodes[r].prev,r,'#8452A1',false);
    }
      }
   }
   
},

   drawNodes : function (){
   
   for (r=0; r<this.nq+1; r++)
   {
 
    this.Pixels(this.Nodes[r].x,this.Nodes[r].y); 
         switch (this.Nodes[r].what)
     {
         case 1 : 
        
      this.doCircle(3,'156955');
        break;
      
         case 2 : 
     
        if (this.type == 'drip'){
      
               this.doCircle(.7,'ff0000');
               //this.doCircle(this.radius,'8CC5C0');
      
      } else {
      
               this.doCircle(1,'ff0000');
               this.doCircle(this.radius,'8CC5C0');
      }
      
            break;
      
         case 3 : 
        this.doX(1,'4C31E0');
        break;  
     }
    }
  
   },
   
   Pixels : function(x,y){

   conx =Math.floor(($("#canvas").width()-this.ww*this.wrat)/2);
   
   if (conx<this.radius*this.wrat)  {
      conx=Math.floor(this.radius*this.wrat);
   } else {
   }

   cony =Math.floor(($("#canvas").height()-this.hh*this.wrat)/2);
   if (cony<this.radius*this.wrat) {
      cony=Math.floor(this.radius*this.wrat);
   } else {
   }
  
   pixx = Math.floor(x*this.wrat);//+conx-0; //+radius*wrat);
   pixy = Math.floor(y*this.hrat);//+cony-0; //+radius*wrat);

},

   doX : function(rad,cc) {
   ra2=Math.floor(rad*this.wrat);  

   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   
   context.beginPath();
   
   
   context.moveTo(pixx-ra2,pixy-ra2);
   context.lineTo(pixx+ra2,pixy+ra2);
   context.moveTo(pixx-ra2,pixy+ra2);
   context.lineTo(pixx+ra2,pixy-ra2);
   
   context.globalAlpha = 1;
   context.strokeStyle = '#ccc';
   context.stroke();
},

   potago : function(x1,y1,x2,y2){

   result = Math.sqrt( Math.pow(x2-x1,2) + Math.pow(y2-y1,2) );

   return result;
   
},

   doCircle : function(rad,cc){

   ra2=Math.floor(rad*this.wrat);  

   //console.log('pixx ' + pixx);
   //console.log('pixy ' + pixy);
   
   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   
   context.beginPath(); 

   var radius = ra2;
   var startAngle = 1 * Math.PI;
   var endAngle = -1 * Math.PI;
   var counterClockwise = false;

   context.beginPath();
   context.fillStyle = "#014E90";
   //context.globalCompositeOperation = "lighter";

   context.arc(pixx, pixy, radius, startAngle, endAngle, counterClockwise);
   //context.strokeStyle = cc;
   //context.stroke();
   context.fill(); 
    
},

   mag  : function(a1,a2) {
   result =0;

   if (a1!=0) {
      result =Math.exp(a2*Math.log(a1));
   }
   
   return result;
   
},

   hazen : function(L,q,d,c,dw)    //{Hazen Williams   met variables}
{

   result = 0;
   if (c==0)  c=150;  //{plastic}
          //{hazen will}
      
      
                   //{friction in pipe + z2-z1 diff}
   if (q/c>0.000000000001) 
   {
    result = 1.212e12 * this.mag(q/c,1.852) * this.mag(d,-4.87);

     // return result;
   }
     //.log('hazen ' + result);
   return result*L/100;
   
},


 PresCalc : function(n1,n2) 
{
   afst=this.potago(this.Nodes[n1].x,this.Nodes[n1].y,this.Nodes[n2].x,this.Nodes[n2].y);

    
   if (this.units == 'english_gm'  || this.units == 'english_gh') {
      afst = afst*0.305;   //meter
   }
   
   diam = this.Pipes[1].id; //strtor(lats.text);
   hazenNo =this.Pipes[1].hazen;

   if ((this.Nodes[n1].what==3) && (this.Nodes[n2].what==3)) 
   {
      diam = this.Pipes[0].id;  //strtor(manif.text);
      hazenNo = this.Pipes[0].hazen;
   }

   diam =diam; //*25.4;   //mm

   floww =this.Nodes[n1].FlowIn; //*0.063;

   this.hazen_val = this.hazen(afst,floww,diam,hazenNo,0);
   return this.hazen_val;

},

 Movex : function(x,y,context)
 {
   this.Pixels(x,y);
   context.beginPath();
   context.moveTo(pixx,pixy);

 },

 Drawx : function(x,y,cc,context)
 {

   this.Pixels(x,y);
   context.lineTo(pixx,pixy);
   context.strokeStyle = '#cccccc';//cc;
   context.stroke();
   
 },

 Drawp : function(n1,n2,cc,mani){
 var canvas = document.getElementById("canvas");
 var context = canvas.getContext("2d");
 context.globalAlpha = 1;
 

   x1 =this.Nodes[n1].x;
   y1 =this.Nodes[n1].y;
   x2 =this.Nodes[n2].x;
   y2 =this.Nodes[n2].y;
   
   this.Movex(x1,y1,context);
   this.Drawx(x2,y2,cc,context);
   
   



   rad =this.Pipes[1].id; //strtor(lats.text);
   if (mani)  rad=this.Pipes[0].id; //strtor(manif.text);

  // if units.uu=2 then rad:=rad*25.4;  //inch to mm

   this.veloc=this.Nodes[n2].FlowIn; //*0.063;   //l/s
   
   area = Math.PI * ( (rad/2) * (rad/2) ) / 1000;
   
    
   _veloc =this.veloc/area;    //m/s
   
   if (this.units== 'english_gm' || this.units == 'english_gh') { 
      _veloc=this.veloc/ this.feet
   };
   

   _flow = this.Nodes[n2].FlowIn * this.si_flow();
   
   if (mani) 
   {
      
      if (_flow>this.highflowMan)  this.highflowMan =_flow;
      if (_veloc>this.highvelocMan)  this.highvelocMan =_veloc;
  }
  else
  {
      if (_flow>this.highflowLat)  this.highflowLat=_flow;
      if (_veloc>this.highvelocLat)  this.highvelocLat=_veloc;
  }
   
   
   if (this.type == 'drip'){
   _flow = "";
   _veloc = "";
   
   ca = new Array();
   x = 0;
   for (i = this.number_heads; i <= (this.number_heads * this.number_rows); i = i + this.number_heads){
      ca[x] = i;
    x++;
   }
   
   ca_e = new Array();
   x = 0;
   for (i = this.number_heads/2; i <= (this.number_heads * this.number_rows); i = i + this.number_heads){
      ca_e[x] = i;
    x++;
   }
   for (i = this.number_heads/2 +1; i <= (this.number_heads * this.number_rows); i = i + this.number_heads){
      ca_e[x] = i;
    x++;
   }
   
   
   ca_e = new Array();
   x = 0;
   for (i = Math.floor(this.number_heads/2); i <= (this.number_heads * this.number_rows); i = i + this.number_heads){
  //    ca_e[x] = i;
    x++;
   }
   for (i = Math.floor(this.number_heads/2) +1; i <= (this.number_heads * this.number_rows); i = i + this.number_heads){
      ca_e[x] = i;
    x++;
   }
   
 console.log(ca_e);
   
      if(this.man_layout == 'side'){
    
            if ((jQuery.inArray( parseInt(n2), ca )) > -1 )
          {
             _flow = this.Nodes[n2].FlowIn * this.si_flow();
           _veloc =this.veloc/area;
          }
    
    } else {
    
   
            //   if (this.number_heads % 2 == 0)      //2 nodes to fitting
            //   {
            if ((jQuery.inArray( parseInt(n2), ca_e )) > -1 )
          {
             _flow = this.Nodes[n2].FlowIn * this.si_flow();
           _veloc =this.veloc/area;
          }
           //    }
         
           //    else if (n2==Math.floor((this.number_heads+1)/2))  
      //   {
      //      this.flow = 100;
      //   }
  }
  
  }
         
         
       //if (this.type = 'drip' && (jQuery.inArray( parseInt(n2), ca )) > -1 ) {
     
         switch(this.label)
     {
         case 'flow':
        this.tags(_flow, (x1+x2)/2, (y1+y2)/2);
     break;
     
     case 'vel' :
        this.tags(_veloc , (x1+x2)/2, (y1+y2)/2);
     break;
     }
     
    //}

}


}









