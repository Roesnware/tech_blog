// hooks
const newPostBtn = document.getElementById('new-post-btn');
const modal = document.getElementById("postModal");
const submitBtn = document.getElementById('submit-btn');

const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

// open modal func
const showBox = (event) => {
    // prevent default behaviour 
    event.preventDefault();

    // display modal
    modal.classList.remove("myModal");
}

// function to make new post
const newPostHandler = async (event) => {

    // prevetn default 
    event.preventDefault();

    // input var
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // fetch to blog api to create new post 
    const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    // success
    if (response.ok) {
        console.log("Blog posted!");
        document.location.reload();
    } else { // failure
        alert('Failed to add post Blog');
    }
}

// event listeners 
newPostBtn.addEventListener('click', showBox);
submitBtn.addEventListener('click', newPostHandler);