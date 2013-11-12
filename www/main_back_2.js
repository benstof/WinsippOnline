$(document).ready(function() {


    Main.Init();
	Main.UpdateGraph();

	
$('#clear').click(function() {
   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   context.clearRect ( 0 , 0, canvas.width , canvas.height );
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

Main = {

   Pipes : new Array(),
   Nodes : new Array(),

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
    radius  : 10.533184,
   
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
   

   this.valve_press = parseFloat($('input:text[name=valve_pressure]').val());

   this.man_pipes = parseFloat($('input:text[name=manifold_pipes]').val());
   this.lat_pipes = parseFloat($('input:text[name=lateral_pipes]').val());
   
   this.man_hazen = parseFloat($('input:text[name=manifold_hazen]').val());
   this.lat_hazen = parseFloat($('input:text[name=lateral_hazen]').val());
   
   this.sprinkler_flow = parseFloat($('input:text[name=sprinkler_flow]').val());
   this.flow = this.sprinkler_flow;
   
   this.spacing_heads = parseFloat($('input:text[name=spacing_heads]').val());
   this.number_heads = parseFloat($('input:text[name=number_heads]').val());
	
   this.spacing_rows = parseFloat($('input:text[name=spacing_rows]').val());
   this.number_rows = parseFloat($('input:text[name=number_rows]').val());
   
   this.val_layout = $("input:radio[name=group_val]:checked").val();
   this.man_layout = $("input:radio[name=group_man]:checked").val();
   
   this.label = $("input:radio[name=group_tags]:checked").val();
   
   this.units = $("input:radio[name=group_units]:checked").val();
   
   $('#spacing_heads_units').html(this.len_units());
   $('#spacing_rows_units').html(this.len_units());
   $('#valve_pressure_units').html(this.press_units());
   $('#sprinkler_flow_units').html(this.flow_units());
   $('#manifold_pipes_units').html(this.diam_units());
   $('#lateral_pipes_units').html(this.diam_units());   
	  

	this.SetPipes(this.man_pipes, this.lat_pipes, this.man_hazen, this.lat_hazen);

    this.nq = 0;
    this.highflowLat = 0;
    this.highflowMan = 0;
    this.highvelocLat =0;
    this.highvelocMan = 0;
	this.veloc = 0;
	this.LowPres = 0;
	
      if (this.units == 'english') {
          this.flow = this.flow*0.063;
	  }
      else if (this.units == 'metric_lh') {
	     this.flow = this.flow/3600;
   
	  }
	

	
    },
	
diam_units : function()
{
   result = '';
   
         switch(this.units)
		 {
         case 'english':
		    result = ' inch';
		 break;
		 case 'metric_lh':
		    result = ' mm';
		 break;
		 case 'metric_ls':
		    result = ' mm';
		 break;
		 }

    return result;
	
},

press_units : function()
{
   result = '';
   
         switch(this.units)
		 {
         case 'english':
		    result = ' psi';
		 break;
		 case 'metric_lh':
		    result = ' bar';
		 break;
		 case 'metric_ls':
		    result = ' bar';
		 break;
		 }

    return result;
	
},

len_units : function()
{
   result = '';
   
         switch(this.units)
		 {
         case 'english':
		    result = ' ft';
		 break;
		 case 'metric_lh':
		    result = ' m';
		 break;
		 case 'metric_ls':
		    result = ' m';
		 break;
		 }

    return result;
	
},

flow_units : function()
{
   result = '';
   
         switch(this.units)
		 {
         case 'english':
		    result = ' gpm';
		 break;
		 case 'metric_lh':
		    result = ' l/h';
		 break;
		 case 'metric_ls':
		    result = ' l/s';
		 break;
		 }

    return result;
	
},

 si_press : function()   //m to psi
{
   result=1;
   if (this.units == 'english')  result=(14.5/10);

   return result;
},

si_flow : function()
{
   result=1;
   if (this.units == 'english')
      {
         result=1/0.063;
      }

   if (this.units == 'metric_lh') 
   {
      result=3600;
   }
   return result;

},

	tags : function(str,x,y){


	pixels = this.Pixels(x,y);
	    var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

		font_size = this.wrat + 5;
		
   num = (this.wrat);
   font_size = this.wrat + 9;
   
   num = (str);
   show = parseFloat(str).toFixed(2);
   
		//str =  this.wrat;
		
        context.font = font_size + "pt arial";
        context.fillText(show, pixels[0], pixels[1]);
		
   //grap.prt:=1;
   
   /*with sform do
   begin
      pixels(x,y);
      //pbox1.Canvas.TextOut(pixx,pixy,str);
      do_fontt(pbox1.Canvas,str,pixx,pixy,5,9,0,4);
   end; */
   

   
   },
	
	Setup : function(){        

      this.ww = this.number_heads*(this.spacing_heads)+this.radius*2.5;
      this.hh = this.number_rows *(this.spacing_rows)+this.radius*2.5;
	  
      this.wrat =$("#canvas").width()/this.ww;
	  
      this.hrat =$("#canvas").height()/this.hh;

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


	
	
	
    SetPipes : function(man_pipes, lat_pipes, man_hazen, lat_hazen) 
{
   this.Pipes[0] = new pipeObj('Manifold', 0, man_pipes, man_hazen);
   if (this.units == 'english') this.Pipes[0].id = this.Pipes[0].id*25.4;

   this.Pipes[1] = new pipeObj('Lateral', 0, lat_pipes, lat_hazen);
   if (this.units == 'english') this.Pipes[1].id = this.Pipes[1].id*25.4;

},
	
    UpdateGraph : function(){        

	this.Setup();

	  
		
		
    this.Nodes[0] = new nodeObj(0,0,0,0,0);
    this.Nodes[0].x = this.spacing_heads/2;
    this.Nodes[0].y = this.spacing_rows*this.number_rows/2+this.spacing_rows/4;
    this.Nodes[0].what =1;

		   
    if (this.val_layout == 'side') {
	   this.Nodes[0].y = this.spacing_rows/2;

	}
	
    if (this.man_layout == 'middle') {
	   //this.Nodes[0].x=this.spacing_heads*this.number_heads/2+this.spacing_heads*0.35;
   }
		 
    this.Nodes[0].prev =-1;

    fits = this.number_rows * this.number_heads;
	

		
    for (r=1; r<this.number_rows+1; r++)
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
                  if (h in [Math.floor(this.number_heads/2), Math.floor(this.number_heads/2) + 1]) this.Nodes[this.nq].prev = fits+r;
               }
               else
                  if (h==Math.floor((this.number_heads+1)/2))  this.Nodes[this.nq].prev=fits+r; 

            }
      }
    }
	
   
   for (r=1; r<this.number_rows+1; r++)
   {
      this.nq++;
	  this.Nodes[this.nq] = new nodeObj(0,0,0,0,0);
	  
         this.Nodes[this.nq].what=3;
         //this.Nodes[this.nq].prev=0;
		 
         if (r>1) this.Nodes[this.nq].prev=this.nq-1;

         switch(this.man_layout)
		 {
         case 'side':
                this.Nodes[this.nq].x=this.spacing_heads*3/4;
                this.Nodes[this.nq].y=r*this.spacing_rows;
             break;
         case 'middle': 
                this.Nodes[this.nq].what=3;
				
			//	x:=heads*headq/2+heads*0.4;
            //    y:=r*rows-rows/20;
				
                //this.Nodes[this.nq].x = this.spacing_heads*this.number_heads/2+this.spacing_heads*0.4;
                //this.Nodes[this.nq].y = r*this.spacing_rows-this.spacing_rows/20;
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
   

   for (r=0; r<this.nq+1; r++)
   {

		
         this.Pixels(this.Nodes[r].x,this.Nodes[r].y);
         //tags(inttostr(r),x,y);    numbers
         switch (this.Nodes[r].what)
		 {
         case 1 : 
		 this.doCircle(3,'156955');

	
		 break;
         case 2 : 
                this.doCircle(1,'ff0000');
                this.doCircle(this.radius,'8CC5C0');
             break;
         case 3 : this.doX(1,'4C31E0');
		 break;
		 }
   }
   
   
   for (i = 0; i < this.Nodes.length; i++){
      //console.log('i ' + i + 'prev ' + this.Nodes[i].prev);
   }
   
   
   //pipes
   r = this.GetNaaste(0, this.nq);


   for (r=1; r <= this.nq; r++) { this.Nodes[r].FlowIn=0}

   this.LowNode=0;
   this.LowPres=-1e6;

   pres0 = this.valve_press;
   
   //this.flow = parseFloat($('input:text[name=sprinkler_flow]').val());
         
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
			   Qflow = Qflow+this.flow;
			}
			
            this.Nodes[r].FlowIn = this.Nodes[r].FlowIn+Qflow;
			
         }
		 
		 
         if (this.units != 'english') pres = pres/10;   //m to bar
             
         if (pres>this.LowPres) 
         {

		 
            this.LowPres=pres;
            this.LowNode=j;
         }
		 
         if ((this.label == 'pres') && (this.LowNode>0)) 
         {
            this.LowNode =j;

            //tags(rtostr((pres0-pres*si_press),10,2),this.Nodes[this.LowNode].x,this.Nodes[this.LowNode].y);
			
			this.tags(pres0-pres*this.si_press(), this.Nodes[this.LowNode].x,this.Nodes[this.LowNode].y);
         }

      }
     
   }


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
               this.Drawp(this.Nodes[r].prev,r,'#000000',true)
			   
		 } 
		 else 
		 {
               this.Drawp(this.Nodes[r].prev,r,'#8452A1',false);
		}
      }
   }
   
   
   //valvep.caption:=edit1.text;
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
   
      console.log('pres0 '+ pres0);
	  console.log('this.LowPres '+ this.LowPres);
	  
   num = (pres0-this.LowPres*this.si_press());
   result = num.toFixed(2);
   $('#lat_min_press').html(result);
   
   $('#man_valve_press').html(pres0);
   
   
	},
	
	

 Pixels : function(x,y){

   pixels = new Array();
   
   conx =Math.floor(($("#canvas").width()-this.ww*this.wrat)/2);
   if (conx<this.radius*this.wrat)  conx=Math.floor(this.radius*this.wrat);

   cony =Math.floor(($("#canvas").height()-this.hh*this.wrat)/2);
   if (cony<this.radius*this.wrat) cony=Math.floor(this.radius*this.wrat);

   pixx =Math.floor(x*this.wrat)+conx; //+radius*wrat);
   pixy =Math.floor(y*this.wrat)+cony; //+radius*wrat);
   
   pixels[0] = pixx;
   pixels[1] = pixy;
   
   return pixels;

},

