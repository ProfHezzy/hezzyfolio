const postsContainer = document.getElementById("posts-container");
const converter = new showdown.Converter();

// List your markdown posts here (can automate later with a JSON or function)
const posts = [
  "posts/first-post.md",
  "posts/second-post.md"
];

posts.forEach(postUrl => {
  fetch(postUrl)
    .then(response => response.text())
    .then(markdown => {
      const htmlContent = converter.makeHtml(markdown);
      const postDiv = document.createElement("div");
      postDiv.classList.add("post-card");
      postDiv.innerHTML = htmlContent;
      postsContainer.appendChild(postDiv);
    })
    .catch(error => {
      console.error("Error loading post:", error);
    });
});
