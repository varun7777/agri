const readline = require('readline'); 
const fs = require('fs'); 
var header1 =[]; 
var Jsondata1=[]; 
var tempData1={}; 
var isheader1=true; 
var flag1=false; 
var header =[]; 
var JsonData=[]; 
var tempData2={}; 
var isHeader=true; 
var header3 =[]; 
var jsonData3=[]; 
var tempData3={}; 
var isHeader3=true; 
var flag3=false; 
var header4 =[]; 
var jsonData4=[]; 
var tempData4={}; 
var isHeader4=true; 
var year = []; 
var aggregated_value = []; 
var jsonData5 = []; 
var tempData5 = {}; 
for(let i = 0;i <= 21;i++){ 
  aggregated_value[i] = 0; 
} 
const rl = readline.createInterface({ 
  input: fs.createReadStream('Production-Department_of_Agriculture_and_Cooperation_1.csv') 
}); 
rl.on('line', function(line) { 
  var alldatas= line.split(','); 
  var dataflag =false; 
  for(var i=0;i<alldatas.length;i++) 
  { 
    if(isheader1) 
    { 
      header1[i]=alldatas[i].trim(); 
    } 
    else if((header1[i]=="Particulars")|| (header1[i]=="3-2013")) 
    { 
      if(alldatas[0].includes("Foodgrain")&&!alldatas[0].includes("Oilseeds")) { 
        if((alldatas[0].includes("Target"))||(alldatas[0].includes("Achievements"))|| 
        (alldatas[0].includes("Yield"))|| (alldatas[0].includes("Area"))|| 
        (alldatas[0].includes("Volume"))|| (alldatas[0].includes("Other Cash Crops "))|| 
        (alldatas[0].includes("Oilseeds Nine Oilseeds"))||(alldatas[0].includes("Total"))) { 
          break; 
        } 
        else if(i==0){ 
          tempData1[header1[i]]=alldatas[i];} 
          else{ 
            tempData1[header1[i]]=parseFloat(alldatas[i+1].replace("NA",0));} 
            dataflag=true; 
          } 
        } 
      } 
      var dataflag3 =false; 
      for(var i=0;i<alldatas.length;i++) 
      { 
        if(isHeader3) 
        { 
          header3[i]=alldatas[i].trim(); 
        } 
        else if((header3[i]=="Particulars")|| (header3[i]=="3-2013")) 
        { 
          if(alldatas[0].includes("Oilseeds")) 
          { 
            if(i==0){ 
              tempData3[header3[i]]=alldatas[i]; 
            } 
            else{ 
              tempData3[header3[i]]=parseFloat(alldatas[i+1].replace("NA",0)); 
            } 
            dataflag3=true; 
          } 
        } 
      } 
      var dataflag4 =false; 
      for(var i=0;i<alldatas.length;i++) 
      { 
        if(isHeader4) 
        { 
          header4[i]=alldatas[i].trim(); 
        } 
        else if((header4[i]=="Particulars")|| (/3-/i.test(header4[i]))) 
        { 
          if(alldatas[0].includes("Rice Yield Karnataka") || alldatas[0].includes("Rice Yield Andhra Pradesh") || alldatas[0].includes("Rice Yield Kerala") || alldatas[0].includes("Rice Yield Tamil Nadu") ) 
          { 
            if(i==0){ 
              tempData4[header4[i]]=alldatas[i]; 
            } 
            for(i=3;i<25;i++) 
            { 
              tempData4[header4[i]]=parseFloat(alldatas[i+1].replace("NA",0)); 
            } 
            dataflag4=true; 
          } 
        } 
      } 
      if(dataflag4) 
      { 
        jsonData4.push(tempData4); 
      } 
      isHeader4=false; 
      fs.writeFileSync("output/southstating.json",JSON.stringify(jsonData4),encoding="utf8"); 
      tempData4={}; 
      if(dataflag3) 
      { 
        jsonData3.push(tempData3); 
      } 
      isHeader3=false; 
      fs.writeFileSync("output/oilseeding.json",JSON.stringify(jsonData3),encoding="utf8"); 
      tempData3={}; 
      if(dataflag) 
      { 
        Jsondata1.push(tempData1); 
      } 
      isheader1=false; 
      fs.writeFileSync("output/foodgraining.json",JSON.stringify(Jsondata1),encoding="utf8"); 
      tempData1={}; 
      if(/Agricultural Production Commercial \D/.test(alldatas[0])){ 
        var temp_year = 1993; 
        for(var i = temp_year;i <= 2014;i++){ 
          if(!year[i - temp_year]){ 
            year[i - temp_year] = i; 
          } 
          if(alldatas[i - temp_year +4] === "NA"){ 
            aggregated_value[i - temp_year] = aggregated_value[i - temp_year] + 0; 
          } 
          else{ 
            aggregated_value[i - temp_year] = aggregated_value[i - temp_year] + parseFloat(alldatas[i - temp_year + 4]); 
          } 
        } 
      } 
    }); 
    rl.on('close',function() 
    { 
      for (let n = 0; n < aggregated_value.length ; n++){ 
        tempData5 = {}; 
        tempData5["Year"] = year[n]; 
        tempData5["Aggregated value of all Commercial crops (Ton mn)"] = aggregated_value[n]; 
        jsonData5.push(tempData5); 
      } 
      fs.writeFileSync("output/threecommercialing.json",JSON.stringify(jsonData5),encoding="utf8"); 
    }); 

