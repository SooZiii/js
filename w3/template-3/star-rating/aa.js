const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css";
document.head.appendChild(link);
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "./star-rating/theme.css";
document.head.appendChild(style);

function StarRating($container) {
  const maxRating = $container.getAttribute("data-max-rating");
  const stars = [];

  const starContainer = document.createElement("div");
  starContainer.classList.add("star-container");
  //   starContainer.style.display = "flex";
  //   $container.appendChild(starContainer);

  for (let i = 1; i <= maxRating; i += 1) {
    const star = document.createElement("i");
    star.classList.add("bx", "bxs-star");
    star.dataset.rating = i;
    stars.push(star);
    $container.appendChild(star);
  }

  function handleMouseOver(rating) {
    return () => updateStars(rating, "hovered");
  }

  function handleMouseOut() {
    updateStars(currentRating, "selected");
  }

  function handleClick(e) {
    const { rating } = e.target.dataset;

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
}
export default StarRating;
