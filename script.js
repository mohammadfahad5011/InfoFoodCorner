document.addEventListener("DOMContentLoaded", function () {
  // Custom cursor
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  // Links hover effect
  const links = document.querySelectorAll("a, button");

  links.forEach((link) => {
    link.addEventListener("mouseover", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursor.style.backgroundColor = "rgba(212, 163, 115, 0.5)";
    });

    link.addEventListener("mouseout", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.backgroundColor = "var(--accent-color)";
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking a link
  const navItems = document.querySelectorAll(".nav-link");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });

  // Menu filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuItemsContainer = document.querySelector(".menu-items");

  // Menu items data
  const menuItems = [
    {
      name: "Heirloom Tomato Salad",
      description: "Local heirloom tomatoes, fresh basil, aged balsamic",
      price: "$14",
      category: "starters",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      dietary: ["vegetarian", "gluten-free"],
      chefsChoice: true,
    },
    {
      name: "Beetroot Carpaccio",
      description: "Thinly sliced beets, goat cheese, pistachios",
      price: "$12",
      category: "starters",
      image:
        "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      dietary: ["vegetarian", "gluten-free"],
      chefsChoice: false,
    },
    {
      name: "Herb Crusted Salmon",
      description:
        "Wild-caught salmon, seasonal vegetables, lemon beurre blanc",
      price: "$28",
      category: "mains",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      dietary: ["gluten-free"],
      chefsChoice: true,
    },
    {
      name: "Mushroom Risotto",
      description: "Arborio rice, wild mushrooms, parmesan, truffle oil",
      price: "$24",
      category: "mains",
      image:
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      dietary: ["vegetarian"],
      chefsChoice: false,
    },
    {
      name: "Grass-Fed Ribeye",
      description:
        "12oz ribeye, roasted garlic mashed potatoes, grilled asparagus",
      price: "$38",
      category: "mains",
      image:
        "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      dietary: [],
      chefsChoice: true,
    },
    {
      name: "Chocolate Soufflé",
      description: "Warm chocolate soufflé, vanilla bean ice cream",
      price: "$12",
      category: "desserts",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      dietary: ["vegetarian"],
      chefsChoice: false,
    },
    {
      name: "Seasonal Fruit Tart",
      description: "Buttery crust, pastry cream, market fruits",
      price: "$10",
      category: "desserts",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      dietary: ["vegetarian"],
      chefsChoice: true,
    },
    {
      name: "Craft Cocktails",
      description: "Ask your server about our seasonal craft cocktails",
      price: "$12-15",
      category: "drinks",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      dietary: [],
      chefsChoice: false,
    },
  ];

  // Display all menu items initially
  displayMenuItems(menuItems);

  // Filter menu items
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      if (filter === "all") {
        displayMenuItems(menuItems);
      } else {
        const filteredItems = menuItems.filter(
          (item) => item.category === filter
        );
        displayMenuItems(filteredItems);
      }
    });
  });

  function displayMenuItems(items) {
    menuItemsContainer.innerHTML = "";

    if (items.length === 0) {
      menuItemsContainer.innerHTML =
        '<p class="no-items">No items found in this category.</p>';
      return;
    }

    items.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");

      // Dietary icons
      const dietaryIcons = item.dietary
        .map(
          (diet) =>
            `<span class="dietary-icon" title="${diet.replace("-", " ")}">${diet
              .charAt(0)
              .toUpperCase()}</span>`
        )
        .join("");

      menuItem.innerHTML = `
                ${
                  item.chefsChoice
                    ? '<span class="chef-badge">Chef\'s Choice</span>'
                    : ""
                }
                <div class="menu-item-img">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="menu-item-content">
                    <h3>${item.name} <span class="price">${
        item.price
      }</span></h3>
                    <p>${item.description}</p>
                    ${
                      item.dietary.length > 0
                        ? `<div class="dietary-icons">${dietaryIcons}</div>`
                        : ""
                    }
                </div>
            `;

      menuItemsContainer.appendChild(menuItem);
    });
  }

  // Animate stats
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.dataset.count);
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps

      let current = 0;

      const timer = setInterval(() => {
        current += step;

        if (current >= target) {
          clearInterval(timer);
          current = target;
        }

        stat.textContent = Math.floor(current);
      }, 16);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stats")) {
          animateStats();
        }

        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Form submission
  const reservationForm = document.querySelector(".reservation-section form");

  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const formGroups = document.querySelectorAll(".form-group");

    formGroups.forEach((group) => {
      const input = group.querySelector("input, select");
      if (!input.checkValidity()) {
        group.classList.add("error");
        isValid = false;
      } else {
        group.classList.remove("error");
      }
    });

    if (isValid) {
      // In a real app, you would send this data to a server
      alert(
        "Reservation request received! We will contact you shortly to confirm."
      );
      reservationForm.reset();
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Map interaction
  const mapContainer = document.querySelector(".map-container");
  const mapOverlay = document.querySelector(".map-overlay");

  if (mapContainer && mapOverlay) {
    mapContainer.addEventListener("mouseenter", () => {
      mapOverlay.style.opacity = "1";
    });

    mapContainer.addEventListener("mouseleave", () => {
      mapOverlay.style.opacity = "0";
    });
  }

  // Directions button
  const directionsBtn = document.querySelector(".directions-btn");
  if (directionsBtn) {
    directionsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // In a real implementation, this would link to Google Maps with your address
      window.open("https://www.google.com/maps", "_blank");
    });
  }

  // Transportation options animation
  const transportOptions = document.querySelectorAll(".transport-option");
  transportOptions.forEach((option) => {
    option.addEventListener("mouseenter", () => {
      const icon = option.querySelector("i");
      icon.style.transform = "scale(1.2)";
    });

    option.addEventListener("mouseleave", () => {
      const icon = option.querySelector("i");
      icon.style.transform = "scale(1)";
    });
  });

  // Hero image parallax effect
  const heroImage = document.querySelector(".hero-image img");
  if (heroImage) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      heroImage.style.transform = `scale(${1.05 + scrollPosition * 0.0005})`;
    });
  }

  // Shape animations on mouse move
  const shapes = document.querySelectorAll(".hero-shape");
  if (shapes.length > 0) {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      shapes.forEach((shape, index) => {
        const speed = 0.05 * (index + 1);
        const xOffset = (x - 0.5) * 50 * speed;
        const yOffset = (y - 0.5) * 50 * speed;

        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });
  }

  // Smooth scroll for scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      window.scrollTo({
        top: window.innerHeight - 80,
        behavior: "smooth",
      });
    });
  }

  // Food icons interaction
  const foodIcons = document.querySelectorAll(".food-icon");
  if (foodIcons.length > 0) {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      foodIcons.forEach((icon, index) => {
        const speed = 0.03 * (index + 1);
        const xOffset = (x - 0.5) * 40 * speed;
        const yOffset = (y - 0.5) * 40 * speed;

        icon.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });

    // Randomize initial positions slightly
    foodIcons.forEach((icon) => {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;
      const randomRotate = Math.random() * 10 - 5;
      icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    });
  }

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Loading animation
  window.addEventListener("load", function () {
    const loader = document.createElement("div");
    loader.className = "loader";
    loader.innerHTML = '<div class="loader-circle"></div>';
    document.body.appendChild(loader);

    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1500);
  });
});