doX : function(rad,cc)
{
   ra2=Math.floor(rad*this.wrat);  

   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   
   context.beginPath();
   
   
   context.moveTo(pixx-ra2,pixy-ra2);
   context.lineTo(pixx+ra2,pixy+ra2);
   context.moveTo(pixx-ra2,pixy+ra2);
   context.lineTo(pixx+ra2,pixy-ra2);
   
   context.strokeStyle = cc;
   context.stroke();
},


 potago : function(x1,y1,x2,y2)
{

   result = Math.sqrt( Math.pow(x2-x1,2) + Math.pow(y2-y1,2) );

   return result;
   
},


 doCircle : function(rad,cc){

	
   j=0;
   ra2=Math.floor(rad*this.wrat);  
   
      

   var canvas = document.getElementById("canvas");
   var context = canvas.getContext("2d");
   
   context.beginPath();
   
  // var x = canvas.width / 2;
  // var y = canvas.height / 2;
   
      x=pixx+Math.floor(ra2*Math.cos(180*Math.pi));
      y=pixy+Math.floor(ra2*Math.sin(180*Math.pi));
   x = pixx;//-ra2;
   y = pixy;//-ra2;
   
   var radius = ra2;
   var startAngle = 1 * Math.PI;
   var endAngle = -1 * Math.PI;
   var counterClockwise = false;

   context.beginPath();
   context.arc(x, y, radius, startAngle, endAngle, counterClockwise);

		  
   //SetPen(cc);

  /* while (j<360)
   {
      px2=pixx+Math.floor(ra2*Math.cos(j/180*Math.pi));
      py2=pixy+Math.floor(ra2*Math.sin(j/180*Math.pi));

	  
		
      if (j==0) {
         context.moveTo(px2,py2)
		 }
      else
       {  context.lineTo(px2,py2);}
*/
	   context.strokeStyle = cc;
       context.stroke();
		
    //  j=j+5;
	  
	// }
  // until j>360;
   
},

 mag  : function(a1,a2) 
{
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
	  console.log('afst__ ' + afst);
	  
   if (this.units == 'english') {
      afst = afst*0.305;   //meter
	  console.log('afst ' + afst);
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
   pixels = this.Pixels(x,y);
   context.beginPath();
   context.moveTo(pixels[0],pixels[1]);

},

 Drawx : function(x,y,cc,context)
{

   pixels = this.Pixels(x,y);
        context.lineTo(pixels[0],pixels[1]);
	    context.strokeStyle = cc;
        context.stroke();
   
},

 Drawp : function(n1,n2,cc,mani){
 var canvas = document.getElementById("canvas");
 var context = canvas.getContext("2d");



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
   
	  
   this.veloc =this.veloc/area;    //m/s
   
   if (this.units== 'english') { 
      this.veloc=this.veloc/ this.feet
   };


   this.flow = this.Nodes[n2].FlowIn * this.si_flow();
   
   if (mani) 
   {
      
      if (this.flow>this.highflowMan)  this.highflowMan =this.flow;
      if (this.veloc>this.highvelocMan)  this.highvelocMan =this.veloc;
	}
	else
	{
      if (this.flow>this.highflowLat)  this.highflowLat=this.flow;
      if (this.veloc>this.highvelocLat)  this.highvelocLat=this.veloc;
	}
   
   
         switch(this.label)
		 {
         case 'flow':
		    this.tags(this.flow , (x1+x2)/2, (y1+y2)/2);
		 break;
		 
		 case 'vel' :
		    this.tags(this.veloc , (x1+x2)/2, (y1+y2)/2);
		 break;
		 }
/*
   case labels.ItemIndex of
   1 :  tags(rtostr(flow,10,2),(x1+x2)/2,(y1+y2)/2);
   2 :  tags(rtostr(veloc,10,2),(x1+x2)/2,(y1+y2)/2);
   end; */
}

	
}








   
