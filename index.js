const Youtube_URL= "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback){
  const query = { 
    key: "AIzaSyCdGSQu3gOyk49bvbvIfcdmn1T_hLJRFps",
    q: searchTerm ,
    part: 'snippet', 
    maxResults: '10', 
  }   
  $.getJSON(Youtube_URL, query, callback);
}

function renderResults(result){
  return `
  <div> 
      <h3>${result.snippet.title}</h3>
     <a target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">
     <img class="js-result-name" src="${result.snippet.thumbnails.default.url}"/></a>
  </div>
  
`;
}

function numberOfResults(result){
  return `<p> This page shows ${result.pageInfo.resultsPerPage} results of ${result.pageInfo.totalResults} results. </p>`;
}

function displayYouTubeSearchData(data){
  console.log(data);
  console.log(`https://www.youtube.com/watch?v=${data.items[0].id.videoId}`)
  const results = data.items.map((item, index) => renderResults(item));
  const pagecount = numberOfResults(data); 
  $('.js-results').html(results);
  $('.js-pgResults').html(pagecount);
//  $('.js-pgResults').html(resultCount);
}

function watchSubmit(){
  $('.js-search-form').submit(function (event) {
    event.preventDefault();
    const queryTargetValue = $(event.currentTarget).find('.js-search_box');
    const query = queryTargetValue.val();
    console.log(query);
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
