// hooks
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-post-btn');
const updateBtn = document.getElementById('submit-updated-btn');
const modal2 = document.getElementById('modal2');
const parentEle = document.getElementById('currPost');
const postBtns = document.querySelector('.dashboardBlogPost');
const addBtn = document.querySelector('.createNewPost');

const titleInput2 = document.getElementById('title2');
const contentInput2 = document.getElementById('content2');

// open modal func
const showBox2 = (event) => {
    // prevent default behaviour   console.log();
    event.preventDefault();

    // display modal
    postBtns.classList.add("hidden");
    addBtn.classList.add("hidden");
    modal2.classList.remove("myModal");
}

// function to update post
const updatePostHandler = async (event) => {

    // prevetn default 
    event.preventDefault();

    // input var
    const title = titleInput2.value.trim();
    const content = contentInput2.value.trim();

    // check if blog id
    const blog_id = parentEle.dataset.id;

    // fetch to blog api to create new post 
    const response = await fetch( `/api/blog/${blog_id}`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    // success
    if (response.ok) {
        console.log("Blog updated!");
        document.location.reload();
    } else { // failure
        alert('Failed to update Blog');
    }
}

// func to delete post 
const deletePostHandler = async (event) => {

    // prevetn default 
    event.preventDefault();

        // check if blog id
        const blog_id = parentEle.dataset.id;

        // fetch to blog api to delete 
        const response = await fetch( `/api/blog/${blog_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    
        // success
        if (response.ok) {
            console.log("Blog deleted!");
            document.location.reload();
        } else { // failure
            alert('Failed to delete Blog');
        }
}

// event listeners 
editBtn.addEventListener('click', showBox2);
updateBtn.addEventListener('click', updatePostHandler);
deleteBtn.addEventListener('click', deletePostHandler);
