// create the initial connection links to the movie database
// Please ensre that you use your own API Key to test this app

const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = 'http://127.0.0.1:8000/api/v1/reviews/';


const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle

const div_new = document.createElement('div');
div_new.innerHTML = `
<div class="row">
    <div class="column">
        <div class="card">New Review
            <p><strong>Review: </strong>
                <input type="text" id="new_review" value="" >
            </p>
            <p><strong>User: </strong>
                <input type="text" id="new_user" value="" >
            </p>
            <p><a href="#" class="review" onclick="saveReview('new_review', 'new_user')">💾<a>
            
        </div>
    </div>
</div>
`
main.appendChild(div_new);

returnReviews(APILINK);

function returnReviews(url) {
    url += "movie/" + movieId;
    console.log(url);
    fetch(url).then(response => response.json())
        .then(function(data) {
            //console.log(data);
            data.map(item => {
            //console.log(item);
            createReviewCard(item);
        })

    });
}

function createReviewCard(item) {
    const div_card = document.createElement('div');
    let review = item.review.replace("'", "")
    div_card.innerHTML = `
        <div class="row">
            <div class="column">
                <div class="card" id="${item._id}">
                    <p><strong>Review: </strong>${item.review}</p>
                    <p><strong>User: </strong>${item.user}</p>
                    <p><a href="#" class="review" onclick="editReview('${item._id}', '${item.user}', '${review}')">✎<a> | 
                    <a href="#" class="review" onclick="deleteReview('${item._id}')">🗑️<a></p>
                </div>
            </div>
        </div>
    `
  main.appendChild(div_card);
}

function editReview(id, user, review) {
    // console.log(review)
    // console.log(id)
    const element = document.getElementById(id)
    //console.log(element);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
        <p><strong>Review: </strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <p><strong>User: </strong>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <p><a class="review" href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">💾</a></p> 
    `
}

function deleteReview(id) {
    const element = document.getElementById(id)
    // console.log(element);

    element.innerHTML = `
        <p><h3>Are you sure you want to delete the selected review?</h3></p>
        
        <p><a class="review" href="#" onclick="confirmDeleteReview('${id}')">🗑️</a></p> 
    `
}

function saveReview(reviewId, userId, id="") {
    const review = document.getElementById(reviewId).value;
    const user = document.getElementById(userId).value;
    //console.log(APILINK + id)
    if (id) { 
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            location.reload();
        });
    } else {
        fetch(APILINK + "new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            location.reload();
        });
    }
}



function confirmDeleteReview(id) {

    fetch(APILINK + id, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        location.reload();
    })
}
 