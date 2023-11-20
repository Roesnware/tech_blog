const likeCnt = document.getElementById('like-cnt');
const dislikeCnt = document.getElementById('dislike-cnt');
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');

const incrementLikes = (event) => {
    event.preventDefault();

    let likesCount = likeCnt.innerText;

    likesCount++;
    localStorage.setItem('likes', likesCount);

    likeCnt.innerText = likesCount;

    console.log(likesCount);
}

const incrementDislikes = (event) => {
    event.preventDefault();

    let dislikesCount = dislikeCnt.innerText;

    dislikesCount++;
    localStorage.setItem('dislikes', dislikesCount);

    dislikeCnt.innerText = dislikesCount;
}

function getRatings() {

    let likes = localStorage.getItem('likes');
    let dislikes = localStorage.getItem('dislikes');

    if (!likes) {
        likeCnt.innerText = 0;
    }

    if (!dislikes) {
        dislikeCnt.innerText = 0;
    }

    likeCnt.innerText = likes;
    dislikeCnt.innerText = dislikes;
}

likeBtn.addEventListener('click', incrementLikes);
dislikeBtn.addEventListener('click', incrementDislikes);

getRatings();