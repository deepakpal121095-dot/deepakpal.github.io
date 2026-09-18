const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("show"));
});

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const selected = button.dataset.filter;

    projects.forEach(project => {
      project.style.display =
        selected === "all" || project.dataset.category === selected
          ? "block"
          : "none";
    });
  });
});

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTools = document.getElementById("modalTools");
const modalImage = document.getElementById("modalImage");
const modalIcon = document.getElementById("modalIcon");
const modalCTA = document.getElementById("modalCTA");

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const project = button.closest(".project");

    modalTitle.textContent = project.dataset.title;
    modalDescription.textContent = project.dataset.description;

    modalTools.innerHTML = "";
    project.dataset.tools.split("•").forEach(tool => {
      const tag = document.createElement("span");
      tag.textContent = tool.trim();
      modalTools.appendChild(tag);
    });

    const image = project.dataset.image;

    if (image) {
      modalImage.src = image;
      modalImage.style.display = "block";
      modalImage.onerror = () => {
        modalImage.style.display = "none";
        modalIcon.style.display = "block";
      };
      modalIcon.style.display = "none";
    } else {
      modalImage.style.display = "none";
      modalIcon.style.display = "block";
      modalIcon.textContent = "📊";
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

modalCTA.addEventListener("click", closeModal);

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const projectType = document.getElementById("projectType").value;
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(
    `New Project Inquiry - ${projectType}`
  );

  const body = encodeURIComponent(
`Hello Deepak,

I would like to discuss a project.

Name: ${name}
Email: ${email}
Project Type: ${projectType}

Project Details:
${message}

Thank you.`
  );

  window.location.href =
    `mailto:deepbanny4@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
