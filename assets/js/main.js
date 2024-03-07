// latest posts
const latestPosts = async () => {
    const respons = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await respons.json();
    data.forEach((post) => {
      const latestContainer = document.getElementById("latest-post-container");
      const div = document.createElement("div");
      div.innerHTML = `
                      
              <div class="p-5 border border-heading/20 rounded-3xl hover:shadow-lg duration-300">
                  <div class="">
                      <img class="w-full aspect-[1/.7] object-cover rounded-3xl" src="${
                        post.cover_image
                      }" alt="${post.title}">
                  </div>
                  <div class="flex items-center gap-3 mt-4">
                      <img src="assets/img/card.svg" alt="">
                      <p>${post?.author?.posted_date || "No publish date"}</p>
                  </div>
                  <h6 class="mt-2 text-lg font-extrabold">${
                    post?.title || ""
                  }</h6>
                  <p class="mt-2 text-base font-primary">${post.description.slice(
                    0,
                    80
                  )}</p>
                  <div class="flex items-center gap-3 mt-3">
                      <img class="h-11 w-11 rounded-full object-cover" src="${
                        post.profile_image
                      }" alt="${post?.author?.name || ""}">
                      <div class="">
                          <h6 class="text-base font-bold">${
                            post?.author?.name || ""
                          }</h6>
                          <p class="font-primary text-[14px]">${
                            post?.author?.designation || "Unknown"
                          }</p>
                      </div>
                  </div>
              </div>
          
          `;
      latestContainer.appendChild(div);
    });
  };
  latestPosts();

  
  const allPosts = async (categoryName="") => {
      
    const allPostContainer = document.getElementById("all-posts-container");
    allPostContainer.innerHTML = ""; 
  
    document.getElementById("loading-spinner").style.display = "block"; // spinner
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
    );
  
    const data = await response.json();
    const allPosts = data.posts;
    console.log("allposts",allPosts);
    setTimeout(() => {
      document.getElementById("loading-spinner").style.display = "none"; // spinner none
  
      allPosts.forEach((allpost) => {
        const allPostContainer = document.getElementById("all-posts-container");
        const div = document.createElement("div"); // Corrected line
        div.innerHTML = `
              
              <div class="bg-light lg:p-10 p-6 rounded-3xl border hover:border-primary transition-all duration-300 mb-5">
                  <div class="md:flex gap-6">
                      <div class="relative h-[72px] w-[72px]">
                          <img class="mb-4 md:mb-0 rounded-2xl h-[72px] object-cover" src="${
                            allpost.image
                          }" alt="${allpost.author.name}">
                          <div class="h-5 w-5 border-2 border-white active-status rounded-full absolute -top-2 -right-2 ${
                            allpost.isActive ? "active" : ""
                          }"></div>
                      </div>
                      <div class="flex-1">
                          <div class="flex flex-wrap items-center gap-4 mb-1">
                              <p class="text-base font-medium text-heading/80"># ${
                                allpost?.category || ""
                              }</p>
                              <p class="text-base font-medium text-heading/80">Author : ${
                                allpost?.author?.name || ""
                              }</p>
                          </div>
                          <h5 class="font-bold mb-2">${allpost.title}</h5>
                          <p class="text-base border-dashed border-b-2 border-heading/30 pb-5">${
                            allpost?.description || ""
                          }</p>
                          <div class="flex flex-wrap justify-between  mt-4">
                              <div class="flex flex-wrap items-center gap-5">
                                  <div class="flex gap-3">
                                      <img src="assets/img/Vector.svg" alt="">
                                      <p class="text-base">${
                                        allpost?.comment_count || "0"
                                      }</p>
                                  </div>
                                  <div class="flex gap-3">
                                      <img src="assets/img/Vector2.svg" alt="">
                                      <p class="text-base">${
                                        allpost?.view_count || "0"
                                      }</p>
                                  </div>
                                  <div class="flex gap-3">
                                      <img src="assets/img/Vector3.svg" alt="">
                                      <p class="text-base">${
                                        allpost?.posted_time || "0"
                                      } min</p>
                                  </div>
                              </div>
                              <div class="">
                                  <button onclick="checkAllPost('${
                                    allpost?.title.replace("'", "-")
                                  }', '${
          allpost?.view_count
        }');" class="!p-0 sm:mt-0 mt-3">
                                      <img src="assets/img/Vector4.svg" alt="">
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              `;
        allPostContainer.appendChild(div);
      });
    }, 2000);
  };
  allPosts();
  
  let viewCounts = 0;
  const checkAllPost = (title, viewCount) => {
      
    const sidebarContainer = document.getElementById("sidebar-post");
    const div = document.createElement("div");
    div.innerHTML = `
  
      <div class="flex flex-wrap items-center justify-between gap-4 mt-4 p-3 bg-white rounded-2xl">
          <h6 class="flex-1 font-semibold text-base">${title.replace("-","'")}</h6>
          <div class="flex flex-wrap items-center gap-4">
              <img src="assets/img/Vector2.svg" alt="">
              <p>${viewCount}</p>
          </div>
      </div>
      `;
  
    sidebarContainer.appendChild(div);
    const viewCounter = document.getElementById("view-counter");
    viewCounter.innerText = parseInt((viewCounts = viewCounts + 1));
  };
  
  const handerlSearch = () => {
    const inputBox = document.getElementById("search-box");
    const categoryName = inputBox.value.trim(); 
    allPosts(categoryName); 
    inputBox.value = ""; 
  };