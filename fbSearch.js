
 	// Function for send Ajax request to server .
  function httpRequest(iMethod,iUrl,iIsASync,iHttpRequestCB){
    var responseStr=null;
    var requestObj = new XMLHttpRequest();

        requestObj.open(iMethod,iUrl,iIsASync);

        requestObj.onreadystatechange=function() {
           // console.log('In onreadystatechange requestObj.readyState :'+requestObj.readyState+'|| requestObj.status :'+requestObj.status);
            if(requestObj.readyState== 4 && requestObj.status==200){
                responseStr= requestObj.responseText;
                // send response to caller .
               if(iHttpRequestCB)iHttpRequestCB(responseStr);
            }
      }
      requestObj.send(null);

  };
 
  //Function for send Ajax reqest .
 function pageFeedsReq(){
   
  var serachStr=document.getElementById('fbSearchBoxId');
  if(!serachStr.value) 
    return;
  // generated access token by cleint id & client scret id .
  var fbAccessToken="1493907950828602|-7KJqWaC0vGwILHS13cbyRndPE4";
  var requestPageURL="https://graph.facebook.com/search?type=page&q="+ serachStr.value+"&access_token="+fbAccessToken;
 //  console.log('Client requst on page url '+requestPageURL); 

      httpRequest('GET',requestPageURL,true,function(iPageFeeds){
            try{
              // console.log(iPageFeeds);
               var pageFeedsJSON=JSON.parse(iPageFeeds);
                   showResults(pageFeedsJSON);
            }
            catch(e){
                console.log("Error Catch in pageFeedsReq :"+e.message);
            }
     });
};

// Function to show result on page .
function showResults(pageFeeds){

   var resultDiv = document.getElementById('pageResultsId');
   var pageFeedLength=pageFeeds.data.length;

   if(pageFeedLength)
      resultDiv.innerHTML = "";   
   else
      resultDiv.innerHTML = "No results found";
 
    var count=0;
   for(var linkIndex=0; linkIndex<pageFeedLength; linkIndex++)
   {             
      var currentpage = pageFeeds.data[linkIndex];

      getPageDeailById(currentpage.id,function(detail){
        
          var psection = document.createElement("section");
          var h3       = document.createElement("h3");
          var pdesc    = document.createElement("p");
          var plink    = document.createElement("p");
          var lname    = document.createElement("a");
            
            lname.innerHTML =detail.link;
            lname.href= detail.link;
            lname.target = "_blank";
            plink.appendChild(lname);

           if(detail.name !=undefined){
              h3.innerHTML = detail.name ;
              psection.appendChild(h3);
           }               
           if(detail.description !=undefined){
              pdesc.innerHTML = detail.description;
              psection.appendChild(pdesc);
           }       
              psection.appendChild(plink);
              resultDiv.appendChild(psection);
          });
    }
  };
 
 function getPageDeailById(iPageId,iGetPageDeailByIdCB){
        
      var requestPageURL="https://graph.facebook.com/"+ iPageId;

       httpRequest('GET',requestPageURL,true,function(iPageFeeds){
            try{                
               var pageFeedsJSON=JSON.parse(iPageFeeds);
               if(iGetPageDeailByIdCB)iGetPageDeailByIdCB(pageFeedsJSON);
            }
            catch(e){
              console.log("Error Catch in getPageDeailById :"+e.message);
            }
     });
  };


 function accessTokenReq(){
    var requestPageURL="https://graph.facebook.com/oauth/access_token?client_id="+config.client_id+"&client_secret="+config.client_secret+"&grant_type=client_credentials";
  //      console.log('Client requst on url '+requestPageURL); 
    httpRequest('GET',requestPageURL,true,function(response){
  //      console.log("access_token is "+response);
    });
  };
