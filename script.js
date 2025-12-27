document.addEventListener("DOMContentLoaded", () => {

  // Accordion logic
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach(button => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Video / Article loading logic
  const videoLinks = document.querySelectorAll(".video-link");
  const videoContainer = document.getElementById("videoContainer");

  videoLinks.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const videoSrc = link.dataset.video;     // Existing video
      const textFile = link.dataset.file;      // Optional text file
      const articleId = link.dataset.article;  // Template article

      if (articleId) {
        // Load article from template
        const template = document.getElementById(articleId);
        if (template) {
          videoContainer.innerHTML = template.innerHTML;
        } else {
          videoContainer.innerHTML = `<p>لا يوجد محتوى متاح.</p>`;
        }
      } else if (textFile) {
        // Load external text file
        try {
          const response = await fetch(textFile);
          const text = await response.text();
          videoContainer.innerHTML = `
            <div class="article-content">
              <pre>${text}</pre>
            </div>
          `;
        } catch (err) {
          videoContainer.innerHTML = `<p>خطأ في تحميل الملف.</p>`;
          console.error(err);
        }
      } else if (videoSrc) {

  // YouTube embed
  if (videoSrc.startsWith("https://www.youtube.com/embed/")) {
    videoContainer.innerHTML = `
      <iframe
        src="${videoSrc}"
        style="width:100%; height:100%; border-radius:12px;"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
  } 
  // Local MP4 (unchanged behavior)
  else {
    videoContainer.innerHTML = `
      <video controls autoplay style="width:100%; height:100%; border-radius:12px;">
        <source src="${videoSrc}" type="video/mp4">
      </video>
    `;
  }

}

    });
  });

});
