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

    const videoSrc = e.currentTarget.dataset.video;
    const textFile = e.currentTarget.dataset.file;
    const articleId = e.currentTarget.dataset.article;

    if (articleId) {
      const template = document.getElementById(articleId);
      videoContainer.innerHTML = template
        ? template.innerHTML
        : `<p>لا يوجد محتوى متاح.</p>`;

    } else if (textFile) {
      try {
        const response = await fetch(textFile);
        const text = await response.text();
        videoContainer.innerHTML = `
          <div class="article-content">
            <pre>${text}</pre>
          </div>
        `;
      } catch {
        videoContainer.innerHTML = `<p>خطأ في تحميل الملف.</p>`;
      }

    } else if (videoSrc) {

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
      } else {
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

