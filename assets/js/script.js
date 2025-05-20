$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    // scroll spy
    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // smooth scrolling with offset
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    const navbarHeight = $("header").outerHeight();
    const target = $($(this).attr("href"));
    const targetPosition = target.offset().top - navbarHeight;

    $("html, body").animate(
      {
        scrollTop: targetPosition,
      },
      500,
      "linear"
    );
  });

  // <!-- emailjs to mail contact form data -->
  $("#contact-form").submit(function (event) {
    emailjs.init("ZyoEYYpTr9A8aurwK");

    emailjs
      .sendForm("service_aj2kd0a", "template_4kdoqhf", "#contact-form")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          document.getElementById("contact-form").reset();
          alert("Form Submitted Successfully");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Form Submission Failed! Try Again");
        }
      );
    event.preventDefault();
  });
  // <!-- emailjs to mail contact form data -->
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: ["Machine Learning", "DevOps", "software development"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
  let response;
  type === "skills"
    ? (response = await fetch("skills.json"))
    : (response = await fetch("projects.json"));
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  skillsContainer.innerHTML = "";

  // Create three categories
  const categories = [
    {
      title: "Machine Learning",
      skills: skills.machineLearning,
      icon: "fas fa-brain",
    },
    {
      title: "DevOps / Automation",
      skills: skills.devOps,
      icon: "fas fa-server",
    },
    {
      title: "Software Development / Databases",
      skills: skills.softwareDevelopment,
      icon: "fas fa-code",
    },
  ];

  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "skill-category";

    const title = document.createElement("h3");
    title.innerHTML = `<i class="${category.icon}"></i> ${category.title}`;
    title.className = "category-title";
    categoryDiv.appendChild(title);

    const skillsGrid = document.createElement("div");
    skillsGrid.className = "skills-grid";

    category.skills.forEach((skill) => {
      skillsGrid.innerHTML += `
          <div class="bar">
            <div class="info">
              <img src="${skill.icon}" alt="${skill.name}" />
              <span>${skill.name}</span>
            </div>
          </div>
        `;
    });

    categoryDiv.appendChild(skillsGrid);
    skillsContainer.appendChild(categoryDiv);
  });
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  projectsContainer.innerHTML = "";

  projects.forEach((project) => {
    projectsContainer.innerHTML += `
      <div class="box tilt">
        <img draggable="false" src="/assets/images/projects/${project.image}.jpg" alt="${project.name}" />
        <div class="project-footer">
          <h3>${project.name}</h3>
        </div>
        <div class="content">
          <div class="desc">
          <p>${project.desc}<br></p>
          <ul><b>Tech Stack: ${project.stack}</b></ul>
            <div class="btns">
              <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
              <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // Initialize tilt.js with subtle effect
  /*VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
    scale: 1.02,
  });*/
}

async function initCertifications() {
  const response = await fetch("certifications.json");
  const certifications = await response.json();

  const certItems = document.querySelector(".cert-items");
  certItems.innerHTML = "";

  certifications.forEach((cert) => {
    certItems.innerHTML += `
      <div class="cert-card">
        <img src="./assets/images/certifications/${cert.image}" alt="${cert.title}">
        <div class="cert-overlay">
          <h3 class="cert-title">${cert.title}</h3>
          <p class="cert-institute">${cert.institute}</p>
          <p class="cert-date">${cert.date}</p>
          <a href="${cert.verifyUrl}" class="verify-btn" target="_blank">Verify</a>
        </div>
      </div>
    `;
  });

  // Carousel navigation
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  leftBtn.addEventListener("click", () => {
    document.querySelector(".cert-items").scrollBy({
      left: -350,
      behavior: "smooth",
    });
  });

  rightBtn.addEventListener("click", () => {
    document.querySelector(".cert-items").scrollBy({
      left: 350,
      behavior: "smooth",
    });
  });

  // Enable horizontal scroll with touchpad gestures
  const certScrollContainer = document.querySelector(".cert-items");

  certScrollContainer.addEventListener("wheel", (e) => {
    // Only respond to horizontal scroll gestures
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const scrollAmount = e.deltaX > 0 ? 350 : -350;
      certScrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  });
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", initCertifications);

fetchData().then((data) => {
  showSkills(data);
});

fetchData("projects").then((data) => {
  showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});
// <!-- tilt js effect ends -->

// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: true,
});

/* SCROLL HOME */
srtop.reveal(".home .content h3", { delay: 200 });
srtop.reveal(".home .content p", { delay: 200 });
srtop.reveal(".home .content .btn", { delay: 200 });

srtop.reveal(".home .image", { delay: 400 });
srtop.reveal(".home .linkedin", { interval: 600 });
srtop.reveal(".home .github", { interval: 800 });
srtop.reveal(".home .twitter", { interval: 1000 });
srtop.reveal(".home .telegram", { interval: 600 });
srtop.reveal(".home .instagram", { interval: 600 });
srtop.reveal(".home .dev", { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal(".about .content h3", { delay: 200 });
srtop.reveal(".about .content .tag", { delay: 200 });
srtop.reveal(".about .content p", { delay: 200 });
srtop.reveal(".about .content .box-container", { delay: 200 });
srtop.reveal(".about .content .resumebtn", { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal(".skills .container", { interval: 200 });
srtop.reveal(".skills .container .bar", { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal(".education .box", { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal(".work .box-container", { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal(".experience .timeline", { delay: 400 });
srtop.reveal(".experience .timeline .container", { interval: 400 });

/* SCROLL CERTIFICATIONS */
//srtop.reveal(".certifications .heading", { delay: 200 });
srtop.reveal(".certifications .cert-container", { interval: 200 });

/* SCROLL CONTACT */
//srtop.reveal(".contact .heading", { delay: 200 });
srtop.reveal(".contact .container", { delay: 400 });
srtop.reveal(".contact .container .form-group", { delay: 400 });
