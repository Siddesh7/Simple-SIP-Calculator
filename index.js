var monthlySlider = document.getElementById("monthlyslider");
var monthlyInput = document.getElementById("monthlyinput");
var interestSlider = document.getElementById("interestslider");
var interestInput = document.getElementById("interestinput");
var timeSlider = document.getElementById("timeslider");
var timer = document.getElementById("time");
var item = document.getElementById("item");
var ite = document.getElementById("ite");
var rt = document.getElementById("rt");

monthlyInput.value = monthlySlider.value; // Display the default slider value
monthlySlider.oninput = function() {
monthlyInput.value = (this.value);
sip();
}
monthlyInput.oninput = function() {
monthlySlider.value = this.value;
sip();
}

interestInput.value = interestSlider.value; // Display the default slider value
interestSlider.oninput = function() {
interestInput.value = (this.value);
sip();
}
interestInput.oninput = function() {
interestSlider.value = this.value;
sip();
}

timer.value = timeSlider.value; // Display the default slider value
timeSlider.oninput = function() {
timer.value = (this.value);
sip();
}
timer.oninput = function() {
timeSlider.value = this.value;
sip();
}

function sip(){

  var invested = parseInt(monthlyInput.value);
  var interest = interestInput.value;
  var duration = timer.value;
  console.log(typeof(invested));
  var amountAtEveryMonth =[];
  var amountCrypto =[];
  var yrs =[];
  var grw =[];
  var grwCrypto =[];
  duration=duration*12;
  interest= interest/100;
  interest=interest/12;
  let amount = 0;
  let amountOfCrypto = 0;
  for (let i =0; i<duration;i++){
      amount = (amount +invested)*(1+interest);
      amountAtEveryMonth[i+1]=amount;
  }
/*crypto trace 2 */
  for (let i =0; i<duration;i++){
      amountOfCrypto = (amountOfCrypto +invested)*(1.03);
      amountCrypto[i+1]=amountOfCrypto;
  }
  console.log(amountAtEveryMonth);
  for(let i =1; i<amountAtEveryMonth.length;i++){
    if ((i%12) == 0){
        yrs.push(i/12);
        grw.push(amountAtEveryMonth[i]);
        grwCrypto.push(amountCrypto[i]);
    }
  }
  item.innerHTML=`<h5>Principal Invested: ₹${(Math.round(invested*duration)).toLocaleString('en-IN')}<h5>`
  rt.innerHTML=`<h5>Expected Returns: ₹${(Math.round(amount)-(Math.round(invested*duration))).toLocaleString('en-IN')}<h5>`
  ite.innerHTML=`<h5> Total Investment: ₹${Math.round(amount).toLocaleString('en-IN')}<h5>`
  var trace1 = {
    x: yrs,
    y: grw,
    mode: 'lines',
    type: 'scatter',
    name:'Your Input'
  };
  var trace2 = {
    x: yrs,
    y: grwCrypto,
    mode: 'lines',
    type: 'scatter',
    name:'Cryptocurrency(index)'
  };
  const confiy = {
    displayModeBar: false,
  };
  var data = [trace1, trace2];
  const layout ={   
    'paper_bgcolor':'rgba(0,0,0,0)',
    'plot_bgcolor':'rgba(0,0,0,0)',
    xaxis: {title: "Duration"},
    yaxis: { title: "Investment"},
    showlegend: false
  
  };
  Plotly.newPlot('myDiv', data, layout, confiy);
}
