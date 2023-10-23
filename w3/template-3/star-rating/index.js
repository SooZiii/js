const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css";
document.head.appendChild(link);
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "./star-rating/theme.css";
document.head.appendChild(style);

function StarRating($container) {
  $container.classList.add("star-rating-container");

  const maxRating = parseInt($container.dataset.maxRating, 10);
  let currentRating = 0;

  function updateStars(rating, className) {
    const stars = $container.querySelectorAll("i");

    stars.forEach((star, index) => {
      star.classList.remove("hovered", "selected");

      if (index < rating) {
        star.classList.add(className);
      }
    });
  }

  function handleMouseOver(rating) {
    return () => updateStars(rating, "hovered");
  }

  function handleMouseOut() {
    updateStars(currentRating, "selected");
  }

  function handleClick(rating) {
    return () => {
      currentRating = rating;
      updateStars(currentRating, "selected");
      $container.dispatchEvent(new CustomEvent("rating-change", { detail: currentRating }));
    };
  }

  for (let i = 1; i <= maxRating; i += 1) {
    const star = document.createElement("i");
    star.classList.add("bx");
    star.classList.add("bxs-star");

    star.addEventListener("mouseover", handleMouseOver(i));
    star.addEventListener("mouseout", handleMouseOut);
    star.addEventListener("click", handleClick(i));

    $container.appendChild(star);
  }
}

export default StarRating;
