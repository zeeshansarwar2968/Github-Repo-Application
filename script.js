//////////Logic Design for github profile data fetch///////////////////////////////////////////

const fetchDataBtn = document.querySelector("#fetchData");
const result = document.querySelector("#result");

// // add an event listener to the button
fetchDataBtn.addEventListener("click",getData);

//get data from  Git API

async function getData() {

    let userGit = document.getElementById("profileName").value;
    url = `https://api.github.com/users/${userGit}`
    result.innerHTML = "Loading...";
    try {
        const result1 = await fetch(url)
        const jsonResult = await result1.json();
        // console.log(jsonResult);
        // userData(jsonResult);
        
        //pushing the fetched data to the page
        result.innerHTML = `
        <div class="card card_profile">
        <div class="card-body">
        <img src="${jsonResult.avatar_url}" alt="">
        <h5 class="card-title card1">${jsonResult.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Followers: ${jsonResult.followers}</h6>
        <p class="card-text">${jsonResult.bio}</p>
        <a href="${jsonResult.html_url}" class="card-link">Github Profile</a>
        <a href="${jsonResult.blog}" class="card-link">Blog</a>
        </div></div> </br>
        `;
        getRepoData();
        
    } catch (error) {
        result.innerHTML = "Error in loading data...";
    }
}



//////////Logic Design for github repository data fetch////////////////////////////////////////////

const fetchRepoBtn = document.querySelector("#fetchRepo");
const resultRepo = document.querySelector("#resultRepo");

fetchRepoBtn.addEventListener("click",getRepoData);

//get data using Git API

async function getRepoData() {

    let userGit = document.getElementById("profileName").value;
    url1 = `https://api.github.com/users/${userGit}/repos`
    resultRepo.innerHTML = "Loading Repositories...";
    
    try {
        const result2 = await fetch(url1)
        const jsonResult1 = await result2.json();
        console.log(jsonResult1);
        resultRepo.innerHTML = "";
        
        //pushing the fetched data to the page 
        // While parsing the retrieved data, we are assuming that stargazers_count is the required star count

        for(let i=0; i<jsonResult1.length; i++) {
            resultRepo.innerHTML +=`
                <h6 class="text-muted">Repository No: ${i+1}</h>
                <div class="card">
                <div class="card-body">
                <h5 class="card-title">${jsonResult1[i].name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Forks Count: ${jsonResult1[i].forks_count}</h6> 
                <h6 class="card-subtitle mb-2 text-muted">Star Count: ${jsonResult1[i].stargazers_count}</h6>
                <a href="${jsonResult1[i].html_url}" target="_blank"class="card-link">Repo link</a>
                </div></div></br>
                `;
        }

    } catch (error) {
        resultRepo.innerHTML = "Error in fetching Data";
    }
}

