// hooks 
const comment = document.getElementById('comment-box');
const submitBtn = document.getElementById('submit-comment-btn');

// func to submit comment 
const commentFormHandler = async (event) => {
    // prevent default 
    event.preventDefault();

    // get blog post id from url
    const blogpost_id = window.location.pathname.split('/').pop();
    console.log(blogpost_id);

    // get ocmment content form input 
    const content = comment.value.trim();
    console.log(content);

    // if blogpost_id
    if (blogpost_id) {
        // send blogpost_id and content to server 
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ blogpost_id, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        // success
        if (response.ok) {
            console.log("Comment added to blog post!");
            document.location.reload();
        } else { // failure
            alert('Failed to add comment');
        }
    }
}


// event lsitener for button 
submitBtn.addEventListener('click', commentFormHandler);