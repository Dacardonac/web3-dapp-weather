document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "Come back soon!";
  } else {
    document.title = "Weather DApp";
  }
});